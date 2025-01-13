from django.db import models
from api.models import Room

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now=True)
    refresh_token = models.CharField(max_length=150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class Vote(models.Model):
    #who, what, what room, time
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now=True)
    song_id = models.CharField(max_length=50)
    #pass Room object instead of querying down the code later
    #on_delete: delete anything that was referencing this room
    room = models.ForeignKey(Room, on_delete=models.CASCADE)