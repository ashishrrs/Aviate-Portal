
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
    status_val = serializers.CharField(source='status.status')

    class Meta:
        model = Candidate
        fields = ['id', 'name', 'email_id', 'date', 'status_val']
