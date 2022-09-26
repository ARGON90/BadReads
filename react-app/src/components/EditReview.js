import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { editReviewThunk } from "../store/reviews";
import { getAllReviewsThunk } from "../store/reviews";
import '../components/CSS/Reviews.css'


const EditReview = ({ bookId, userId, userReview, userStars, displayLanding, reviewOfCurrentUser }) => {
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
    const newErrors = {};

    if (!currentUser) newErrors.login = 'Please log in or sign up with BadReads to continue.';
    if (stars <= 0 || stars > 5) newErrors.stars = 'Star rating must be between 1 and 5.';
    if (review.length <= 0) newErrors.review = 'Review is required.';
    if (review.length > 1000) newErrors.reviewLength = 'Review must be 1000 characters or less.';

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
        <div className='alex_merriweather_300 alex_font_14 alex_flex_column'>
          <label className='alex_merriweather_300 alex_font_14'>Stars</label>
          <input
            type="integer"
            placeholder="Stars"
            required
            value={stars}
            onChange={updateStars}
            className='alex_input_borders alex_review_form_input'
          />
          <div className='alex_merriweather_300 alex_font_14 alex_font_red'>{errors.stars}</div>
          <div className="alex_pad_bottom_10"></div>
          <label className='alex_merriweather_300 alex_font_14'
          >Edit Your Review</label>
          <textarea
            type="string"
            placeholder="Enter Your Review"
            required
            value={review}
            onChange={updateReview}
            className='alex_height_125 alex_input_borders alex_review_form_input'
          />
          <div className='alex_merriweather_300 alex_font_14 alex_font_red' >{errors.review}</div>
          <div className='alex_merriweather_300 alex_font_14 alex_font_red' >{errors.reviewLength}</div>
          <div className="alex_pad_bottom_10"></div>
        </div>

        {Object.values(errors).length ?
          <div className="alex_flex_row alex_justify_around">
            <button
              type="submit"
              disabled={true}
              className="alex_gr-button-disabled"
            >Edit Review</button>
            <button onClick={displayLanding} className='alex_gr-button'>Go back</button>
          </div>
          :
          <div className="alex_flex_row alex_justify_around">
            <button
              type="submit"
              className="alex_gr-button"
            >Edit Review</button>
            <button onClick={displayLanding} className='alex_gr-button'>Go back</button>
          </div>
        }
      </form>
    </>
  )
}


export default EditReview;
