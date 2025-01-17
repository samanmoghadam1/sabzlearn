# Generated by Django 4.2 on 2025-01-09 07:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('courses', '0007_course_point'),
        ('orders', '0003_cartitem_order'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchasedCourses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('added_at', models.DateTimeField(auto_now_add=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='purchased_courses', to='courses.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchased_courses', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
