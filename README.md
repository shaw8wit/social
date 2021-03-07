# social

[![GitHub license](https://img.shields.io/badge/License-MIT-blue.svg?color=ede2ee)](LICENSE)
![Github Followers](https://img.shields.io/github/followers/shaw8wit?label=Follow&color=ede2ee)
![GitHub stars](https://img.shields.io/github/stars/shaw8wit/social?color=ede2ee)&nbsp;
![GitHub forks](https://img.shields.io/github/forks/shaw8wit/social?color=ede2ee)&nbsp;
![GitHub watchers](https://img.shields.io/github/watchers/shaw8wit/social?color=ede2ee)

A single application website built using django, javascript and custom API's and appropriate error handling.


## About

+ Users can register and login to the website.
+ Logged in users can:
  + View all posts.
  + Create new posts
  + View users profiles.
  + Edit one's own posts.
  + Like and dislike any posts.
  + Follow and Unfollow other users.
  + View and make comments on any posts.
  + Filter posts based on who they follow.
+ Anonymous user can:
  + View all posts.
  + View all comments.
  + View users profiles.

## Getting Started
+ clone or download the repo and ```cd``` into the directory.
+ Run ```python manage.py makemigrations network``` to make migrations for the ```network``` app.
+ Run ```python manage.py migrate``` to apply migrations to your database.
+ Run ```python manage.py runserver``` to run the server in your local machine.

### API's
+ ```GET /comment/<int:id>``` sending a ```GET``` request to ```/comment/id``` where ```id``` is the id of the post whose comments you want. It will return the json representation of the comment if it exists.
+ ```PUT /editPost/<int:id>``` sending a ```PUT``` request to ```/editPost/id``` where ```id``` is the id of the post you are trying to modify, is used to modify status of each post.
+ ```POST /comment/<int:id>``` to ```POST``` a comment request to ```/comment/id```where ```id``` is the id of the post you are trying to comment on. This requires just the comment body to be submitted though the request of a logged in user.
