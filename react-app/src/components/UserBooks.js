import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooksThunk } from '../store/booksAlex';
import CreateBookModal from './CreateBookModal';
import EditBookModal from './EditBookModal';
import DeleteBookModal from './DeleteBookModal';

const UserBooks = () => {
    console.log('INSIDE USER BOOKS COMPONENT')

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state?.session?.user);
    const booksList = useSelector((state) => Object.values(state?.books))

    useEffect(() => {
        console.log('GET ALL BOOKS/USERBOOKS USE EFFECT')
        dispatch(getAllBooksThunk())
    },[dispatch])

    if (currentUser == null) {
        console.log('currentUser == null conditional')
        return null
    }

    const userBooks = booksList.filter((book) => book.user_id === currentUser['id'])
    console.log('currentUser', currentUser)
    console.log('currentUserId', currentUser['id'])
    console.log('books', booksList)
    console.log('userBooks', userBooks)

    return (
        <>
            {currentUser && userBooks && (
                <>
                <CreateBookModal />
                <h1>My Books List:</h1>
                {userBooks?.map((userBook, index) =>
                    <div key={index}>
                        <NavLink to={`/books/${userBook.id}`}>
                            <img src={userBook.image_url} alt='bookcover' style={{height: '100px'}} />
                            <div>{userBook.title}</div>
                            <div>{userBook.author}</div>
                        </NavLink>
                        <EditBookModal userBook={userBook} />
                        <DeleteBookModal userBook={userBook} />
                    </div>
                )}
                </>
            )}
        </>
    );
}

export default UserBooks;
