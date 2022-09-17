from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models import Book

all_books_route = Blueprint('books', __name__)


@all_books_route.route('/')
def all_books():
    print('INSIDE BOOKS "/books"')
    books = Book.query.all()
    books_dict = {book.id:book.to_dict() for book in books}
    return books_dict

@all_books_route.route('/<int:id>')
def books_by_id():
    print('INSIDE BOOKS "/books/id"')
    return 'howdy howdy howdy'
