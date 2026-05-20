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
    def get(self,request):
        cars=Car.objects.all()
        serializer=CarSerializer(cars,many=True)
        return Response(serializer.data)
    def post(self,request):
        if not request.user.is_authenticated or request.user.role!='agency':
            return Response({"error":"only agency owners can be cars"},status=status.HTTP_403_FORBIDDEN)
        
        serializer = CarSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
    
    