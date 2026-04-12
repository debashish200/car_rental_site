from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Car(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cars')
    
    name = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    
    fuel_type = models.CharField(max_length=50)
    transmission = models.CharField(max_length=50)
    seats = models.IntegerField()
    
    location = models.CharField(max_length=100)
    
    is_available = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name