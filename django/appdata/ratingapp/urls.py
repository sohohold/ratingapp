from django.urls import path
from . import views


app_name = 'ratingapp'

urlpatterns = [
    path('', views.top, name='top'),
    path('modify', views.modify_tweet_link, name='modify'),
    path('selected', views.selected, name='selected'),
    path('post', views.post_to_rating, name='post'),
    path('about', views.AboutView.as_view(), name='about'),
    path('recently', views.recently, name='recently'),
]