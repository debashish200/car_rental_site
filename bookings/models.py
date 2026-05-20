from django.db import models
from django.conf import settings
from cars.models import Car

User = settings.AUTH_USER_MODEL
#models

class Booking(models.Model):  #booking model
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    customer = models.ForeignKey(User, on_delete=models.CASCADE,related_name='bookings')  #user who made the booking
    
    car = models.ForeignKey(Car, on_delete=models.CASCADE,related_name="car_bookings")  #car that is booked
    
    start_date = models.DateField()  #start date of the booking
    end_date = models.DateField()  #end date of the booking
    
    total_price=models.DecimalField(max_digits=10, decimal_places=2)  #total price of the booking
    
    status=models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')  #status of the booking
    
    created_at = models.DateTimeField(auto_now_add=True)  #timestamp when the booking was created
    
    

    def __str__(self):
        return f"{self.customer.username} booked {self.car.name}"