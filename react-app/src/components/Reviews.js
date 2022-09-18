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

    useEffect(() => {
        console.log('REVIEWS USE EFFECT')
        dispatch(getAllReviewsThunk())
    }, [dispatch])

    if (reviewsByBookId.length < 1) return <div>No Reviews for this book</div>
    return (
        <>
            <h2>Reviews</h2>
            {reviewsByBookId.map((review) =>
                <div key={review.id}>
                    <div>{review.review}</div>
                    <div>Stars: {review.stars}</div>
                </div>

            )}
        </>
    );
}

export default Reviews;
