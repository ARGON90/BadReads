//types
const GET_USER_BOOKSHELVES = '/bookshelves/user'
const ADD_USER_BOOKSHELF = '/bookshelves/user/add'
const DELETE_USER_BOOKSHELF = '/bookshelves/user/delete'
const EDIT_USER_BOOKSHELF = '/bookshelves/user/edit'
const UPDATE_LIBRARY = 'bookshelves/user/library'
const DEFAULT_CREATE = 'bookshelves/user/default'

//actions

const loadBookshelves = (bookshelves) => {
    return {
        type: GET_USER_BOOKSHELVES,
        payload: bookshelves
    }
}

const addUserBookshelf = (bookshelf) => {
    return {
        type: ADD_USER_BOOKSHELF,
        payload: bookshelf
    }
}

const renameUserBookshelf = (bookshelf) => {
    return {
        type: EDIT_USER_BOOKSHELF,
        payload: bookshelf
    }
}

const deleteUserBookshelf = (id) => {
    return {
        type: DELETE_USER_BOOKSHELF,
        payload: id
    }
}

const updateLibrary = (updatedShelves) => {
    return {
        type: UPDATE_LIBRARY,
        payload: updatedShelves
    }
}

const createDefaultBookshelves = (empty) => {
    return {
        type: DEFAULT_CREATE,
        payload: empty
    }
}

//THUNKS

export const getUserBookshelvesThunk = () => async (dispatch) => {
    const response = await fetch('/api/bookshelves/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadBookshelves(data));
        return JSON.stringify(data);
    }
}

export const addUserBookshelvesThunk = (bookshelf) => async (dispatch) => {

    const response = await fetch('/api/bookshelves/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookshelf)
        }
    );
    if (response.ok) {
        const data = await response.json();
        dispatch(addUserBookshelf(data));
        return JSON.stringify(data);
    }
}

export const renameUserBookshelfThunk = (bookshelf, id) => async (dispatch) => {

    const response = await fetch(`/api/bookshelves/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookshelf)
        }
    );
    if (response.ok) {
        const data = await response.json();
        dispatch(renameUserBookshelf(data));
        return JSON.stringify(data);
    }
}


export const deleteUserBookshelfThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        await response.json();
        dispatch(deleteUserBookshelf(id));
        return JSON.stringify(id);
    }
}

export const updateLibraryThunk = (updateLib) => async (dispatch) => {

    const response = await fetch(`/api/bookshelves/library`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateLib)
        }
    );
    if (response.ok) {
        const data = await response.json();
        dispatch(updateLibrary(data));
        return JSON.stringify(data);
    }
}

export const createDefaultBookshelvesThunk = (userID) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/default`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userID)
    }
    );
    if (response.ok) {
        const data = await response.json();
        dispatch(createDefaultBookshelves(data));
        return JSON.stringify(data);
    }
}

// # //REDUCER
const initialState = { userBookshelves: {} }
const bookshelvesReducer = (state = initialState, action) => {
    let bookshelves
    switch (action.type) {
        case GET_USER_BOOKSHELVES:
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            bookshelves.userBookshelves = action.payload
            return bookshelves

        case ADD_USER_BOOKSHELF:
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            let newBookshelf = action.payload
            bookshelves.userBookshelves[newBookshelf.id] = newBookshelf
            return bookshelves

        case DELETE_USER_BOOKSHELF:
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            let deleteShelfID = action.payload

            delete bookshelves.userBookshelves[deleteShelfID]

            return bookshelves

        case EDIT_USER_BOOKSHELF:
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            let editBookShelf = action.payload
            bookshelves.userBookshelves[editBookShelf.id] = editBookShelf
            return bookshelves

        case UPDATE_LIBRARY:
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            // NOT CHANGING STATE -- using previously made thunks to do it for us
            return bookshelves

        case DEFAULT_CREATE:
            bookshelves = { ...state, userBookshelves: { ...state.userBookshelves } }
            // NOT CHANGING STATE -- using previously made thunks to do it for us
            return bookshelves

        default:
            return state
    }
}

export default bookshelvesReducer
