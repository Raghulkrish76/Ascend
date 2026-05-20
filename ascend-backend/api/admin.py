from django.contrib import admin
from .models import User,Job,Application,StudentProfile
# Register your models here.

admin.site.register(User)
admin.site.register(Job)
admin.site.register(Application)
admin.site.register(StudentProfile)