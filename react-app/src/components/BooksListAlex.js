import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import './CSS/BooksListBen.css'

const BooksList = () => {
    console.log('INSIDE BOOKS LIST COMPONENT')

    const dispatch = useDispatch();
    const booksList = useSelector((state) => Object.values(state?.books))

    useEffect(() => {
        console.log('BOOKS LIST USE EFFECT')
        dispatch(getAllBooksThunk())
    }, [dispatch])

    if (booksList.length < 1) return <div></div>
    return (
        <div className='booklist_outerWrap'>
            <h1 className='booklist_h1'>Featured Banned Books: </h1>
            <div className='booklist_outer'>
                {booksList.map((book) =>
                    <div className='booklist_bybook' key={book.id}>
                        <NavLink className='booklist_navLink' to={`/books/${book.id}`}>
                            <img className='booklist_image' src={book.image_url} alt='cover' />
                            <div className='booklist_title' >{book.title}</div>
                            <div className='booklist_author'>{book.author}</div>
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BooksList;
