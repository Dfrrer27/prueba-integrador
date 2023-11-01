from django.db import models
from django.utils import timezone
from django.contrib.auth.models import ( AbstractBaseUser, PermissionsMixin, UserManager )

class Department(models.Model):
    name_depart = models.CharField(max_length=100)
    
    def __str__(self):
	    return self.name_depart

class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Los usuarios deben tener una dirección de correo electrónico.')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            email=email,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email=None, password=None, **extra_fields):
         extra_fields.setdefault('is_staff', True)
         return self._create_user( email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    code = models.CharField(max_length=10, unique=True)
    email = models.EmailField(max_length=50, unique=True)
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    degree = models.ForeignKey(Department, on_delete=models.CASCADE)
    avatar = models.ImageField(default='avatar.png')    
    date_joined = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ["-date_joined"]

    def __str__(self):
	    return f" {self.name} {self.last_name}"
 
class Publication(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_joined = models.DateTimeField(default=timezone.now) 
    degree = models.ForeignKey(Department, on_delete=models.CASCADE)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Comentario(models.Model):
    content = models.TextField()
    date_joined = models.DateTimeField(default=timezone.now)
    publication = models.ForeignKey(Publication, on_delete=models.CASCADE)
    autor = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.content