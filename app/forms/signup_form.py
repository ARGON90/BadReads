from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[
            DataRequired(message="Enter your username"), 
            username_exists,
            Length(min=2, max=40, message="Username must be between 2 to 40 characters")
            ])
    email = StringField(
        'email', 
        validators=[ DataRequired(message="Enter your email"), 
            user_exists, 
            Email("Please provide a valid email"),
            ])
    password = StringField('password', validators=[
            DataRequired(message="Enter your password"),
            Length(min=6, message="Password must be at least 6 characters")
            ])

