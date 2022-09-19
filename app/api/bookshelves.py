from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models import Book, Bookshelf
from flask_login import current_user, login_user, logout_user, login_required

bookshelves = Blueprint('bookshelves', __name__)


@bookshelves.route('/')
def all_bookshelves():

    id = current_user.id

    all_bookshelves = Bookshelf.query.all()
    bookshelves_list = [bookshelf.to_dict() for bookshelf in all_bookshelves]
    # change all user and book instances to normal data, books arr just holds ids
    for bookshelf in bookshelves_list:
        hold = bookshelf["user_id"].to_dict()
        bookshelf["user_id"] = hold["id"]
        book_list = []
        for book in bookshelf["books"]:
            book_list.append(book.to_dict()["id"])
        bookshelf["books"] = book_list

    # bookshelves_dict = {bookshelf["id"]:bookshelf for bookshelf in bookshelves_list}

    user_bookshelves = {bookshelf["id"]:bookshelf for bookshelf in bookshelves_list if bookshelf["user_id"] == id}
    print(user_bookshelves)
    # # return userID

    # return bookshelves_dict
    return user_bookshelves
