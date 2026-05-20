from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Car
        fields = '__all__'