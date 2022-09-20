import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editReviewThunk } from "../store/reviews";
import { getAllReviewsThunk } from "../store/reviews";
import '../components/CSS/Reviews.css'


const EditReview = ({bookId, userId, userReview, userStars, displayLanding, reviewOfCurrentUser}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state?.session?.user);
  const currentReviewId = reviewOfCurrentUser[0].id
  const [errors, setErrors] = useState([]);
  const [review, setReview] = useState(`${userReview}`);
  const [stars, setStars] = useState(`${userStars}`);

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);

  useEffect(() => {
    console.log('EDIT REVIEWS USE EFFECT FOR ALL REVIEWS')
    dispatch(getAllReviewsThunk())
}, [dispatch])

  useEffect(() => {
    const newErrors = [];

    if (!currentUser) {
      newErrors.push('Please log in or sign up with BadReads to continue.');
    }
    if (review.length <= 0) {
      newErrors.push('Review is required.');
    } else if (review.length > 1000) {
      newErrors.push('Review must be 1000 characters or less.');
    }
    if (stars <= 0 || stars > 5) {
      newErrors.push('Star Rating must be between 1 and 5.');
    }
    setErrors(newErrors);
  }, [currentUser, review, stars])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      id: currentReviewId,
      review,
      stars,
      book_id: bookId,
      user_id: userId
    }

    const editedBook = await dispatch(editReviewThunk(reviewData));

    if (editedBook) {
      setErrors([]);
      displayLanding();
      history.push(`/books/${bookId}`);
    }
  }
  return (
    <>
      <form
      className="create-book-form"
      onSubmit={handleSubmit}>
        <div
            // className="create-book-modal-body"
        >
          <div
            // className="create-book-form-errors-container"
          >
            {errors.map((error, idx) => (
              <span key={idx}>Error: {error}</span>
            ))}
          </div>
          <label
            // className="create-book-form-label"
          >Stars</label>
          <input
            // className="create-book-form-input"
            type="integer"
            placeholder="Stars"
            required
            value={stars}
            onChange={updateStars}
          />
                    <label
            // className="create-book-form-label"
          >Review</label>
          <textarea
            // className="create-book-form-input"
            type="string"
            placeholder="Enter Your Review"
            required
            value={review}
            onChange={updateReview}
          />
        </div>

        <button
        type="submit"
        disabled={errors.length ? true : false}
        className="alex_gr-button"
        >Edit Review</button>
      </form>
    </>
  )
}

// todo - user rated it 1 STARS => user rated it 1 STAR

export default EditReview;
