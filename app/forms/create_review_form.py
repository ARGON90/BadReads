from flask_wtf import FlaskForm
from wtforms.fields import (
    StringField, SubmitField, TextAreaField, DateTimeField, IntegerField
)
from wtforms.validators import DataRequired


class LoginForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    book_id = IntegerField("Book Id", validators=[DataRequired()])
    review = TextAreaField("Review", validators=[DataRequired()])
    stars = IntegerField("Employee number", validators=[DataRequired()])
    created_at = DateTimeField("Password", validators=[DataRequired()])
    updated_at = DateTimeField("Password", validators=[DataRequired()])
