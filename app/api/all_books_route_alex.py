from cmath import log
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Book, db
from app.forms import CreateBook

all_books_route = Blueprint('books', __name__)


@all_books_route.route('/')
def all_books():
    print('INSIDE BOOKS "/books"')
    books = Book.query.all()
    books_dict = {book.id:book.to_dict() for book in books}
    return books_dict


@all_books_route.route('/', methods=['POST'])
@login_required
def add_user_book():
  form = CreateBook()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    book = Book(
        user_id=current_user.id,
        title=data['title'],
        year=data['year'],
        author=data['author'],
        description=data['description'],
        banned=data['banned'],
        image_url=data['image_url'],
    )

    db.session.add(book)
    db.session.commit()

    return book.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@all_books_route.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user_book(id):
    form = CreateBook();
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data

    if form.validate_on_submit():
        book = Book.query.get(id)
        book.title = data['title']
        book.year = data['year']
        book.author = data['author']
        book.description = data['description']
        book.banned = data['banned']
        book.image_url = data['image_url']

        db.session.commit()
        return book.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@all_books_route.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user_book(id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()
    books = Book.query.all()
    books_dict = {book.id: book.to_dict() for book in books}
    return books_dict
