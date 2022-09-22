import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import { getAllReviewsThunk, deleteReviewThunk } from '../store/reviews';
import '../components/CSS/Reviews.css'
import CreateReview from './CreateReview'
import EditReview from './EditReview';


const Reviews = ({ display, setDisplay, displayLanding, dropToggle, setDropToggle }) => {
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
        setDropToggle((dropToggle) => dropToggle = false)
    }

    function displayLanding() {
        setDisplay((display) => display = 'landing')
        setDropToggle((dropToggle) => dropToggle = false)
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
        let dateArray = date.split(' ')
        dateArray.splice(-2, 2)
        let newArray = dateArray.join(' ')
        return newArray
    }


    function noReviews() {
        if (reviewsByBookId.length == 0) {
            return (
                <div className='alex_merriweather_300 alex_font_14 alex_bold' >This book hasn't been reviewed yet</div>
            )
        }
    }


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
                setDropToggle((dropToggle) => dropToggle = false)
            }

            function editReview() {
                setDisplay((display) => display = 'edit')
                setDropToggle((dropToggle) => dropToggle = false)
            }

            //USER HAS AN EXISTING REVIEW

            return (
                <div className='alex_merriweather_300 alex_font_14' >
                    {display === 'landing' ?
                        <div>
                            <div
                            className='alex_merriweather_300 alex_font_14'>Would you like to edit your review,
                            <p>{currentUserUsername}?</p>
                            </div>
                            <div className='alex_merriweather_300 alex_font_14'>You rated {singleBook.title} {stars} stars</div>
                            <div className='alex_merriweather_300 alex_font_14'>{updatedDate(updated_at)}</div>
                            <div className='alex_merriweather_300 alex_font_14'>"{review}"</div>
                            <button
                                onClick={editReview}
                                className='alex_gr-button'
                            >Edit Review</button>
                            <button
                                onClick={deleteReview}
                                className='alex_gr-button'
                            >Delete Review</button>
                        </div>
                        : null}

                    {display === 'edit' ?
                        <div>
                            <EditReview userId={currentUserId} bookId={id} displayLanding={displayLanding} userReview={review} userStars={stars} reviewOfCurrentUser={reviewOfCurrentUser} />
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
                <div className='alex_merriweather_300 alex_font_14'>
                    {display === 'landing' ?
                        <div>
                            <div className='alex_merriweather_300 alex_font_14' >{currentUserUsername}, start your review of {singleBook.title}</div>
                            <button
                                onClick={displayCreate}
                                className='alex_gr-button'
                            >Write A Review</button>
                        </div>
                        : null}

                    {display === 'create' ?
                        <div>
                            <CreateReview userId={currentUserId} bookId={id} displayLanding={displayLanding} />
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
                    {display === 'landing' ? <div>{noReviews()}</div> : null}
                </div>
            )
        }
    }

    return (
        <>
            <div>{currentUserReviewCheck()}</div>
        </>
    );
}
// todo - user rated it 1 STARS => user rated it 1 STAR


export default Reviews;
