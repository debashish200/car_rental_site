from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import CarSerializer,CarImageUploadSerializer
from .permissions import *
from django.shortcuts import get_object_or_404

# Create your views here.
#list all cars and create a car

class CarListCreateAPIView(APIView):

    def get(self, request):
        if request.user.is_authenticated and request.user.role == "agency":
            cars = Car.objects.filter(owner=request.user)
        else:
            cars = Car.objects.filter(is_available=True)

        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated or request.user.role != 'agency':
            return Response(
                {"error": "Only agency owners can add cars"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = CarSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
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
        
        # print("REQUEST USER:", request.user)
        # print("IS AUTHENTICATED:", request.user.is_authenticated)
        # print("CAR OWNER:", car.owner)
        # print("SAME USER:", request.user == car.owner)

        
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
        
class CarImageUploadAPIView(APIView):

    def post(self, request, pk):
        car = get_object_or_404(Car, pk=pk)

        # User must be logged in
        if not request.user.is_authenticated:
            return Response(
                {"error": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Only the car owner can upload images
        if request.user != car.owner:
            return Response(
                {"error": "Only the car owner can upload images"},
                status=status.HTTP_403_FORBIDDEN
            )

        images = request.FILES.getlist("images")

        if not images:
            return Response(
                {"error": "Please select at least one image"},
                status=status.HTTP_400_BAD_REQUEST
            )

        uploaded_images = []

        for image in images:
            car_image = CarImage.objects.create(
                car=car,
                image=image
            )

            uploaded_images.append(
                CarImageUploadSerializer(car_image).data
            )

        return Response(
            {
                "message": "Images uploaded successfully",
                "images": uploaded_images
            },
            status=status.HTTP_201_CREATED
        )
        
class CarImageDeleteAPIView(APIView):

    def delete(self, request, pk):
        image = get_object_or_404(CarImage, pk=pk)

        if not request.user.is_authenticated:
            return Response(
                {"error": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if request.user != image.car.owner:
            return Response(
                {"error": "Only the car owner can delete this image"},
                status=status.HTTP_403_FORBIDDEN
            )

        image.delete()

        return Response(
            {"message": "Image deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
    