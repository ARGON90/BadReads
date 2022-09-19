import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import { getAllReviewsThunk } from '../store/reviews';
import '../components/CSS/Reviews.css'

const Reviews = () => {
    console.log('INSIDE REVIEWS COMPONENT')
    const history = useHistory()
    const { id } = useParams()
    const dispatch = useDispatch();
    const booksDict = useSelector((state) => (state?.books))
    const singleBook = booksDict[id]
    const reviewsArray = useSelector((state) => Object.values(state?.reviews))
    const reviewsByBookId = reviewsArray.filter(review => review.book_id == id)
    const currentUser = useSelector((state) => (state?.session?.user))

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


    function currentUserReviewCheck() {
        if (reviewOfCurrentUser.length > 0) {
            const review = reviewOfCurrentUser[0].review
            const stars = reviewOfCurrentUser[0].stars
            const reviewId = reviewOfCurrentUser[0].id
            //make an array of reviews with only the user id, find index of current user
            const reviewsUserIdArray = reviewsByBookId.map((review) => review.user_id)
            //find index of current review, remove it from the reviews list
            const currentUserReviewIndex = reviewsUserIdArray.indexOf(currentUserId)
            reviewsByBookId.splice(currentUserReviewIndex, 1)

            function deleteReview() {
                console.log(`${reviewId}`)
            }

            function editReview() {
                console.log(`${reviewId}`)
            }
            //USER HAS A REVIEW
            return (
                <div>
                    <div>Would you like to edit your review, {currentUserUsername}?</div>
                    <div>You rated {singleBook.title} {stars} stars</div>
                    <div>"{review}"</div>
                    <button
                        onClick={editReview}
                        className='reviews_page_gr-button'
                    >Edit this Review</button>

                    <button
                        onClick={deleteReview}
                        className='reviews_page_gr-button'
                    >Delete this Review</button>
                    {reviewsByBookId.map((review) =>
                        <div key={review.id}>
                            <div>{review.user.username} rated it {review.stars} stars</div>
                            <div>{updatedDate(review.updated_at)}</div>
                            <div>"{review.review}"</div>
                        </div>
                    )}
                </div>
            )
        }
        //USER DOES NOT HAVE A REVIEW
        else {
            return (
                <div>
                    <div>Would you like to say something about this book, {currentUserUsername}?</div>
                    <button
                        className='reviews_page_gr-button'
                    >Write A Review</button>
                    {reviewsByBookId.map((review) =>
                        <div key={review.id}>
                            <div>{review.user.username} rated it {review.stars} stars</div>
                            <div>{updatedDate(review.updated_at)}</div>
                            <div>"{review.review}"</div>
                        </div>
                    )}
                </div>
            )
        }
    }

    if (reviewsByBookId.length < 1) return <div>No Reviews for this book</div>


    return (
        <>
            <h2>Reviews</h2>
            <div>{currentUserReviewCheck()}</div>
        </>
    );
}

export default Reviews;


//todo - what routing with replace did I need to add at the top of the page?
