from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.review import Review

reviews_route = Blueprint('reviews', __name__)


@reviews_route.route('/')
def reviews():
    print('INSIDE REVIEWS "/reviews"')
    reviews = Review.query.all()
    review = Review.query.get(1)
    print('REVIEW USER!', review.user.to_dict())
    reviews_dict = {review.id:review.to_dict() for review in reviews}
    return reviews_dict
