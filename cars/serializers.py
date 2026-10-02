from rest_framework import serializers
from .models import Car, CarImage


class CarImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CarImage
        fields = ["id", "image"]

    def get_image(self, obj):
        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(obj.image.url)

        return obj.image.url


class CarSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    images = CarImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Car
        fields = "__all__"
        
class CarImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarImage
        fields = ["image"]