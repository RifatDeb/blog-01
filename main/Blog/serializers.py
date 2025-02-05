from rest_framework import serializers 
from .models import *
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token 




User = get_user_model()        
class Useserializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','password','first_name','last_name','email','id']
        extra_kwargs = {"password":{"write_only":True,'required':True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        Profile.objects.create(ProUser=user)
        return user
    
class profileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = ['ProUser']
  


    def validate(self,attrs):
        attrs['ProUser'] = self.context['request'].user
        return attrs

    def to_representation(self,instance):
        response = super().to_representation(instance)
        response['ProUser'] = Useserializers(instance.ProUser).data
        return response



class SliderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slider
        fields = "__all__"

        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url()


class CatagoreSerializers(serializers.ModelSerializer):
    class Meta:
        model = Catagory
        fields = "__all__"  
        
class BlogSerializers(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"
        depth = 1

        def imageurl(self, obj):
            request = self.context.get('request')
            return request.url()
class SingelBlogSerializers(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = "__all__"
        depth = 1

    def imageurl(self, obj):
            request = self.context.get('request')
            return request.url()     
class BlogReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['titel']
        # depth = 1


    def to_representation(self,instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['Profile'] = profileSerializer(instance.Profile,context={'request': request}).data
        return response        
        
   
        

class MostViewsSerializer(serializers.ModelSerializer):
     class Meta:
          model = BlogViewrs
          fields = "__all__"    

     def to_representation(self,instance):
        response = super().to_representation(instance)
        request = self.context.get('request')
        response['blogpost'] = BlogSerializers(instance.blogpost,context={'request': request}).data
        return response        
        







