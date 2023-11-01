from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from rest_framework import generics

from . models import *
from . serializers import *

# Create your views here.

@api_view(['POST'])
def register(request):
    data = request.data
    department_id = data['degree']  # ID del departamento enviado en los datos del formulario
    department = get_object_or_404(Department, pk=department_id)  # Obtener el objeto Department

    user = User.objects.create(
        code=data['code'],
        email=data['email'],
        name=data['name'],
        last_name=data['last_name'],
        degree=department, # Asignar el objeto Department
        password=make_password(data['password'])
    )
    
    serializer = RegisterUserSerializer(user, many=False)
    return Response(serializer.data)

class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class DepartmentList(generics.ListAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer