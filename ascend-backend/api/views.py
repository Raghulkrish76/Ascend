from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import CreateAPIView
from .models import User,Job
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer,JobSerializer
from .permissions import IsAdmin






class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class CreateJobView(generics.CreateAPIView):
    
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAdmin]

    def perform_create(self,serializer):
        serializer.save(posted_by = self.request.user)

class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

