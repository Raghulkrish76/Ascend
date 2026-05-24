from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.generics import CreateAPIView,DestroyAPIView,UpdateAPIView
from rest_framework.views import APIView
from .models import User,Job,Application,StudentProfile
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer,JobSerializer,ApplicationSerializer
from .permissions import IsAdmin
from .serializers import AscendTokenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import StudentProfileSerializer

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
    

class StudentsList(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAdmin]
    def get_queryset(self):
         return User.objects.filter(role = "user")
    


class CreateApplicationView(APIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAdmin]

    def post(self,request,job_id):
        students = request.data.get("students")
        job = Job.objects.get(id=job_id)

        for student_id in students:
            student = User.objects.get(id=student_id)

            if student.role != "user":
                continue
            Application.objects.get_or_create(
                student=student,
                job=job,

                defaults = {
                    "drivestatus":"approved"
                }
            )
        return Response({"Students added"})
    
class CreateRequestedApplicationView(APIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def post(self,request,job_id):

        job = Job.objects.get(id=job_id)
        student = User.objects.get(id=request.user.id)
        Application.objects.get_or_create(
                student=student,
                job=job,

                defaults = {
                    "drivestatus":"requested"
                }
            )
        return Response({"Student Requested "})






class JobApplicationView(APIView):
    permission_classes = [IsAdmin]

    def get(self,request,job_id):
        shortlisted_applications = Application.objects.filter(job=job_id,roundstatus= "shortlisted")

        if shortlisted_applications.exists()==False:
            applications = Application.objects.filter(
                job=job_id,
                drivestatus = "approved"
            )
        else:
            applications = Application.objects.filter(
                job=job_id,
                roundstatus = "shortlisted"
            )

        serializer = ApplicationSerializer(applications,many=True)

        return Response(serializer.data)


class CreateStudentProfileView(generics.CreateAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

class StudentProfileExistsView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self,request):
        profile = StudentProfile.objects.filter(user=request.user).first()

        if profile:
            return Response({'exists':True})
        else:
            return Response({'exists':False})
        
class RequestedStudentsView(APIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAdmin]

    def get(self,request,job_id):
        requested_students = Application.objects.filter(drivestatus = "requested",job=job_id)
        serializer = ApplicationSerializer(requested_students,many=True)

        return Response(serializer.data)

class UpdateApplicationforRequestedStudents(APIView):
    permission_classes = [IsAdmin]
    
    def patch(self,request,job_id):
        application_ids = request.data.get("students",[])
        
        applications = Application.objects.filter(
            id__in = application_ids,
            job = job_id,
            drivestatus = "requested"
        )
        applications.update(drivestatus="approved")
        return Response({"messages":"Students approved"})
    
class UpdateShortlistedStudents(APIView):
    permission_classes = [IsAdmin]

    def post(self,request,job_id):
        shortlisted_ids = request.data.get("shortlisted_ids",[])
        roundstatus = request.data.get("roundstatus")

        applications = Application.objects.filter(
            job = job_id,
        )
        for application in applications:
            if application.id in shortlisted_ids:
                application.roundstatus = roundstatus
            else:
                application.roundstatus = "eliminated"
            application.save()
        return Response({"message":"Students Shortlisted"})   

class ViewShortlisted(APIView):
    permission_classes = [IsAdmin]

    def get(self,request,job_id):
        applications = Application.objects.filter(job=job_id,roundstatus = "shortlisted")
        serializer = ApplicationSerializer(applications,many=True)

        return Response(serializer.data)
    