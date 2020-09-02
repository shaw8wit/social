from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("createPost", views.createPost, name="createPost"),
    path("profile/<int:id>", views.profile, name="profile"),
    path("follow", views.follow, name="follow"),
    path("following", views.following, name="following"),

    # API routes
    path("editPost/<int:id>", views.editPost, name="editPost"),
    path("comment/<int:id>", views.comment, name="comment")
]
