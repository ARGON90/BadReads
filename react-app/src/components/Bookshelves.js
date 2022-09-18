import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';

const Bookshelves = () => {
    // console.log('INSIDE BOOKS BY ID COMPONENT')
    // const { id } = useParams()
    // const dispatch = useDispatch();
    // const booksDict = useSelector((state) => (state?.books))

    // const singleBook = booksDict[id]
    // // key into this like a d

    // useEffect(() => {
    //     console.log('BOOKS BY ID USE EFFECT')
    //     dispatch(getAllBooksThunk())
    // }, [dispatch])

    // if (booksDict.length < 1) return <div>Loading All Books...</div>
    // if (!singleBook) return <div>Sorry, this book doesn't exist</div>
    return (
        <>


        </>
    );
}

export default Bookshelves;
