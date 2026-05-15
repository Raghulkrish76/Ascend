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
    