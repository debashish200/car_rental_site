from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import CarSerializer
from .permissions import *
from django.shortcuts import get_object_or_404

# Create your views here.
#list all cars and create a car

class CarListCreateAPIView(APIView):
    def get(self,request): #list all cars
        cars=Car.objects.all()
        serializer=CarSerializer(cars,many=True)
        return Response(serializer.data)
    def post(self,request): #create a car
        if not request.user.is_authenticated or request.user.role!='agency':
            return Response({"error":"only agency owners can be cars"},status=status.HTTP_403_FORBIDDEN)
        
        serializer = CarSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
    
class CarRetrieveUpdateDeleteAPIView(APIView):
    def get_object(self,pk):
        return get_object_or_404(Car,pk=pk)
    
    def get(self,request,pk):
        car=self.get_object(pk)
        serializer=CarSerializer(car)
        return Response(serializer.data)
    #update car
    def put(self,request,pk):
        car=self.get_object(pk)
        
        #only the owner can update the car
        if not request.user.is_authenticated or request.user!=car.owner:
            return Response({"error":"only the owner can update the car"},status=status.HTTP_403_FORBIDDEN)
        
        serializer=CarSerializer(car,data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    #delete car
    def delete(self,request,pk):
        car=self.get_object(pk)
        
        #only the owner can delete the car
        if not request.user.is_authenticated or request.user!=car.owner:
            return Response({"error":"only the owner can delete the car"},status=status.HTTP_403_FORBIDDEN)
        
        car.delete()
        return Response(
            {"message": "Car deleted successfully"},
            status=status.HTTP_204_NO_CONTENT)
    