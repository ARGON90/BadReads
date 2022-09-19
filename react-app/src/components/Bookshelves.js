import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserBookshelvesThunk } from '../store/bookshelvesRed';
import { getAllBooksThunk } from '../store/booksAlex';
import "./CSS/Bookshelves.css"

const Bookshelves = () => {

    const dispatch = useDispatch();
    const bookshelvesDict = useSelector((state) => (state?.bookshelves?.userBookshelves))
    // const userID = useSelector((state) => state?.session?.user?.id)
    const booksDict = useSelector((state) => state?.books)

    const [shelfID, setShelfID] = useState(false)
    const [toggleAddButton, setToggleAddButton] = useState(true)
    const [shelfName, setShelfName] = useState('')

    let userShelves = []

    if (bookshelvesDict) {
        console.log("in shelves")
        // let shelfArr = Object.values(bookshelvesDict)

        // userShelves = shelfArr.filter(shelf => shelf.user_id.id === userID)
        userShelves = Object.values(bookshelvesDict)
    }

    //organize into default shelves and custom
    let defaultArr = []
    let customArr = []
    if (userShelves.length > 0) {
        for (let shelf of userShelves) {
            if (shelf.default) {
                defaultArr.push(shelf)
            } else { customArr.push(shelf) }
        }
    }


    //get total books in all bookshelves non Dupes and make arr of ALL ids, exclude dups
    //and grab user id why not
    let bookIDArr = []
    let userID
    if (userShelves.length > 0) {
        for (let shelf of userShelves) {
            userID = shelf.user_id
            for (let id of shelf.books) {
                bookIDArr.push(id)
            }

        }
        //gets rid of dupes
        bookIDArr = [...new Set(bookIDArr)]

    }



    useEffect(() => {
        dispatch(getUserBookshelvesThunk())
        //run this  for now until nav bar to bookshelves
        dispatch(getAllBooksThunk())
    }, [])

    //handle adding a shelf submission

    const handleAddShelfSubmit = (e) => {
        e.preventDefault();

        let newBookShelf = {
            user_id: userID,
            name: shelfName,
        }

        console.log(newBookShelf)

        //end
        //dispatch here
        setToggleAddButton(true)
        setShelfName('')
    }

    if (bookshelvesDict.length < 1) return <div>Loading All Books...</div>
    return (
        <>
            <div className='bookshelf_page_outer'>
                <div className="bookshelf_page_title">My Books </div>
            </div>
            <div className='bookshelf_page_outer'>
                <div className='bookshelf_page_inner1'>
                    <div className='bookshelf_page_subTitleOuter'>
                        <div className='bookshelf_page_subTitle'>Bookshelves  </div>
                        <div className='bookshelf_page_subEdit'>(Edit)</div>
                    </div>
                    <div
                        className='bookshelf_page_shelfName bookshelf_page_shelfNameAll'
                        onClick={() => setShelfID(false)}>All ({bookIDArr.length})</div>
                    <div className='bookshelf_page_defaultArr'>
                        {defaultArr.map((shelf) =>
                            <div key={shelf.id}>
                                <div
                                    className='bookshelf_page_shelfName bookshelf_page_shelfNameDec'
                                    onClick={() => setShelfID(shelf.id)}>{shelf.name} ({shelf.books.length})</div>
                            </div>
                        )}
                    </div>
                    <div className='bookshelf_page_customArr'>
                        {customArr.map((shelf) =>
                            <div key={shelf.id}>
                                <div
                                    onClick={() => setShelfID(shelf.id)}
                                    className='bookshelf_page_shelfName bookshelf_page_shelfNameDec'>{shelf.name} ({shelf.books.length})</div>
                            </div>
                        )}
                        {toggleAddButton && <div
                            onClick={() => setToggleAddButton(false)}
                            className='bookshelf_page_addShelfButton'> Add shelf</div>}
                        {!toggleAddButton &&
                            <form className='bookshelf_page_addShelfForm' onSubmit={handleAddShelfSubmit}>
                                <div>
                                    <div className='bookshelf_page_addShelfFormTitle'>Add a Shelf:</div>
                                    <input
                                        id='addShelfName'
                                        type="text"
                                        value={shelfName}
                                        onChange={(e) => setShelfName(e.target.value)}
                                        required
                                        maxLength={20}
                                        minLength={2}

                                    />
                                </div>
                                <button

                                    className='bookshelf_page_submitShelfButton'> add</button>
                            </form>
                        }
                    </div>
                </div>
                <div className='bookshelf_page_inner2'>
                    {!shelfID && bookIDArr.map((id) =>
                        // {console.log(booksDict[id].image_url)}

                        <div key={booksDict[Number(id)]?.image_url} >
                            <img
                                className="bookshelf_page_img"
                                src={booksDict[Number(id)]?.image_url} alt='cover' />
                        </div>

                    )}
                    {shelfID && bookshelvesDict[shelfID].books.map((id) =>
                        // {console.log(booksDict[id].image_url)}

                        <div key={booksDict[Number(id)]?.image_url} >
                            <img
                                className="bookshelf_page_img"
                                src={booksDict[Number(id)]?.image_url} alt='cover' />
                        </div>

                    )}
                </div>

            </div>
        </>
    );
}

export default Bookshelves;
