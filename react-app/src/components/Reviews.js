import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import { getAllReviewsThunk, deleteReviewThunk } from '../store/reviews';
import '../components/CSS/Reviews.css'
import CreateReview from './CreateReview'
import EditReview from './EditReview';


const Reviews = ({ display, setDisplay, displayLanding }) => {
    console.log('INSIDE REVIEWS COMPONENT')
    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch();
    const booksDict = useSelector((state) => (state?.books))
    const singleBook = booksDict[id]
    const reviewsArray = useSelector((state) => Object.values(state?.reviews))
    const reviewsByBookId = reviewsArray.filter(review => review.book_id == id)
    const currentUser = useSelector((state) => (state?.session?.user))

    function displayCreate() {
        setDisplay((display) => display = 'create')
    }

    function displayLanding() {
        setDisplay((display) => display = 'landing')
    }

    useEffect(() => {
        console.log('REVIEWS USE EFFECT')
        dispatch(getAllReviewsThunk())
    }, [dispatch])

    if (currentUser == null) {
        return null
    }

    const currentUserUsername = currentUser.username
    const currentUserId = currentUser.id
    const reviewOfCurrentUser = reviewsByBookId.filter(review => review.user_id == currentUserId)

    function updatedDate(date) {
        console.log('SINGLEBOOK', singleBook)
        let dateArray = date.split(' ')
        dateArray.splice(-2, 2)
        let newArray = dateArray.join(' ')
        return newArray
    }



    function noReviews() {
        if (reviewsByBookId.length < 1)
            return (
                <div>This book hasn't been reviewed yet</div>
            )
    }

    return (
        <>
            <div>{currentUserReviewCheck()}</div>
            {display === 'landing' ? <div>{noReviews()}</div> : null}
        </>
    );

    function currentUserReviewCheck() {
        if (reviewOfCurrentUser.length > 0) {
            const review = reviewOfCurrentUser[0].review
            const updated_at = reviewOfCurrentUser[0].updated_at
            const stars = reviewOfCurrentUser[0].stars
            const reviewId = reviewOfCurrentUser[0].id
            //make an array of reviews with only the user id, find index of current user
            const reviewsUserIdArray = reviewsByBookId.map((review) => review.user_id)
            //find index of current review, remove it from the reviews list
            const currentUserReviewIndex = reviewsUserIdArray.indexOf(currentUserId)
            reviewsByBookId.splice(currentUserReviewIndex, 1)



            function deleteReview() {
                dispatch(deleteReviewThunk(reviewId))
                dispatch(getAllReviewsThunk())
            }

            function editReview() {
                setDisplay((display) => display = 'edit')
                console.log(`${reviewId}`)
            }

            //USER HAS AN EXISTING REVIEW

            return (
                <div>
                    {display === 'landing' ?
                        <div>
                            <div>Would you like to edit your review, {currentUserUsername}?</div>
                            <div>You rated {singleBook.title} {stars} stars</div>
                            <div>{updatedDate(updated_at)}</div>
                            <div>"{review}"</div>
                            <button
                                onClick={editReview}
                                className='alex_gr-button'
                            >Edit this Review</button>
                            <button
                                onClick={deleteReview}
                                className='alex_gr-button'
                            >Delete this Review</button>
                        </div>
                        : null}

                    {display === 'edit' ?
                        <div>
                            <EditReview />
                            <button
                                onClick={displayLanding}
                                className='alex_gr-button'
                            >Go back</button>
                        </div>
                        : null}

                    {reviewsByBookId.map((review) =>
                        <div key={review.id}>
                            {display === 'landing' ?
                                <div>
                                    <div>{review.user.username} rated it {review.stars} stars</div>
                                    <div>{updatedDate(review.updated_at)}</div>
                                    <div>"{review.review}"</div>
                                </div>
                                : null}
                        </div>
                    )}
                </div>
            )
        }

        //USER DOES NOT HAVE AN EXISTING REVIEW

        else {
            return (
                <div>
                    {display === 'landing' ?
                        <div>
                            <div>Would you like to say something about this book, {currentUserUsername}?</div>
                            <button
                                onClick={displayCreate}
                                className='alex_gr-button'
                            >Write A Review</button>
                        </div>
                        : null}

                    {display === 'create' ?
                        <div>
                            <CreateReview userId={currentUserId} bookId={id}/>
                            <button
                                onClick={displayLanding}
                                className='alex_gr-button'
                            >Go back</button>
                        </div>
                        : null}

                    {display === 'landing' ?
                        <div>
                            {reviewsByBookId.map((review) =>
                                <div key={review.id}>
                                    <div>{review.user.username} rated it {review.stars} stars</div>
                                    <div>{updatedDate(review.updated_at)}</div>
                                    <div>"{review.review}"</div>
                                </div>
                            )}
                        </div>
                        : null}
                </div>
            )
        }
    }
}

export default Reviews;
