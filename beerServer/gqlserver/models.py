from django.db import models


# Create your models here.
class Message(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.PROTECT)
    creation_date = models.DateTimeField(auto_now_add=True)
    message = models.TextField()


class Customer(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.PROTECT)
    creation_date = models.DateTimeField(auto_now_add=True)
    first_name = models.TextField()
    second_name = models.TextField()
    email = models.TextField()
    password = models.TextField()
