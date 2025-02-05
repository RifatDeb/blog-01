from django.shortcuts import render
from rest_framework import generics , viewsets,views,mixins
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from django.utils import timezone
from django .contrib.auth.models import User
# ---------------------
from django.conf import settings
from django.core.mail import EmailMessage


# Create your views here.


class ProfileViews(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ] 

    def get(self,request):
      try:
        query =Profile.objects.get(ProUser=request.user)
        serializers = profileSerializer(query)
        Response_msg = {"error":False, "data":serializers.data}
      except:
        Response_msg = {'error':True, 'message':"Somthin is worng!! try agin"}  

      return Response(Response_msg)
    
class RegisterView(views.APIView):
    def post(self,request):
        serializers = Useserializers(data=request.data)   
        if serializers.is_valid():
            serializers.save()
            return Response({"error":False,"message":f"User is Creact '{serializers.data['username']}' "})
        return Response({"error":True,"message":"Somthing is Worng"}) 
    


class UpdateProfileImage(views.APIView):
    permission_classes=[IsAuthenticated, ]
    authentication_classes=[TokenAuthentication, ]
   #  def post(self,request):
   #       # try:
   #       User = request.user
   #       query = Profile.objects.get(ProUser=User)
   #       data = request.data
   #       serializers = profileSerializer(query,data=data,context={"request":request})
   #       serializers.is_valid(),
   #       serializers.save()
   #       # Response_msg = {"error":False, "message":"Profile is Updated"}
   #       # except:
   #          # Response_msg = {"error":True, "message":"profile not Uptade"}       
   #       return Response(serializers.data)
    def post(self,request):
        try:
            user = request.user
            query = Profile.objects.get(ProUser=user)
            data = request.data
            serializers = profileSerializer(query,data=data,context={"request":request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            return_res={"message":"Profile is Updated"}
        except:
            return_res={"message":"Somthing is Wrong Try Agane !"}
        return Response(return_res)

class UserDataUpdate(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ] 
    def post(self, request):
        try:    
            user = request.user
            data = request.data
            # print(user, "$$$$ user data")
            # print(data["first_name"])
            # print(data["last_name"])
            # print(data["email"])
            user_obj = User.objects.get(username=user)
            # print(user_obj)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            response_msg = {"error":False, "message": "user data get"}
        except:
            response_msg = {"error":True, "message": "Somthing is Worng try agin"}
        return Response(response_msg)

    


class SliderViews(APIView):

    def get (self, request):
        slider_obj = Slider.objects.all()
        slider_serializer = SliderSerializer(slider_obj, many=True,context={'request': request}).data

        return Response(slider_serializer)


class HeadingCatarogyView(APIView):
   def get(self,request):
      catagoris_obj = Catagory.objects.all()
      catagoris_serializers =CatagoreSerializers(
         catagoris_obj,many=True,context={'request': request}).data
      return Response(catagoris_serializers)   




class CatagoryView(APIView):

   def get(self,request):
      catagory_obj = Catagory.objects.all()
      catagory_serializer = CatagoreSerializers(catagory_obj,many=True).data

      data = []

      for cata in catagory_serializer:
         blog_obj = BlogPost.objects.filter(catagory=cata['id'])
         cata['catagory'] = BlogSerializers(blog_obj,many=True, context={'request': request}).data
         data.append(cata)


      return Response(data)    
   
class SingelCatagoryView(APIView):

   def get(self, request,pk):
      catagory_obj =Catagory.objects.filter(id=pk)
      catagory_serializer = CatagoreSerializers(
        catagory_obj,many=True).data

      data = []

      for cata  in catagory_serializer:
         blog_obj = BlogPost.objects.filter(catagory=cata['id'])
         cata['blog'] = BlogSerializers(blog_obj,many=True,context={'request': request}).data
         data.append(cata)
         return Response(data)
      
class BlogView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
   queryset = BlogPost.objects.all().order_by('-id')
   serializer_class = BlogSerializers

   lookup_field= 'id'

   def get (self,request,id=None):
      if id:
         return self.retrieve(request)
      
      else :
         return self.list(request)  


class RecentBlogView(APIView):

   def get (self, request):
      blog_obj = BlogPost.objects.all().order_by('-id')[:6]
      blog_serializer= BlogSerializers(blog_obj,many=True,context={'request': request}).data

      return Response(blog_serializer)     
   

class SingelBolgView (APIView):


   def get(self,request,pk):
      blog_obj = BlogPost.objects.filter(id=pk)
      data = []
      blog_serializer = SingelBlogSerializers(blog_obj,many=True,context={'request': request}).data

      for blog in blog_serializer:
         blog_view = BlogViewrs.objects.filter(blogpost=blog['id']).first()
         # print('blog_view')
         if blog_view :
            blog['view'] = blog_view.view

         else:
            blog['view'] =0


         blog_review = Review.objects.filter(blogpost=blog['id'])
         blog_review_serializer = BlogReviewSerializer(blog_review,many=True,context={'request': request}).data
         blog['review'] = blog_review_serializer

         data.append(blog)     

      return Response(blog_serializer)   


class CommentView (APIView):
   permission_classes = [IsAuthenticated, ]
   authentication_classes = [TokenAuthentication, ]


   def post (self, request):
      try:
 
         Profile = request.user.profile
      
         post_obj = BlogPost.objects.get(id=request.data['blogid'])
      

         Review.objects.create(
            Profile =Profile,
            titel = request.data['titel'],
            blogpost = post_obj

         )
         response_msg = {"error": False, "massage":"add commend"}
      except:
          response_msg = {"error": True, "massage":"Somthing Is Wong"}   
     
      return Response (response_msg)
   

class AddViews (APIView):
   def post (self, request):
      blog_id = request.data['id']
      blog_obj = BlogPost.objects.get(id=blog_id)
      blog_view_obj = BlogViewrs.objects.filter(blogpost=blog_obj).first()
      if blog_view_obj:
         blog_view_obj.view += 1
         blog_view_obj.save()

      else:
         BlogViewrs.objects.create(
         blogpost = blog_obj,view = 1)


      return Response ({'error':False,'message':"Sucsess"})    


class MostViews (APIView):
   def get (self, request):
      blog_view = BlogViewrs.objects.all().order_by('-view')[:6]
      blog_view_serializer = MostViewsSerializer(blog_view,many = True,context={'request': request}).data

      return Response (blog_view_serializer)
   

class  SendMail (APIView):
   def post (self,request):
      email = request.data['to']
      email_subject= request.data['subject']
      message_body = request.data['message_body']
      # booking_date = request.data['booking']

      emailw = EmailMessage(
         email_subject,
         message_body,
         # booking_date,
         settings.EMAIL_HOST_USER,
         [email]
      )
      emailw.send(fail_silently=False)

      return Response ({'error':False, 'message':'email send'})
   

class SearchView(APIView):
   def get (self, request, q):
      data = {}
      posts_lookup = (Q(titel__icontains=q) |
                       Q(discription__icontains=q) |
                         Q(tag__icontains=q)
                        )   
      blog_obj = BlogPost.objects.filter(date__lte = timezone.now()).filter(posts_lookup)
      data ['BlogPost'] = BlogSerializers(blog_obj,many=True,context={'request': request}).data

      # catagory_lookup = (Q(title__icontains=q))
      # catagory_obj =Catagory.objects.filter(date__lte = timezone.now()).filter(catagory_lookup)
      # data ['Catagory'] = CatagoreSerializers(catagory_obj,many=True).data

      # print(blog_obj)

      return Response(data)   
   