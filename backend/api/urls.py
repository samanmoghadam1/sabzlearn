from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create/user/', views.create_user, name='create-user'),
    path('user-info/', views.user_info, name='user-info'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('refresh-view/', views.RefreshTokenView.as_view(), name='refresh-token'),
]
