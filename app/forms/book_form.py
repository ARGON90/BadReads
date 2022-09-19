from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


class CreateBook(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(
      min=1, max=255, message='You have exceeded the maximum number of characters allowed.')])
  year = IntegerField('Year', validators=[DataRequired(), NumberRange(min=0, max=2022, message='Please provide a valid release year.')])
  author = StringField('Author', validators=[DataRequired(), Length(
      min=1, max=255, message="You have exceeded the maximum number of characters allowed.")])
  description = StringField('Description', validators=[DataRequired(), Length(min=1, max=5000, message='You have exceeded the maximum number of characters allowed.')])
  image_url = StringField('Image URL', validators=[DataRequired(), FileAllowed(['jpg', 'jpeg', 'png', 'tiff'])])
