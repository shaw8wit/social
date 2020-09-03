from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField(
        'User', blank=True, related_name="followingUser")


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    date = models.DateTimeField()
    likedBy = models.ManyToManyField(User, blank=True, related_name="likedBy")

    def __str__(self):
        return f"{self.id} : {self.user} posts -> {self.content} on {self.date}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.id} : {self.user} commented {self.content} on {self.post} at {self.date}"

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "content": self.content,
            "date": self.date.strftime("%b %-d %Y, %-I:%M %p")
        }
