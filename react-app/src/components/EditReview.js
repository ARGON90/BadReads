import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import '../components/CSS/Reviews.css'


const EditReview = () => {
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
      review,
      stars,
    }

    // const createdBook = await dispatch(createReview(reviewData));

    // if (createdBook) {
    //   setErrors([]);
    //   history.push('/');
    // //   need to work on this push
    // }
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

export default EditReview;
