from django.urls import path
from .views import *

app_name = 'user_management'

urlpatterns = [
    path('candidates', get_candidates),
    path('candidates/pages', get_candidates_by_page),
    path('genders', get_genders),
    path('status', get_status),
    path('candidate/add', add_candidate),
    path('candidate/info/<slug:slug_text>', get_candidate_info),
    path('candidate/change-status', change_status),
    path('file-upload', file_upload),
]
