const GET_ALL_BOOKSHELVES = '/bookshelves/all'

const loadBookshelves = (bookshelves) => {
    return {
        type: GET_ALL_BOOKSHELVES,
        payload: bookshelves
    }
}

// # //THUNK - ALL BOOKSHELVES
export const getAllBookshelvesThunk = () => async (dispatch) => {
    // # console.log('ALL BOOKS THUNK')
    const response = await fetch('/api/bookshelves/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookshelves(data));
        return JSON.stringify(data);
    }
}

// # //REDUCER
const initialState = { allBookshelves: {} }
const bookshelvesReducer = (state = initialState, action) => {
    let bookshelves
    switch (action.type) {
        case GET_ALL_BOOKSHELVES: {
            // # console.log('ALL BOOKS REDUCER')
            bookshelves = { ...state, allBookshelves: { ...state.allBookshelves } }
            bookshelves.allBookshelves = action.payload

            return bookshelves
        }
        default:
            return state
    }
}

export default bookshelvesReducer
