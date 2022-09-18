from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from app.models import Book, Bookshelf
from flask_login import current_user, login_user, logout_user, login_required

bookshelves = Blueprint('bookshelves', __name__)


@bookshelves.route('/')
def all_bookshelves():
    print("LHDLSKAJGDJASKLDGBJLK:SADBG",current_user)
    id = current_user.to_dict()

    all_bookshelves = Bookshelf.query.all()
    bookshelves_list = [bookshelf.to_dict() for bookshelf in all_bookshelves]
    for bookshelf in bookshelves_list:
        bookshelf["user_id"] = bookshelf["user_id"].to_dict()
        book_list = []
        for book in bookshelf["books"]:
            book_list.append(book.to_dict()["id"])
        bookshelf["books"] = book_list


    # print("MOD",bookshelves_list)


    # user_bookshelves = {bookshelf.id:bookshelf for bookshelf in bookshelves_list if bookshelf["user_id"].to_dict().id == userID}
    # print(user_bookshelves)
    # return userID
    return {}
