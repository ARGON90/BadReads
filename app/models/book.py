from .db import db
from .bookshelves_books import bookshelves_books
from datetime import datetime


class Book(db.Model):
    __tablename__ = "books"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    author = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(5000), nullable=False)
    image_url = db.Column(db.String(1000), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User",back_populates="books")
    reviews = db.relationship("Review",back_populates="books")

    bookshelves = db.relationship(
        "Bookshelf",
        secondary=bookshelves_books,
        back_populates="books"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'year': self.year,
            'author': self.author,
            'description': self.description,
            'image_url': self.image_url,
            # alex-code
            # 'reviews': self.reviews,
            # 'bookshelves': self.bookshelves
            # alex-code
            # comment heroku
        }
