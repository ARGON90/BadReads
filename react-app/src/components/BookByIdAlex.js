import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import Reviews from './Reviews';
import EditBookModal from './EditBookModal';

import "./CSS/Reviews.css"

const BookById = () => {
    console.log('INSIDE BOOKS BY ID COMPONENT')
    const { id } = useParams()
    const dispatch = useDispatch();
    const booksDict = useSelector((state) => (state?.books))
    const singleBook = booksDict[id]
    console.log(singleBook, 'SINGLE BOOK')
    /* julie code */
    const currentUser = useSelector((state) => state?.session?.user);
    const [ display, setDisplay ] = useState('landing')

    useEffect(() => {
        console.log('BOOKS BY ID USE EFFECT')
        dispatch(getAllBooksThunk())
    }, [dispatch])

    if (booksDict.length < 1) return <div>Loading All Books...</div>
    if (!singleBook) return <div>Sorry, this book doesn't exist</div>
    return (
        <>
            <h1
            className='alex_review_page_title'
            >{singleBook.title} </h1>
                <div className='alex_merriweather_300' key={singleBook.id}>
                    <h2 className='alex_font_16'>by {singleBook.author}</h2>
                    <img src={singleBook.image_url} alt='Cover' style={{height: '100px'}}/>
                    {display == 'landing' ? <div className='alex_font_14'>{singleBook.banned}</div> : null}
                    {display == 'landing' ? <div className='alex_font_14'>{singleBook.description}</div> : null}
                </div>
                {/* julie code */}
                {singleBook && currentUser && currentUser.id === singleBook.user_id && (
                    <div>
                        <EditBookModal />
                    </div>
                )}
                <Reviews display={display} setDisplay={setDisplay}/>
        </>
    );
}

export default BookById;
