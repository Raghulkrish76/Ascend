from django.urls import path
from .views import JobListView,CreateJobView
from .views import JobUpdateView,JobDeleteView,JobDetailView
from .views import StudentsList
from .views import CreateStudentProfileView,StudentProfileExistsView
from .views import CreateApplicationView,JobApplicationView
from .views import CreateRequestedApplicationView
from .views import RequestedStudentsView,UpdateApplicationforRequestedStudents
from .views import UpdateShortlistedStudents,ViewShortlisted
from .views import StudentDetailsView
urlpatterns=[

    path('jobs/',JobListView.as_view(),name = "job-list"),
    path('jobs/<int:pk>/',JobDetailView.as_view(),name = "job-detail"),
    path('jobs/create/',CreateJobView.as_view(),name = "create-job"),
    path('jobs/update/<int:pk>/',JobUpdateView.as_view(),name = "update-view"),
    path('jobs/delete/<int:pk>/',JobDeleteView.as_view(),name = "delete-view"),
    path('students/',StudentsList.as_view(),name = "students-list"),
    path('application/create/<int:job_id>/',CreateApplicationView.as_view(),name = "create-application"),
    path('application/job/<int:job_id>',JobApplicationView.as_view(),name = "Job-applications"),
    path('studentprofile/create/',CreateStudentProfileView.as_view(),name = "create-studentprofile"),
    path('studentprofile/exists/',StudentProfileExistsView.as_view(),name = "student-profile-exists"),
    path('studentprofile/',StudentDetailsView.as_view(),name = "student-profile"),
    path('application/create/requested/<int:job_id>/',CreateRequestedApplicationView.as_view(),name = "create-requestedApplication"),
    path('application/requested/<int:job_id>',RequestedStudentsView.as_view(),name = "Requested-students"),
    path("application/approve/<int:job_id>/",UpdateApplicationforRequestedStudents.as_view(),name = "approve-requested-students"),
    path("shortlisted/update/<int:job_id>/",UpdateShortlistedStudents.as_view(),name = "update-shortlistedStudents"),
    path('application/shortlisted/<int:job_id>',ViewShortlisted.as_view(),name = "View-shortlisted"),
    
    


]