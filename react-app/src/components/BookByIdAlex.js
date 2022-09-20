import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import Reviews from './Reviews';
import EditBookModal from './EditBookModal';

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
            <h1>{singleBook.title} </h1>
                <div key={singleBook.id}>
                    <h2>by {singleBook.author}</h2>
                    <img src={singleBook.image_url} alt='Cover' style={{height: '100px'}}/>
                    {display == 'landing' ? <div>{singleBook.banned}</div> : null}
                    {display == 'landing' ? <div>{singleBook.description}</div> : null}
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
