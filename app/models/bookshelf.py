from .db import db


class Bookshelf(db.Model):
    __tablename__ = "bookshelves"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    default = db.Column(db.Boolean, nullable=False)
    name = db.Column(db.String(255), nullable=False)

    user = db.relationship("User",back_populates="bookshelves")

    books = db.relationship(
        "Book",
        secondary=bookshelves_books,
        back_populates="bookshelves"
    )
