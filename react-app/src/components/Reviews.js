import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';

const Reviews = () => {
    console.log('INSIDE REVIEWS COMPONENT')
    // const { id } = useParams()
    // const dispatch = useDispatch();
    // const booksDict = useSelector((state) => (state?.books))
    // const singleBook = booksDict[id]


    // useEffect(() => {
    //     console.log('BOOKS BY ID USE EFFECT')
    //     dispatch(getAllBooksThunk())
    // }, [dispatch])

    // useEffect(() => {
    //     console.log('BOOKS BY ID USE EFFECT')
    //     dispatch(getAllBooksThunk())
    // }, [dispatch])

    // if (booksDict.length < 1) return <div>Loading All Books...</div>
    // if (!singleBook) return <div>Sorry, this book doesn't exist</div>
    return (
        <>
            <h2>Reviews</h2>

        </>
    );
}

export default Reviews;
