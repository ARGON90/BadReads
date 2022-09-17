import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';

const BookById = () => {
    console.log('INSIDE BOOKS BY ID COMPONENT')
    const { id } = useParams()
    const dispatch = useDispatch();
    const booksList = useSelector((state) => Object.values(state?.books))
    const singleBook = booksList[id - 1]

    useEffect(() => {
        console.log('BOOKS BY ID USE EFFECT')
        dispatch(getAllBooksThunk())
    }, [dispatch])

    if (booksList.length < 1) return <div>Loading All Books...</div>
    if (!singleBook) return <div>Sorry, this book doesn't exist</div>
    return (
        <>
            <h1>All Books List: </h1>
                <div key={singleBook.id}>
                    <img src={singleBook.image_url} alt='Cover' style={{height: '100px'}}/>
                    <div>{singleBook.title}</div>
                    <div>{singleBook.author}</div>
                </div>

        </>
    );
}

export default BookById;
