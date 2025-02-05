from django .urls import path,include
from .views import *

urlpatterns = [

   path('slider/',SliderViews.as_view(),name="slider"),
   path('catagoryview/',CatagoryView.as_view(),name="catagoryview"),
   path('catagoryhedingview/',HeadingCatarogyView.as_view(),name="catagoryhedingview"),
   path('singelcatagory/<int:pk>/',SingelCatagoryView.as_view(),name="singelcatagory"),
   path('blogview/',BlogView.as_view(),name="blogview"),
   path('recentblogview/',RecentBlogView.as_view(),name="recentblogview"),
   path('singelblog/<int:pk>/',SingelBolgView.as_view(),name="singelblog"),
   path('commentview/',CommentView.as_view(),name="commentview"),
   path('Addblogview/',AddViews.as_view(),name="Addblogview"),
   path('sendmail/',SendMail.as_view(),name="sendmail"),
   path('searchview/<str:q>/',SearchView.as_view(),name="searchview"),
   path('mostview/',MostViews.as_view(),name="mostview"),
   path ('profile/',ProfileViews.as_view(),name="profile"),
   path('register/',RegisterView.as_view(),name="register"),
   path('updateprofileimage/',UpdateProfileImage.as_view(),name="updateprofileimage"),
   path('userdataupdate/',UserDataUpdate.as_view(),name="userdataupdate"),



 



  



]