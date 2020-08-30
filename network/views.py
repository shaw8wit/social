from django.urls import reverse
from django.utils import timezone
from django.shortcuts import render
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout

from .models import User, Post, Comment


def index(request):
    posts = Post.objects.all()
    return render(request, "network/index.html", {
        "posts": reversed(posts)
    })


def following(request):
    se = {user.id for user in request.user.following.all()}
    return render(request, "network/index.html", {
        "posts": reversed(Post.objects.filter(user__in=se))
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def createPost(request):
    if request.method == "POST":
        content = request.POST["content"]
        user = request.user
        time = timezone.now()
        post = Post.objects.create(
            user=user, content=content, date=time, likes=0)
        post.save()
    return HttpResponseRedirect(reverse("index"))


def profile(request, id):
    count = 0
    reqUser = User.objects.get(id=id)
    for user in User.objects.all():
        if user.following.filter(id=id).exists():
            count += 1
    posts = Post.objects.filter(user=reqUser)
    return render(request, "network/profile.html", {
        'userInfo': reqUser,
        'following': request.user.following.filter(id=id).exists(),
        'followers': count,
        'posts': reversed(posts)
    })


def follow(request):
    if request.method == "POST":
        user = User.objects.get(id=request.POST["user"])
        follower = request.user
        following = request.POST["following"]
        if following == "True":
            follower.following.remove(user)
        else:
            follower.following.add(user)
        follower.save()
        return HttpResponseRedirect(reverse("profile", kwargs={'id': user.id}))
    return HttpResponseRedirect(reverse("index"))
