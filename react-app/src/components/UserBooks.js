import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooksThunk } from '../store/booksAlex';
import CreateBookModal from './CreateBookModal';

const UserBooks = () => {
    console.log('INSIDE USER BOOKS COMPONENT')

    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const booksList = useSelector((state) => Object.values(state?.books))
    const userBooks = booksList.filter((book) => book.user_id === currentUser['id'])
    // console.log('currentUser', currentUser)
    // console.log('currentUserId', currentUser['id'])
    // console.log('books', booksList)
    // console.log('userBooks', userBooks)

    useEffect(() => {
        console.log('USER BOOKS USE EFFECT')
        dispatch(getAllBooksThunk())
    },[dispatch])

    if (!currentUser) {
        history.push("/")
    }

    return (
        <>
            {currentUser && userBooks && (
                <>
                <CreateBookModal />
                <h1>My Books List:</h1>
                {userBooks.map((userBook, index) =>
                    <div key={index}>
                        <img src={userBook.image_url} alt='bookcover' style={{height: '100px'}} />
                        <div>{userBook.title}</div>
                        <div>{userBook.author}</div>
                    </div>
                )}
                </>
            )}
        </>
    );
}

export default UserBooks;
