from .db import db

bookshelves_books = db.Table(
    "bookshelves_books",
    db.Column(
        "book_id",
        db.Integer,
        db.ForeignKey("books.id"),
        primary_key=True
    ),
    db.Column(
        "bookshelf_id",
        db.Integer,
        db.ForeignKey("bookshelves.id"),
        primary_key=True
    )
)
