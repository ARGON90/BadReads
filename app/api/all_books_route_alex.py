from flask import Blueprint
from app.models import Book

all_books_route = Blueprint('books', __name__)


@all_books_route.route('/')
def all_books():
    print('INSIDE BOOKS "/books"')
    books = Book.query.all()
    books_dict = {book.id:book.to_dict() for book in books}
    return books_dict
