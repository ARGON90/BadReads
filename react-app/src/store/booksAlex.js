const GET_ALL_BOOKS = '/books/allBooks'
const ADD_BOOK = '/my-books/ADD_BOOK'
const EDIT_BOOK = '/my-books/EDIT_BOOK'
const REMOVE_BOOK = '/my-books/DELETE_BOOK'

const loadBooks = (books) => {
    return {
        type: GET_ALL_BOOKS,
        books
    }
}

const addBook = (book) => ({
    type: ADD_BOOK,
    book
})

const editBook = (book) => ({
    type: EDIT_BOOK,
    book
})

const removeBook = (id) => ({
    type: REMOVE_BOOK,
    id
})

//THUNK - ALL BOOKS
export const getAllBooksThunk = () => async (dispatch) => {
    // console.log('ALL BOOKS THUNK')
    const response = await fetch('/api/books/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBooks(data));
        return JSON.stringify(data);
    }
}

export const createBook = (data) => async dispatch => {
    // console.log('CREATE BOOK THUNK')
    const response = await fetch('/api/books/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const book = await response.json();
        // console.log('RESPONSE OK, BOOK', book)
        await dispatch(addBook(book));
        return book;
    }
}

export const updateBook = (data) => async dispatch => {
    // console.log('UPDATE BOOK THUNK')
    const response = await fetch(`/api/books/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const updatedBook = await response.json();
        await dispatch(editBook(updatedBook));
        return updatedBook;
    };
};

export const deleteBook = (id) => async dispatch => {
    const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const book = await response.json();
        await dispatch(removeBook(id));
        return book;
    };
};

//REDUCER
const initialState = {}
const booksReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case GET_ALL_BOOKS: {
            // console.log('ALL BOOKS REDUCER')
            const allBooks = action.books
            return {
                ...newState,
                ...allBooks
            }
        }

        case ADD_BOOK: {
            // console.log('ADD BOOK REDUCER')
            newState = {
                ...state,
                [action.book.id]: action.book
            };
            return newState;
        }

        case EDIT_BOOK: {
            // console.log('ADD BOOK REDUCER')
            newState = {
                ...state,
                [action.book.id]: action.book
            };
            return newState;
        }

        case REMOVE_BOOK: {
            delete newState[action.id];
            return newState;
        }

        default:
            return state;
    }
}

export default booksReducer;
