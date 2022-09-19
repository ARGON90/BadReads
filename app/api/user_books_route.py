from flask import Blueprint, redirect, request, jsonify
from flask_login import login_required, current_user
from app.api.auth_routes import login, validation_errors_to_error_messages
from app.models import Book, db
from app.forms import CreateBook


user_books_route = Blueprint('user_books', __name__)

@user_books_route.route('/my-books')
@login_required
def get_user_books():
  print('current_user', current_user)
  user_books = Book.query.filter(Book.user_id == current_user.id).all()
  user_books_dict = {user_book.id:user_book.to_dict() for user_book in user_books}
  return user_books_dict


@user_books_route.route('/books', methods=['POST'])
@login_required
def add_user_book():
  form = CreateBook()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if form.validate_on_submit():
    book = Book(
      title = data['title'],
      year = data['year'],
      author = data['author'],
      description = data['description'],
      image_url = data['image_url'],
    )

    db.session.add(book)
    db.session.commit()

    print(book.to_dict())
    return redirect('/api/my-books')

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
