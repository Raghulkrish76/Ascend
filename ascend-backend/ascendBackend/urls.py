from django.contrib import admin
from api.views import CreateUserView
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/',TokenObtainPairView.as_view(),name="login"),
    path('api/auth/register/',CreateUserView.as_view(),name = "register"),
    path('api/auth/refresh/',TokenRefreshView.as_view(),name = "token-refresh"),
    path('api/', include('api.urls')),
    
]
