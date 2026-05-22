from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date
from datetime import timedelta 

from .models import *
from .serializers import BookingSerializer
from .permissions import IsCustomer

from cars.models import Car 

#create booking and list all bookings of the user

class BookingListCreateAPIView(APIView):
    
    def get(self,request): #list all bookings of the user
        if not request.user.is_authenticated:
            return Response({"error":"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        bookings=Booking.objects.filter(customer=request.user)
        
        serializers=BookingSerializer(bookings,many=True)
        return Response(serializers.data)
    
    def post(self,request): #create a booking
        if not request.user.is_authenticted:
            return Response({"error":"Login required"},status=status.HTTP_401_UNAUTHORIZED)
        
        if request.user.role!="customer":
            return Response({"error":"only customers can create bookings"},status=status.HTTP_403_FORBIDDEN)
        
        car_id=request.data.get("car")
        start_time=request.data.get("start_date")
        end_time=request.data.get("end_date")
        
        #validate fields
        
        if not all([car_id, start_time, end_time]):
            return Response({"error":"All fields are required"},status=status.HTTP_400_BAD_REQUEST)
        
        #fetch car
        car=get_object_or_404(Car,pk=car_id)
        
        #convert string date to date object
        start_time=parse_date(start_time)
        end_time=parse_date(end_time)
        
        if not start_time or not end_time:
            return Response({"error":"Invalid date format"},status=status.HTTP_400_BAD_REQUEST)
        
        #check end date is after start date
        if end_time<=start_time:
            return Response({"error":"End date must be after start date"},status=status.HTTP_400_BAD_REQUEST)
        
        #check double booking
        conflicting_bookings=Booking.objects.filter(
            car=car,start_time__lt=end_time,end_time__gt=start_time
        )
        
        if conflicting_bookings.exists():
            return Response({"error":"Car is already booked for the specified dates"},status=status.HTTP_400_BAD_REQUEST)
        
        #Calculate hours
        duration=(end_time-start_time)
        
        total_hours=duration.total_seconds()/3600
        
        #Calculate total price
        total_price=total_hours*float(car.price_per_hour)
        
        #create booking
        
        booking=Booking.objects.create(
            customer=request.user,
            car=car,
            start_time=start_time,
            end_time=end_time,
            total_price=total_price
        )
        
        serializer=BookingSerializer(booking)
        
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
    
#booking details

class BookingDetailsAPIView(APIView):
    def get(self,request,pk):
        booking=get_object_or_404(Booking,pk=pk,customer=request.user)
        
        serializer=BookingSerializer(booking)
        return Response(serializer.data)
    
    def delete(self,request,pk):
        booking=get_object_or_404(Booking,pk=pk,customer=request.user)
        
        booking.status = 'cancelled'
        booking.save()
        return Response({"message": "Booking cancelled successfully"}, status=status.HTTP_201_CREATED)
    
    