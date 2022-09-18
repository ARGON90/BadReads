import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import { getAllReviewsThunk } from '../store/reviews';

const Reviews = () => {
    console.log('INSIDE REVIEWS COMPONENT')
    const { id } = useParams()
    const dispatch = useDispatch();
    const reviewsArray = useSelector((state) => Object.values(state?.reviews))
    const reviewsByBookId = reviewsArray.filter(review => review.book_id == id)
    const usersArray = useSelector((state) => (state?.session.user))
    const currentUser = usersArray.username
    console.log('USERS ARRAY', currentUser)
    // const reviewsByUserId = reviewsArray.filter(users => users.book_id == id)

    useEffect(() => {
        console.log('REVIEWS USE EFFECT')
        dispatch(getAllReviewsThunk())
    }, [dispatch])

    if (reviewsByBookId.length < 1) return <div>No Reviews for this book</div>
    return (
        <>
            <h2>Reviews</h2>
            <div>Would you like to say something about this book, {currentUser}?</div>
            {reviewsByBookId.map((review) =>
                <div key={review.id}>
                    <div>(PERSON NAME) rated it {review.stars} stars</div>
                    <div>{review.review}</div>
                </div>
            )}
        </>
    );
}

// todo - if a user has already reviewd a book:
    // 1 put it at the top of the list, ask them if they'd like to edit your review
    // 2 remove it from the reviews array listed on the page
// if a user does NOt have a review, ask them if they'd like to make one

// getting users reviews:
    // get all users in state
    // filter reviews where review.user_id === user.id

    // or add username to review state

export default Reviews;
