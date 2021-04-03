# Create your models here.
from django.db.models import Model, CharField, BooleanField, IntegerField, AutoField, ForeignKey, CASCADE


class Course(Model):
    courseId = AutoField(primary_key=True)
    courseName = CharField(max_length=255, unique=True, null=False)
    subject = CharField(max_length=255, unique=False, null=False)
    courseBackground = CharField(max_length=255, unique=False, null=False)
    courseTarget = CharField(max_length=255, unique=False, null=False)
    courseFramework = CharField(max_length=255, unique=False, null=False)
    openState = BooleanField(default=True)
    approvalState = IntegerField(default=0)


class Apply(Model):
    course = ForeignKey(Course, on_delete=CASCADE, to_fields="course_id")


if __name__ == '__main__':
    pass
