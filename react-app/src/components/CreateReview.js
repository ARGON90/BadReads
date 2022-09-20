import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewThunk } from "../store/reviews";
import '../components/CSS/Reviews.css'


const CreateReview = ({bookId, userId, displayLanding}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state?.session?.user);
  const [errors, setErrors] = useState([]);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);


  useEffect(() => {
    const newErrors = [];

    if (!currentUser) newErrors.push('Please log in or sign up with BadReads to continue.');
    if (stars <= 0 || stars > 5) newErrors.push('Star Rating must be between 1 and 5.');
    if (review.length <= 0) newErrors.push('Review is required.');
    if (review.length > 1000) newErrors.push('Review must be 1000 characters or less.');

    setErrors(newErrors);
  }, [currentUser, review, stars])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      review,
      stars,
      book_id: bookId,
      user_id: userId
    }

    const createdReview = await dispatch(createReviewThunk(reviewData));

    if (createdReview) {
      setErrors([]);
      displayLanding()
      history.push(`/books/${bookId}`);
      //   need to work on this push
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
          >My rating:</label>
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
          >What did you think?</label>
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
        >Create Review</button>
      </form>
    </>
  )
}

export default CreateReview;
