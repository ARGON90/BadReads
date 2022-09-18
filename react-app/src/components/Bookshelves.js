import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllBookshelvesThunk } from '../store/bookshelvesRed';
import { getAllBooksThunk } from '../store/booksAlex';

const Bookshelves = () => {

    const dispatch = useDispatch();
    const bookshelvesDict = useSelector((state) => (state?.bookshelves?.allBookshelves))
    const userID = useSelector((state) => state?.session?.user?.id)
    const booksDict = useSelector((state) => state?.books)

    let userShelves = []

    if (bookshelvesDict) {
        console.log("in shelves")
        let shelfArr = Object.values(bookshelvesDict)

        userShelves = shelfArr.filter(shelf => shelf.user_id.id === userID)

    }


    useEffect(() => {
        dispatch(getAllBookshelvesThunk())
        //run this  for now until nav bar to bookshelves
        dispatch(getAllBooksThunk())
    }, [])

    if (bookshelvesDict.length < 1) return <div>Loading All Books...</div>
    return (
        <>
            <h1>My Bookshelves List: </h1>
            {userShelves.map((shelf) =>
                <div key={shelf.id}>
                    <div>{shelf.name}</div>
                    <div>Books:</div>
                    {shelf.books.map((bookID) =>
                        <div key={bookID}>{booksDict[Number(bookID)]?.title}</div>

                    )}
                </div>

            )}
        </>
    );
}

export default Bookshelves;
