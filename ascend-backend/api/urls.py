from django.urls import path
from .views import JobListView,CreateJobView
from .views import JobUpdateView,JobDeleteView,JobDetailView
from .views import StudentsList
from .views import CreateApplicationView,JobApplicationView
urlpatterns=[

    path('jobs/',JobListView.as_view(),name = "job-list"),
    path('jobs/<int:pk>/',JobDetailView.as_view(),name = "job-detail"),
    path('jobs/create/',CreateJobView.as_view(),name = "create-job"),
    path('jobs/update/<int:pk>/',JobUpdateView.as_view(),name = "update-view"),
    path('jobs/delete/<int:pk>/',JobDeleteView.as_view(),name = "delete-view"),
    path('students/',StudentsList.as_view(),name = "students-list"),
    path('application/create/<int:job_id>/',CreateApplicationView.as_view(),name = "create-application"),
    path('application/job/<int:job_id>',JobApplicationView.as_view(),name = "Job-applications")

]