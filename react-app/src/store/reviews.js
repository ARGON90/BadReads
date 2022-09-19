


const GET_ALL_REVIEWS = '/reviews/allReviews'
const DELETE_ONE_REVIEW = '/reviews/deleteReview'

const deleteReviewById = (id) => {
    return {
        type: DELETE_ONE_REVIEW,
        id
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
    console.log('ALL REVIEWS THUNK')
    const response = await fetch('/api/reviews/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data));
        return JSON.stringify(data);
    }
}

//THUNK - DELETE A REVIEW
export const deleteReviewThunk = (id) => async (dispatch) => {
    console.log("INSIDE DELETE REVIEW THUNK")
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
    switch (action.type) {
        case GET_ALL_REVIEWS: {
            console.log('ALL REVIEWS REDUCER')
            const allReviews = action.reviews
            const newState = { ...state, ...allReviews }
            return newState
        }
        case DELETE_ONE_REVIEW: {
            console.log('INSIDE DELETE REVIEW REDUCER');
            const newState = { ...state };
            delete newState[action.id]
            return newState;
        }

        default:
            return state
    }
}

export default reviewsReducer
