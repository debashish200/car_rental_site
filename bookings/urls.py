from django.urls import path

from .views import *

urlpatterns = [
    path("",BookingListCreateAPIView.as_view()),
    path("<int:pk>/",BookingDetailsAPIView.as_view()),
]

