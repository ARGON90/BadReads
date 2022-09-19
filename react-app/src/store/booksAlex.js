const GET_ALL_BOOKS = '/books/allBooks'

const loadBooks = (books) => {
    return{
        type: GET_ALL_BOOKS,
        books
    }
}

//THUNK - ALL BOOKS
export const getAllBooksThunk = () => async (dispatch) => {
    console.log('ALL BOOKS THUNK')
    const response = await fetch('/api/books/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBooks(data));
        return JSON.stringify(data);
    }
}

//REDUCER
// const initialState = {}
// const booksReducer = (state = initialState, action ) => {
//     switch(action.type) {
//         case GET_ALL_BOOKS: {
//             console.log('ALL BOOKS REDUCER')
//             const allbooks = action.books
//             const newState = {...state, ...allbooks}
//             return newState
//         }
//         default:
//             return state
//     }
// }

const initialState = {}
const booksReducer = ( state = initialState, action ) => {
    let newState = {...state}
    switch (action.type) {
        // case GET_ALL_BOOKS: {
        //     console.log('ALL BOOKS REDUCER')
        //     const allbooks = action.books
        //     const newState = {...state, ...allbooks}
        //     return newState
        // }

        case GET_ALL_BOOKS: {
            console.log('ALL BOOKS REDUCER')
            const allBooks = action.books
            return {
                ...newState,
                ...allBooks
            }
        }
        default:
            return state
    }
}

export default booksReducer;
