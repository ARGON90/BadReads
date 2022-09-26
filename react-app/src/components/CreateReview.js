import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createReviewThunk } from "../store/reviews";
import { getAllReviewsThunk } from "../store/reviews";
import '../components/CSS/Reviews.css'


const CreateReview = ({ bookId, userId, displayLanding }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state?.session?.user);
  const [errors, setErrors] = useState([]);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');

  const updateReview = (e) => setReview(e.target.value);
  const updateStars = (e) => setStars(e.target.value);





  useEffect(() => {
    const newErrors = {};

    if (!currentUser) newErrors.login = 'Please log in or sign up with BadReads to continue.';
    if (stars <= 0 || stars > 5) newErrors.stars = 'Star rating must be between 1 and 5.';
    if (review.length <= 0) newErrors.review = 'Review is required.';
    if (review.length > 1000) newErrors.reviewLength = 'Review must be 1000 characters or less.';


    setErrors(newErrors)

    // cleanup
    return null;
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
        <div className='alex_merriweather_300 alex_font_14 alex_flex_column'>
          <label className='alex_merriweather_300 alex_font_14' >My rating:</label>
          <input
            type="number"
            placeholder="Stars"
            required
            value={stars}
            onChange={updateStars}
            className='alex_input_borders alex_review_form_input'
          />
          {errors.stars ? <div className='alex_merriweather_300 alex_font_14 alex_font_red'>{errors.stars}</div> : null}
          <div className="alex_pad_bottom_10"></div>
          <label className='alex_merriweather_300 alex_font_14'
          >What did you think?</label>
          <textarea
            type="string"
            placeholder="Enter Your Review"
            required
            value={review}
            onChange={updateReview}
            className='alex_height_125 alex_input_borders alex_review_form_input'
          />
          <div className='alex_merriweather_300 alex_font_14 alex_font_red'>{errors.review}</div>
          <div className='alex_merriweather_300 alex_font_14 alex_font_red'>{errors.reviewLength}</div>
          <div className="alex_pad_bottom_10"></div>
        </div>

        {Object.values(errors).length || !stars || !review ?
          <div className="alex_flex_row alex_justify_around">
            <button
              type="submit"
              disabled={true}
              className="alex_gr-button-disabled"
            >Create Review</button>
            <button onClick={displayLanding} className='alex_gr-button'>Go back</button>
          </div>
          :
          <div className="alex_flex_row alex_justify_around">
            <button
              type="submit"
              className="alex_gr-button"
            >Create Review</button>
            <button onClick={displayLanding} className='alex_gr-button'>Go back</button>
          </div>
        }
      </form>
    </>
  )
}

export default CreateReview;
