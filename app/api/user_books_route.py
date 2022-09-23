from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required, current_user
from app.models import Book, db


user_books_route = Blueprint('user_books', __name__)

@user_books_route.route('/my-books')
@login_required
def get_user_books():
  # print('current_user', current_user)
  user_books = Book.query.filter(Book.user_id == current_user.id).all()
  user_books_dict = {user_book.id:user_book.to_dict() for user_book in user_books}
  return user_books_dict
