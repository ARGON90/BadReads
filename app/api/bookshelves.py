from flask import Blueprint, jsonify,request
from flask_login import login_required
from app.models import User,db
from app.models import Book, Bookshelf
from flask_login import current_user, login_user, logout_user, login_required
import json

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

    user_bookshelves = {bookshelf["id"]:bookshelf for bookshelf in bookshelves_list if bookshelf["user_id"] == id}
    print(user_bookshelves)

    return user_bookshelves

@bookshelves.route('/',methods=['POST'])
def add_bookshelf():
    data = request.json
    print(data)
    newShelf = Bookshelf(
        user_id=data["user_id"],
        default=False,
        name=data["name"]
    )

    db.session.add(newShelf)
    db.session.commit()
    all_bookshelves_p = Bookshelf.query.all()
    # get added shelf (filter not working?)
    bookshelves_list_p = [bookshelf.to_dict() for bookshelf in all_bookshelves_p]
    added_shelf = ''
    for shelf in bookshelves_list_p:
        if shelf["name"] == data["name"]:
            added_shelf = shelf

    # to_dict stuff that isnt
    temp = added_shelf["user_id"].to_dict()
    added_shelf["user_id"] = temp["id"]

    book_list = []
    for book in added_shelf["books"]:
        book_list.append(book.to_dict()["id"])
    added_shelf["books"] = book_list

    # return cleaned up dict
    print(added_shelf)
    # return added_shelf
    return added_shelf


@bookshelves.route('/<id>',methods=['DELETE'])
def delete_bookshelf(id):
    print("ID HERE", id)
    delete_me_shelf = Bookshelf.query.get(id)
    db.session.delete(delete_me_shelf)
    db.session.commit()
    return id