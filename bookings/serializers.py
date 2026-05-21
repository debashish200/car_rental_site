from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    customer = serializers.ReadOnlyField(source='customer.username')  # Display the username of the customer
    
    class Meta:
        model=Booking
        fields='__all__'
        
        