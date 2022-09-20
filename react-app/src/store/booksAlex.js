const GET_ALL_BOOKS = '/books/allBooks'
const ADD_BOOK = '/my-books/ADD_BOOK'

const loadBooks = (books) => {
    return{
        type: GET_ALL_BOOKS,
        books
    }
}

const addBook = (book) => ({
    type: ADD_BOOK,
    book
})

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

export const createBook = (data) => async dispatch => {
    console.log('CREATE BOOK THUNK')
    const response = await fetch('/api/books/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    console.log('response', response)

    if (response.ok) {
        const book = await response.json();
        console.log('RESPONSE OK, BOOK', book)
        await dispatch(addBook(book));
        return book;
    }
}

//REDUCER
const initialState = {}
const booksReducer = ( state = initialState, action ) => {
    let newState = {...state}
    switch (action.type) {

        case GET_ALL_BOOKS: {
            console.log('ALL BOOKS REDUCER')
            const allBooks = action.books
            return {
                ...newState,
                ...allBooks
            }
        }

        case ADD_BOOK: {
            console.log('ADD BOOK REDUCER')
            newState = {
                ...state,
                [action.book.id]: action.book
            };
            return newState;
        }

        default:
            return state
    }
}

export default booksReducer;
