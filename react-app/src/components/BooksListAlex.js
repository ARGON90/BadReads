import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';

const BooksList = () => {
    console.log('INSIDE BOOKS LIST COMPONENT')

    const dispatch = useDispatch();
    const booksList = useSelector((state) => Object.values(state?.books))

    useEffect(() => {
        console.log('BOOKS LIST USE EFFECT')
        dispatch(getAllBooksThunk())
    }, [dispatch])

    if (booksList.length < 1) return <div>Loading All Books...</div>
    return (
        <>
            <h1>All Books List: </h1>
            {booksList.map((book) =>
                <div key={book.id}>
                    <NavLink className='alex_text_deco_none' to={`/books/${book.id}`}>
                    <img src={book.image_url} alt='cover' style={{height: '100px'}}/>
                    <div>{book.title}</div>
                    <div>{book.author}</div>
                    </NavLink>
                </div>

            )}
        </>
    );
}

export default BooksList;
