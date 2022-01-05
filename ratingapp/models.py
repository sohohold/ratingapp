from django.db import models
from django.utils import timezone

# field=column
class User(models.Model):
    author_id = models.BigIntegerField(unique=True, null=False)
    username = models.CharField(max_length=30, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.username
    class Meta:
        db_table = 'usertable'

class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    url = models.URLField(null=True) # twitter.com/...
    media_url = models.URLField(unique=True, null=False, default='https://pbs.twimg.com/') # pbs.twimg.com/...
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return self.media_url
    class Meta:
        db_table = 'imagetable'

class Rating(models.Model):
    client = models.CharField(max_length=30, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ForeignKey(Image, on_delete=models.SET_NULL, null=True)
    cd = models.IntegerField(null=False)
    sa = models.IntegerField(null=False)
    cmp = models.IntegerField(null=False)
    hue = models.IntegerField(null=False)
    edit = models.IntegerField(null=False)
    nar = models.IntegerField(null=False)
    created_at = models.DateTimeField(default=timezone.now)
    session = models.CharField(max_length=40, null=True)
    def __str__(self):
        return str(self.user)
    class Meta:
        db_table = 'ratingtable'

# $docker-compose exec db bash -> $psql -U postgres
# postgresql table name should be lowercase