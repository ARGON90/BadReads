import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllReviewsThunk, deleteReviewThunk } from '../store/reviews';
import '../components/CSS/Reviews.css'
import CreateReview from './CreateReview'
import EditReview from './EditReview';


const Reviews = ({ display, setDisplay, displayLanding, dropToggle, setDropToggle }) => {
    // console.log('INSIDE REVIEWS COMPONENT')
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
        // console.log('REVIEWS USE EFFECT')
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
                    .then(() => dispatch(getAllReviewsThunk()))
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
                        <div className='alex_pad_bottom_10' >
                            <div className='alex_flex_row'>
                                <div className='alex_merriweather_300 alex_font_14'>Would you like to edit your review, {" "}</div>
                                <div className='alex_margin_right_3'></div>
                                <div className='alex_merriweather_300 alex_font_14 alex_bold'>{currentUserUsername}?</div>
                            </div>
                            <div className='alex_pad_bottom_5'></div>
                            <div className='alex_flex_row alex_justify_between'>
                                <div className='alex_flex_row'>
                                    <div className='alex_merriweather_300 alex_font_14'>You rated</div>
                                    <div className='alex_margin_right_3'></div>
                                    <div className='alex_merriweather_300 alex_font_14 alex_bold' > {singleBook.title} </div>
                                    <div className='alex_margin_right_3'></div>
                                    <div className='alex_merriweather_300 alex_font_14'> {stars} </div>
                                    <div className='alex_margin_right_3'></div>
                                    {stars > 1 ?
                                        <div>
                                            <div className='alex_merriweather_300 alex_font_14'> stars</div>
                                        </div>
                                        :
                                        <div>
                                            <div className='alex_merriweather_300 alex_font_14'> star</div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    <div className='alex_merriweather_300 alex_font_14'>{updatedDate(updated_at)}</div>
                                </div>
                            </div>
                            <div className='alex_pad_bottom_5'></div>
                            <div className='alex_pad_bottom_3'></div>
                            <div className='alex_merriweather_300 alex_font_14 ben_overFlow_review' >"{review}"</div>
                            <div className='alex_pad_bottom_5'></div>
                            <button
                                onClick={editReview}
                                className='alex_gr-button alex_margin_right_3'
                            >Edit Review</button>
                            <button
                                onClick={deleteReview}
                                className='alex_gr-button'
                            >Delete Review</button>
                            <div className='alex_pad_bottom_10' ></div>
                            <div className='alex_border_bottom_grey'></div>
                        </div>
                        : null}
                    <div className='alex_pad_bottom_10' ></div>

                    {display === 'edit' ?
                        <div>
                            <EditReview userId={currentUserId} bookId={id} displayLanding={displayLanding} userReview={review} userStars={stars} reviewOfCurrentUser={reviewOfCurrentUser} />
                        </div>
                        : null}
                    <div ></div>
                    {reviewsByBookId.map((review) =>
                        <div key={review.id} className='alex_pad_bottom_10'>
                            {display === 'landing' ?
                                <div className='alex_flex_column alex_border_bottom_grey'>
                                    <div className='alex_flex_row alex_justify_between'>
                                        <div className='alex_flex_row'>
                                            <div className='alex_merriweather_300 alex_font_14 alex_bold'>{review.user.username}</div>
                                            <div className='alex_margin_right_3'></div>
                                            <div className='alex_merriweather_300 alex_font_14'>rated it {review.stars}</div>
                                            <div className='alex_margin_right_3'></div>
                                            {review.stars > 1 ?
                                                <div>
                                                    <div className='alex_merriweather_300 alex_font_14'> stars</div>
                                                </div>
                                                :
                                                <div>
                                                    <div className='alex_merriweather_300 alex_font_14'> star</div>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <div className='alex_merriweather_300 alex_font_14'>{updatedDate(review.updated_at)}</div>
                                        </div>
                                    </div>
                                    <div className='alex_pad_bottom_3'></div>
                                    <div>
                                        <div className='alex_merriweather_300 alex_font_14 ben_overFlow_review'>"{review.review}"</div>
                                        <div className='alex_pad_bottom_5'></div>
                                    </div>
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
                <div className='alex_merriweather_300 alex_font_14 alex_flex_column'>
                    {display === 'landing' ?
                        <div className='alex_border_bottom_grey'>
                            <div className='alex_flex_row alex_pad_bottom_5'>
                                <div className='alex_merriweather_300 alex_font_14 alex_bold' >{currentUserUsername},</div>
                                <div className='alex_margin_right_3'></div>
                                <div className='alex_merriweather_300 alex_font_14'>start your review of</div>
                                <div className='alex_margin_right_3'></div>
                                <div className='alex_merriweather_300 alex_font_14 alex_bold' >{singleBook.title}</div>
                            </div>
                            <div className='alex_pad_bottom_10'>
                                <button
                                    onClick={displayCreate}
                                    className='alex_gr-button'
                                >Write A Review
                                </button>
                            </div>
                        </div>

                        : null}

                    <div className='alex_pad_bottom_10'></div>


                    {display === 'create' ?
                        <div>
                            <CreateReview userId={currentUserId} bookId={id} displayLanding={displayLanding} />

                        </div>
                        : null}


                    {display === 'landing' ?
                        <div className='alex_pad_bottom_10'>
                            {reviewsByBookId.map((review) =>
                                <div key={review.id} className='alex_pad_bottom_10 '>
                                    <div className='alex_flex_row alex_justify_between'>
                                        <div className='alex_flex_row'>
                                            <div className='alex_merriweather_300 alex_font_14 alex_bold'>{review.user.username}</div>
                                            <div className='alex_margin_right_3'></div>
                                            <div className='alex_merriweather_300 alex_font_14'>rated it {review.stars}</div>
                                            <div className='alex_margin_right_3'></div>
                                            {review.stars > 1 ?
                                                <div>
                                                    <div className='alex_merriweather_300 alex_font_14'> stars</div>
                                                </div>
                                                :
                                                <div>
                                                    <div className='alex_merriweather_300 alex_font_14'> star</div>
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            <div className='alex_merriweather_300 alex_font_14'>{updatedDate(review.updated_at)}</div>
                                        </div>
                                    </div>
                                    <div className='alex_margin_right_3'></div>
                                    <div className='alex_merriweather_300 alex_font_14 alex_border_bottom_grey alex_pad_bottom_5 ben_overFlow_review'>"{review.review}"</div>
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
