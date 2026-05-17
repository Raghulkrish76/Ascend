from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import CreateAPIView,DestroyAPIView,UpdateAPIView
from .models import User,Job
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer,JobSerializer
from .permissions import IsAdmin
from .serializers import AscendTokenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class AscendTokenView(TokenObtainPairView):
    serializer_class = AscendTokenSerializer

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

class JobDetailView(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]

class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAdmin]
    
class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [AllowAny]
    

