# Create your models here.
from django.db import models
from django.db.models import CharField, BooleanField, IntegerField, AutoField


class Course(models.Model):
    courseId = AutoField(primary_key=True)
    courseName = CharField(max_length=255, unique=True, null=False)
    subject = CharField(max_length=255, unique=False, null=False)
    courseBackground = CharField(max_length=255, unique=False, null=False)
    courseTarget = CharField(max_length=255, unique=False, null=False)
    courseFramework = CharField(max_length=255, unique=False, null=False)
    openState = BooleanField(default=True)
    approvalState = IntegerField(default=0)
