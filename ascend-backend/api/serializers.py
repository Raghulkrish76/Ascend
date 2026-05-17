from rest_framework import serializers
from .models import User,Job
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class UserSerializer(serializers.ModelSerializer):
    admin_token = serializers.CharField(write_only=True,required=False)

    class Meta:
        model = User
        fields = ['id','username','password','role','admin_token']
        extra_kwargs = {'password':{'write_only':True}, 'role':{'read_only':True}}

    def create(self, validated_data):
        admin_token = validated_data.pop('admin_token',None)
        ADMIN_TOKEN = 'admin@ascend05'
        if admin_token and ADMIN_TOKEN == admin_token:
            role = 'admin'
        else:
            role = 'student'
        user = User.objects.create_user(
            username = validated_data['username'],
            password=validated_data['password'],
            role = role
        )
        return user
    
class AscendTokenSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username

        return token

class JobSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Job 
        fields = '__all__'
        read_only_fields = ['posted_by']