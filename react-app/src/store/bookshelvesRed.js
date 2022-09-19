const GET_USER_BOOKSHELVES = '/bookshelves/user'

const loadBookshelves = (bookshelves) => {
    return {
        type: GET_USER_BOOKSHELVES,
        payload: bookshelves
    }
}

// # //THUNK - ALL BOOKSHELVES
export const getUserBookshelvesThunk = () => async (dispatch) => {
    // # console.log('ALL BOOKS THUNK')
    const response = await fetch('/api/bookshelves/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookshelves(data));
        return JSON.stringify(data);
    }
}

// # //REDUCER
const initialState = { userBookshelves: {} }
const bookshelvesReducer = (state = initialState, action) => {
    let bookshelves
    switch (action.type) {
        case GET_USER_BOOKSHELVES: {
            // # console.log('ALL BOOKS REDUCER')
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            bookshelves.userBookshelves = action.payload

            return bookshelves
        }
        default:
            return state
    }
}

export default bookshelvesReducer
