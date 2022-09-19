from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.review import Review
from app.models.db import db

reviews_route = Blueprint('reviews', __name__)


@reviews_route.route('/')
def get_all_reviews():
    print('INSIDE REVIEWS "/reviews"')
    reviews = Review.query.all()
    reviews_dict = {review.id:review.to_dict() for review in reviews}
    return reviews_dict

@reviews_route.route('/<int:id>', methods=["DELETE"])
def delete_one_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    reviews = Review.query.all()
    reviews_dict = {review.id:review.to_dict() for review in reviews}
    return reviews_dict
