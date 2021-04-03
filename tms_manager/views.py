# Create your views here.
from django.views import View

from tms_manager.models import Course
from tms_manager.utils import ApiResponse


def ping(request):
    return ApiResponse(200, "你好", {"name": "wangbohan"}, page=2, total=10)()


class CourseQuery(View):
    def get(self, request):
        courses = Course.objects.all()
        print(courses)
        return ApiResponse(200, "请求成功", list(courses))()
