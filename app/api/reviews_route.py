from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import review
from app.models.review import Review
from app.models.db import db
from app.forms.create_review_form import CreateReview

reviews_route = Blueprint('reviews', __name__)


@reviews_route.route('/')
def get_all_reviews():
    print('INSIDE REVIEWS "/reviews"')
    reviews = Review.query.all()
    reviews_dict = {review.id:review.to_dict() for review in reviews}
    return reviews_dict

@reviews_route.route('/<int:id>', methods=["POST"])
@login_required
def create_review(id):
    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print('BACKEND FORM DATA', data)
    if form.validate_on_submit():
        review = Review(
            review=data['review'],
            stars=data['stars'],
            book_id=id,
            user_id=current_user.id,
        )

        db.session.add(review)
        db.session.commit()
        return review.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@reviews_route.route('/<int:id>/<int:reviewId>', methods=["PUT"])
@login_required
def edit_review(id, reviewId):
    print(reviewId)
    form = CreateReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    print('BACKEND FORM DATA', data)
    if form.validate_on_submit():
            review = Review.query.get(reviewId)
            print('!!!!!REVIEW IN BACKEND!!!!!', review.to_dict())
            testing =  review.to_dict()
            print(testing['id'],        'testing!!!!!!!!!!')
            print(testing['user_id'],   'testing!!!!!!!!!!')
            print(testing['review'],    'testing!!!!!!!!!!')
            print(testing['stars'],     'testing!!!!!!!!!!')
            print(data['stars'],        'testing!!!!!!!!!!')
            print(data['reviews'],      'testing!!!!!!!!!!')
            review.review=data['review'],
            review.stars=data['stars'],
            review.book_id=id,
            review.user_id=current_user.id,

            db.session.commit()
            return review.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@reviews_route.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_one_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    reviews = Review.query.all()
    reviews_dict = {review.id:review.to_dict() for review in reviews}
    return reviews_dict
