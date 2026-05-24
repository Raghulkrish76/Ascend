from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    role = models.CharField(max_length=10,default='user')

    def __str__(self):
        return self.username

class Job(models.Model):
    title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=100)
    description = models.TextField()
    skills_requires = models.TextField()
    stipend = models.CharField(max_length=20)
    salary = models.CharField(max_length=20)
    location = models.CharField(max_length=30)
    posted_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name = 'jobs')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
class Application(models.Model):

    class Meta:
        unique_together = ['student','job']
    DRIVE_STATUS_CHOICES = [
        ("requested","Requested"),
        ("approved","Approved"),
        ("rejected","Rejected"),
    ]
    ROUND_STATUS_CHOICES = [
        ("none","None"),
        ("shortlisted","Shortlisted"),
        ("eliminated","Eliminated"),
        ("selected","Selected"),
    ]


    student = models.ForeignKey(User,on_delete=models.CASCADE)
    job = models.ForeignKey(Job,on_delete=models.CASCADE)
    drivestatus = models.CharField(max_length=20,choices=DRIVE_STATUS_CHOICES,default = "requested")
    roundstatus = models.CharField(max_length=20,choices=ROUND_STATUS_CHOICES,default = "none")
    applied_at = models.DateTimeField(auto_now_add=True)

class StudentProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    studentname = models.CharField(max_length=255)
    batch = models.CharField(max_length=35)
    phone = models.CharField(max_length=15,blank = True)
    department = models.CharField(max_length=255,blank=True)
    cgpa = models.DecimalField(max_digits=4,decimal_places = 2 ,null = True,blank = True)
    skills = models.CharField(max_length=255)
    resume = models.FileField(upload_to = 'resumes/',null = True,blank = True)
    year_of_study = models.IntegerField(null=True,blank = True)

    
    def __str__(self):
        return self.studentname
