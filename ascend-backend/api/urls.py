from django.urls import path
from .views import JobListView,CreateJobView
urlpatterns=[

    path('jobs/',JobListView.as_view(),name = "job-list"),
    path('jobs/create/',CreateJobView.as_view(),name = "create-job")
]