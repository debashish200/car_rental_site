from django.urls import path
from .views import *

urlpatterns = [
    path("",CarListCreateAPIView.as_view()),
    path("<int:pk>/",CarRetrieveUpdateDeleteAPIView.as_view()),
]
