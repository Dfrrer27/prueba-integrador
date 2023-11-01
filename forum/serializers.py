from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from . models import *

# El registro del usuario
class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['code', 'email', 'name', 'last_name', 'degree', 'password']

# Obtener diferentes cosas del token, indicar que cosas queremos mandar por el token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['code'] = user.code
        token['email'] = user.email
        token['name'] = user.name
        token['last_name'] = user.last_name
        token['degree'] = user.degree.id # Usar solo el ID del departamento
        token['avatar'] = user.avatar.url  
        token['is_staff'] = user.is_staff

        return token

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'