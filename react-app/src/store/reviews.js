const GET_ALL_REVIEWS = '/reviews/allReviews'

const loadReviews = (reviews) => {
    return{
        type: GET_ALL_REVIEWS,
        reviews
    }
}

//THUNK - ALL BOOKS
export const getAllBooksThunk = () => async (dispatch) => {
    console.log('ALL REVIEWS THUNK')
    const response = await fetch('/api/reviews/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data));
        return JSON.stringify(data);
    }
}

//REDUCER
const initialState = {}
const reviewsReducer = (state = initialState, action ) => {
    switch(action.type) {
        case GET_ALL_BOOKS: {
            console.log('ALL REVIEWS REDUCER')
            const allReviews = action.reviews
            const newState = {...state, ...allReviews}
            return newState
        }
        default:
            return state
    }
}

export default reviewsReducer
