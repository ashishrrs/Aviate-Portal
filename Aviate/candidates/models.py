from django.db import models
import datetime
from django.utils.text import slugify
# Create your models here.


class Gender(models.Model):
    gender = models.CharField(max_length=100)

    def __str__(self):
        return self.gender


class Status(models.Model):
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.status

    class Meta:
        verbose_name_plural = 'Status'


class Candidate(models.Model):
    name = models.CharField(max_length=100)
    contact_No = models.CharField(max_length=100)
    email_id = models.CharField(max_length=100)
    description = models.TextField(null=True)
    resume_url = models.CharField(max_length=100)
    experience = models.TextField(null=True)
    address = models.TextField(null=True)
    gender = models.ForeignKey(Gender, on_delete=models.CASCADE)
    age = models.IntegerField()
    status = models.ForeignKey(Status, on_delete=models.CASCADE, default=3)
    date = models.DateTimeField(default=datetime.datetime.now)
    slug = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super(Candidate, self).save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(self.name + "-" + str(self.id))

    class Meta:
        ordering = ['name']
