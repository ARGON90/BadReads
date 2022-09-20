from flask_wtf import FlaskForm
from wtforms.fields import (
    TextAreaField, DateTimeField, IntegerField
)
from wtforms.validators import DataRequired
from datetime import datetime


class CreateReview(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    book_id = IntegerField("Book Id", validators=[DataRequired()])
    review = TextAreaField("Review", validators=[DataRequired()])
    stars = IntegerField("Stars", validators=[DataRequired()])
    created_at = DateTimeField("Created At", default=datetime.utcnow, validators=[DataRequired()])
    updated_at = DateTimeField("Updated At", default=datetime.utcnow, validators=[DataRequired()])
