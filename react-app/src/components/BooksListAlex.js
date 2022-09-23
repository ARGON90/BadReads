import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import './CSS/BooksListBen.css'

const BooksList = () => {
    // console.log('INSIDE BOOKS LIST COMPONENT')

    const dispatch = useDispatch();
    const booksList = useSelector((state) => Object.values(state?.books))

    useEffect(() => {
        // console.log('BOOKS LIST USE EFFECT')
        dispatch(getAllBooksThunk())
    }, [dispatch])

    if (booksList.length < 1) return <div></div>
    return (
        <div>
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
            <div>
                <div className="footerMainDiv">
                    <div className='footerContainerDiv'>
                        <div className='footerColumn'>
                            <h2 className='footerColumnTitle'>INSPIRED BY</h2>
                            <a href="https://www.goodreads.com/">goodreads</a>
                        </div>
                        <div className='footerColumn'>
                            <h2 className='footerColumnTitle'>WORK WITH US</h2>
                            <a href="https://github.com/ARGON90">Alex Gonglach</a>
                            <a href="https://github.com/benwaldee">Ben Waldee</a>
                            <a href="https://github.com/julieyj">Julie Jung</a>
                            <a href="https://github.com/jvstinejvng">Justine Jang</a>
                        </div>
                        <div className='footerColumn'>
                            <h2 className='footerColumnTitle'>SOURCE CODE</h2>
                            <a href="https://github.com/ARGON90/BadReads">Github Repository</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BooksList;
