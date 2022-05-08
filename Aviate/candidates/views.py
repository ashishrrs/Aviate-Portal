from Aviate.settings import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.core.paginator import Paginator
from rest_framework import authentication, permissions, status
import uuid
import boto3
import sys
from .serializers import *
from .models import *


@api_view(['GET'])
def get_candidates(request):
    candidate_objects = Candidate.objects.all().order_by('-date')
    serializer = CandidateSerializer(candidate_objects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_genders(request):
    gender_objects = Gender.objects.all().order_by('gender')
    serializer = GenderSerializer(gender_objects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_status(request):
    status_objects = Status.objects.all().order_by('status')
    serializer = StatusSerializer(status_objects, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def get_candidates_by_page(request):
    data = JSONParser().parse(request)
    try:
        items = data.get('items', '')
        page_number = data.get('pagenumber', '')
        candidate_objects = Candidate.objects.all().order_by('-date')
        p = Paginator(candidate_objects, int(items))
        serializer = CandidateSerializer(p.page(int(page_number)), many=True)
        response = {}
        response["items"] = serializer.data
        response["total_pages"] = p.num_pages
        return Response(response)
    except Exception as Arg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        print(Arg)
        return Response({"exception": "An Exception Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def get_candidate_info(request, slug_text):
    data = JSONParser().parse(request)
    try:
        candidate_object = Candidate.objects.get(slug=slug_text)
        if candidate_object is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = CandidateFullSerializer(candidate_object)
        return Response(serializer.data)
    except Exception as Arg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        print(Arg)
        return Response({"exception": "An Exception Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def file_upload(request):
    _, file = request.FILES.popitem()
    file = file[0]
    try:
        response = {}
        file_uuid_name = str(uuid.uuid4()) + "--" + \
            file.name.replace(" ", "-")
        session = boto3.session.Session(aws_access_key_id=AWS_ACCESS_KEY_ID,
                                        aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
        s3 = session.resource('s3')
        s3.Bucket(AWS_BUCKET_NAME).put_object(
            Key="aviate/resume/"+file_uuid_name, Body=file, ACL='public-read')
        response["url"] = f"https://s3.ap-south-1.amazonaws.com/{AWS_BUCKET_NAME}/aviate/resume/" + file_uuid_name
        return Response(response)
    except Exception as Arg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        print(Arg)
        return Response({"exception": "An Exception Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def add_candidate(request):
    data = JSONParser().parse(request)
    try:
        name = data.get('name', '')
        contact_No = data.get('contact_No', '')
        email_id = data.get('email_id', '')
        description = data.get('description', '')
        experience = data.get('experience', '')
        address = data.get('address', '')
        age = data.get('age', '')
        gender = data.get('gender', '')
        url = data.get('url', '')
        gender_object = Gender.objects.get_or_create(gender=gender)[0]
        candidate = Candidate.objects.create(name=name,
                                             description=description, contact_No=contact_No, email_id=email_id,
                                             age=age, gender=gender_object, address=address, experience=experience, url=url)
        candidate.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as Arg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        print(Arg)
        return Response({"exception": "An Exception Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def change_status(request):

    data = JSONParser().parse(request)
    try:
        id = data.get('id', '')
        curr_status = data.get('status', '')
        if(id == ""):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        status_object = Status.objects.get_or_create(status=curr_status)[0]
        candidate = Candidate.objects.get(id=id)
        if candidate is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if candidate.status.id == 3:
            if status_object.id == 2:
                mail_subject = "Update from Aviate"
                html_message = render_to_string('rejected.html', {'val1': candidate.name,
                                                                  'val2': candidate.description})
                message = strip_tags(html_message)
                to_email = candidate.email_id
                print(message)
                email = EmailMultiAlternatives(
                    "Update from Aviate",
                    message,
                    EMAIL_HOST_USER,
                    [to_email]
                )
                email.attach_alternative(html_message, "text/html")
                email.attach("logo.svg")
                email.send()
            elif status_object.id == 1:
                mail_subject = "Update from Aviate"
                html_message = render_to_string('rejected.html', {'val1': candidate.name,
                                                                  'val2': candidate.description})
                # print(html_message)
                message = strip_tags(html_message)
                to_email = candidate.email_id
                # print(to_email)
                email = EmailMultiAlternatives(
                    "Update from Aviate",
                    message,
                    EMAIL_HOST_USER,
                    [to_email]
                )
                email.attach_alternative(html_message, "text/html")
                email.send()

        candidate.status = status_object
        candidate.save()
        return Response(status=status.HTTP_201_CREATED)
    except Exception as Arg:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print(exc_type, exc_tb.tb_lineno)
        print(Arg)
        return Response({"exception": "An Exception Occured"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
