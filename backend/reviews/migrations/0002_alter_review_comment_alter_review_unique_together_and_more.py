# Generated by Django 4.2 on 2024-12-18 12:33

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('courses', '0005_lesson_course_lesson_created_at'),
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='comment',
            field=models.TextField(validators=[django.core.validators.MaxLengthValidator(500)]),
        ),
        migrations.AlterUniqueTogether(
            name='review',
            unique_together={('user', 'course')},
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(validators=[django.core.validators.MaxLengthValidator(500)])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies', to='reviews.review')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='replies', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
