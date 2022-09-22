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
    # print(user_bookshelves)

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
    # print(added_shelf)
    # return added_shelf
    return added_shelf

@bookshelves.route('/library',methods=['PUT'])
def update_library():


    data = request.json
    bookID = data["bookID"]
    shelfIDArr = data["bookshelfIDArr"]

    upBook = Book.query.get(bookID)

    # print(upBook.to_dict())
    # print(upBook.bookshelves)

    shelfInst = []
    for id in shelfIDArr:
        shelfInst.append(Bookshelf.query.get(id))
    # print(shelfIDArr)


    upBook.bookshelves = shelfInst

    print("i am new bookshelf list in book",upBook.bookshelves)

    db.session.add(upBook)
    db.session.commit()

#    //send back all user shelves

    # print("i amshelfidarr",shelfIDArr)
    # shelves_user = [x.to_dict() for x in current_user.bookshelves]
    return  {}


@bookshelves.route('/<id>',methods=['DELETE'])
def delete_bookshelf(id):
    # print("ID HERE", id)
    delete_me_shelf = Bookshelf.query.get(id)
    db.session.delete(delete_me_shelf)
    db.session.commit()
    return id

@bookshelves.route('/default',methods=['POST'])
def create_default():
    data = request.json
    userID = data['userID']

    h_read = Bookshelf(
        user_id=userID,
        default=True,
        name="Have Read"
    )
    c_read = Bookshelf(
        user_id=userID,
        default=True,
        name="Currently Reading"
    )
    w_read = Bookshelf(
        user_id=userID,
        default=True,
        name="Will Read"
    )

    db.session.add(h_read)
    db.session.add(c_read)
    db.session.add(w_read)
    db.session.commit()
    return {}

@bookshelves.route('/<id>',methods=['PUT'])
def edit_bookshelf(id):
    data = request.json
    edit_me_shelf = Bookshelf.query.get(id)
    edit_me_shelf.name = data["name"]

    db.session.add(edit_me_shelf)
    db.session.commit()

    edit_me_shelf= edit_me_shelf.to_dict()
    # to_dict stuff that isnt
    temp = edit_me_shelf["user_id"].to_dict()
    edit_me_shelf["user_id"] = temp["id"]

    book_list = []
    for book in edit_me_shelf["books"]:
        book_list.append(book.to_dict()["id"])
    edit_me_shelf["books"] = book_list

    # return cleaned up dict

    return edit_me_shelf
