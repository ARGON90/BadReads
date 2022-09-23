const GET_ALL_REVIEWS = '/reviews/allReviews'
const CREATE_REVIEW = '/reviews/createReview'
const EDIT_REVIEW = '/reviews/editReview'
const DELETE_ONE_REVIEW = '/reviews/deleteReview'

//toggle drop down off when you toggle other things

const deleteReviewById = (id) => {
    return {
        type: DELETE_ONE_REVIEW,
        id
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const editReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const loadReviews = (reviews) => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

//THUNK - ALL REVIEWS
export const getAllReviewsThunk = () => async (dispatch) => {
    // console.log('ALL REVIEWS THUNK')
    const response = await fetch(`/api/reviews/`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data));
        return JSON.stringify(data);
    }
}

//THUNK - CREATE A REVIEW
export const createReviewThunk = (data) => async (dispatch) => {
    // console.log('CREATE REVIEW  THUNK')
    const response = await fetch(`/api/reviews/${data.book_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const review = await response.json();
        await dispatch(createReview(review));
        return review;
    }
}

//THUNK - EDIT A REVIEW
export const editReviewThunk = (data) => async (dispatch) => {
    // console.log('EDIT REVIEW THUNK')
    // console.log('DATA', data)
    const response = await fetch(`/api/reviews/${data.book_id}/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const review = await response.json();
        await dispatch(editReview(review));
        return review;
    }
}

//THUNK - DELETE A REVIEW
export const deleteReviewThunk = (id) => async (dispatch) => {
    // console.log("INSIDE DELETE REVIEW THUNK")
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteReviewById(id));
        return spot;
    }
}

//REDUCER
const initialState = {}
const reviewsReducer = (state = initialState, action) => {
    let newState = state
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            // console.log('ALL REVIEWS REDUCER')
            const allReviews = action.reviews
            let newState = { ...state, ...allReviews }
            return newState
        }

        case CREATE_REVIEW: {
            // console.log('CREATE REVIEW REDUCER')
            let newState = {
                ...state,
                [action.review.id]: action.review
            };
            return newState;
        }

        case EDIT_REVIEW: {
            // console.log('EDIT REVIEW REDUCER')
            let newState = {
                ...state,
                [action.review.id]: action.review
            };
            return newState;
        }

        case DELETE_ONE_REVIEW: {
            // console.log('INSIDE DELETE REVIEW REDUCER');
            delete newState[action.id]
            return newState;
        }

        default:
            return state
    }
}

export default reviewsReducer
