# Generated by Django 4.0 on 2021-12-12 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ratingapp', '0001_add_models'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='author_id',
            field=models.BigIntegerField(unique=True),
        ),
    ]
