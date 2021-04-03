from django.urls import path

from tms_manager.views import ping, CourseQuery

urlpatterns = [
    path('ping/', ping),

    path('course', CourseQuery.as_view())
]
