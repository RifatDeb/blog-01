# Generated by Django 5.1.5 on 2025-01-24 09:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Blog', '0003_blogviewrs'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Images', models.ImageField(blank=True, null=True, upload_to='profile/')),
                ('ProUser', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titel', models.TextField()),
                ('Profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Blog.profile')),
                ('blogpost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Blog.blogpost')),
            ],
        ),
    ]
