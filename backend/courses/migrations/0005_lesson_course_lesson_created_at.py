# Generated by Django 4.2 on 2024-12-17 12:06

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_rename_course_lesson_course_headline'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='course',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='courses.course'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='lesson',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]