
from rest_framework import serializers
from .models import *


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class CandidateFullSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        exclude = ('date', 'slug')


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['name', 'email_id', 'date', 'status']
