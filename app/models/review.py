from .db import db
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User",back_populates="reviews")
    books = db.relationship("Book",back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'review': self.review,
            'stars': self.stars,
            # alex-code
            'updated_at': self.updated_at,
            'user': self.user.to_dict()
            # alex-code
        }
