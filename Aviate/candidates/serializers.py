
from ast import Expression
from xml.etree.ElementInclude import include
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
    status_val = serializers.CharField(source='status.status')
    gender_val = serializers.CharField(source='gender.gender')

    class Meta:
        model = Candidate
        fields = ['id', 'name', 'email_id', 'date', 'status_val', 'gender_val',
                  'description', 'contact_No', 'age', 'resume_url', 'address', 'experience']


class CandidateSerializer(serializers.ModelSerializer):
    status_val = serializers.CharField(source='status.status')

    class Meta:
        model = Candidate
        fields = ['id', 'name', 'email_id', 'date', 'status_val']
