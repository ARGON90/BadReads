import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';

import "./CSS/Reviews.css"

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
            <div className='alex-books-page-outer'>
                <div className='alex-books-page-container'>
                    <div className='alex-books-page-header-container'>
                        <h1 className="alex-books-page-title"> Browse All Books </h1>
                    </div>
                    <div className="alex-books-page-separator"></div>
                    <div className="alex-books-page-books-item-container">
                    {booksList.map((book) =>
                        <div key={book.id}>
                            <NavLink className='alex_text_deco_none' to={`/books/${book.id}`}>
                                <img className='alex-image-size' src={book.image_url} alt='cover' />
                                <div>{book.title}</div>
                                <div>{book.author}</div>
                            </NavLink>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BooksList;
