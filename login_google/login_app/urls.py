from django.urls import path
from .views import *

urlpatterns = [
    path('google/',GoogleLogin.as_view(), name='google_login'),
    path('user/', UserDetailsView.as_view(), name='user_details'),
]
