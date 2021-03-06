# Generated by Django 4.0.4 on 2022-05-07 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('candidates', '0003_candidate_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='slug',
            field=models.SlugField(default='slugify-urls-in-django', max_length=255, unique=True),
            preserve_default=False,
        ),
    ]
