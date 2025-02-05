from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    ProUser = models.OneToOneField(User, on_delete=models.CASCADE)
    Images = models.ImageField(upload_to='profile/',null=True,blank=True)

    def __str__(self):
        return self.ProUser.username

class Slider(models.Model):

    Title= models.CharField(max_length=250)
    Images= models.ImageField(upload_to="Slider")
    Date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.Title

class Catagory(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title   
    


class BlogPost(models.Model):
    titel = models.CharField(max_length=200)
    image = models.ImageField(upload_to='Blog/')
    date = models.DateTimeField(auto_now_add=True)
    discription = models.TextField()
    tag = models.TextField(blank=True,null=True)
    catagory =models.ManyToManyField(Catagory)

    def __str__(self):
        return self.titel

class BlogViewrs(models.Model):
    blogpost = models.OneToOneField(BlogPost, on_delete=models.CASCADE)
    view = models.PositiveIntegerField(default='0')

    def __str__(self):
        return self.blogpost.titel
    

class Review (models.Model):
    blogpost = models.ForeignKey(BlogPost,on_delete=models.CASCADE)
    Profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    titel = models.TextField()


    


