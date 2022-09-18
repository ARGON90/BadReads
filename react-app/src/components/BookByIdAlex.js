import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import Reviews from './Reviews';

const BookById = () => {
    console.log('INSIDE BOOKS BY ID COMPONENT')
    const { id } = useParams()
    const dispatch = useDispatch();
    const booksDict = useSelector((state) => (state?.books))
    const singleBook = booksDict[id]


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
                    <h2>{singleBook.author}</h2>
                    <img src={singleBook.image_url} alt='Cover' style={{height: '100px'}}/>
                    <div>{singleBook.description}</div>
                </div>
                <Reviews />

        </>
    );
}

export default BookById;
