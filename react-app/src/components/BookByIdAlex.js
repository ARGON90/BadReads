import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import { updateLibraryThunk, getUserBookshelvesThunk, addUserBookshelvesThunk, deleteUserBookshelfThunk, renameUserBookshelfThunk } from '../store/bookshelvesRed';

import Reviews from './Reviews';

import "./CSS/Reviews.css"

const BookById = () => {
    console.log('INSIDE BOOKS BY ID COMPONENT')
    const { id } = useParams()
    const dispatch = useDispatch();
    const booksDict = useSelector((state) => (state?.books))
    const singleBook = booksDict[id]
    console.log(singleBook, 'SINGLE BOOK')
    const [display, setDisplay] = useState('landing')

    // imports from bookshelves

    const [dropToggle, setDropToggle] = useState(false)


    const bookshelvesDict = useSelector((state) => (state?.bookshelves?.userBookshelves))
    // const [shelfID, setShelfID] = useState(false)
    // const [toggleAddButton, setToggleAddButton] = useState(true)
    // const [shelfName, setShelfName] = useState('')
    // const [renameShelfName, setRenameShelfName] = useState('')
    // const [toggleEdit, setToggleEdit] = useState(false)
    // const [toggleRename, setToggleRename] = useState(false)
    const [bookEditID, setBookEditID] = useState(false)
    const [bookshelfIDArr, setBookshelfIDArr] = useState([])

    let userShelves = []
    if (bookshelvesDict) {
        userShelves = Object.values(bookshelvesDict)
    }

    let defaultArr = []
    let defaultIDArr = []
    let customArr = []
    if (userShelves.length > 0) {
        for (let shelf of userShelves) {
            if (shelf.default) {
                defaultArr.push(shelf)
                defaultIDArr.push(shelf.id)
            } else { customArr.push(shelf) }
        }
    }

    const genShelfIDArr = (bookID) => {
        let genShelfIDArr = []
        for (let shelf of userShelves) {

            if (shelf.books.includes(Number(bookID))) {
                if (!genShelfIDArr.includes(shelf.id)) {


                    genShelfIDArr.push(shelf.id)
                }
            }
        }
        console.log('USERSHELVES', userShelves)
        console.log('GEN SHELF ID ARR', genShelfIDArr)
        return genShelfIDArr
    }

    const handleBookEdit = (e, bookID) => {
        e.preventDefault();
        const updateLibrary = {
            bookshelfIDArr: bookshelfIDArr,
            bookID: bookID
        }
        dispatch(updateLibraryThunk(updateLibrary))
            .then(() => dispatch(getUserBookshelvesThunk()))
            .then(() => dispatch(getAllBooksThunk()))

        setDropToggle(false)
    }

    // imports from bookshelves


    useEffect(() => {
        console.log('BOOKS BY ID USE EFFECT')
        dispatch(getUserBookshelvesThunk())
        dispatch(getAllBooksThunk())
    }, [dispatch])

    if (booksDict.length < 1) return <div>Loading All Books...</div>
    if (!singleBook) return <div>Sorry, this book doesn't exist</div>
    return (
        <>
            <h1
                className='alex_review_page_title'
            >{singleBook.title} </h1>
            <div key={singleBook.id}>
                <h2 className='alex_merriweather_300 alex_font_16'>by {singleBook.author}</h2>
                <img src={singleBook.image_url} alt='Cover' style={{ height: '100px' }} />
                {/* adding bookshelves */}
                <div
                    onClick={() => {
                        setDropToggle((dropToggle) => !dropToggle)

                        let arr = genShelfIDArr(id)
                        console.log('ARR', arr)
                        setBookshelfIDArr(arr)
                        console.log('BOOKSHELF ID ARRAY', bookshelfIDArr)
                        return
                    }}
                    className='bookshelf_page_imageEdit'>edit
                </div>
                {dropToggle &&
                    <form className='bookshelf_page_bookEditForm'
                        onSubmit={(e) => {
                            console.log(id)
                            handleBookEdit(e, id)
                            return
                        }}>
                        <div className="bookshelf_page_bookEditShelves">Shelves</div>
                        {customArr.map((shelf) =>
                            <div className='bookshelf_page_bookInputWrapDiv'>
                                <label
                                    className='bookshelf_page_bookLabel'
                                    for={`${shelf.name}${shelf.id}`}>{shelf.name}</label>
                                <input
                                    className='bookshelf_page_bookCheck'
                                    type='checkbox'
                                    id={`${shelf.name}${shelf.id}`}

                                    defaultChecked={shelf.books.includes(Number(id)) ? 'checked' : ''}
                                    onChange={() => {
                                        if (bookshelfIDArr.includes(shelf.id)) {
                                            let tempArr = [...bookshelfIDArr]
                                            let finalArr = []
                                            for (let id of tempArr) {
                                                if (id !== shelf.id) {
                                                    finalArr.push(id)
                                                }
                                            }
                                            setBookshelfIDArr(finalArr)
                                        } else { setBookshelfIDArr([...bookshelfIDArr, shelf.id]) }

                                    }}

                                ></input>
                            </div>
                        )}
                        <div className="bookshelf_page_bookEditStatus">Status</div>
                        {defaultArr.map((shelf) =>
                            <div className='bookshelf_page_bookInputWrapDiv bookshelf_page_bookInputWrapDivBot'>
                                <label
                                    className='bookshelf_page_bookLabel'
                                    for={`${shelf.name}${shelf.id}`}>{shelf.name}</label>
                                <input
                                    className='bookshelf_page_bookRadio'
                                    type='radio'
                                    id={`${shelf.name}${shelf.id}`}
                                    name='defaultRadio'
                                    defaultChecked={shelf.books.includes(Number(id)) ? 'checked' : ''}
                                    onChange={() => {

                                        let tempArr = [...bookshelfIDArr]
                                        let finalArr = []
                                        for (let id of tempArr) {
                                            if (!defaultIDArr.includes(id)) {
                                                finalArr.push(id)
                                            }

                                        }
                                        finalArr.push(shelf.id)
                                        setBookshelfIDArr(finalArr)

                                    }}

                                ></input>
                            </div>
                        )}
                        <button
                            className='bookshelf_page_bookSave'
                        >Save</button>
                    </form>
                }

                {display == 'landing' ? <div>
                    <div className='alex_merriweather_300 alex_font_14 alex_bold'>Why was it banned?</div>
                    <div className='alex_merriweather_300 alex_font_14' >{singleBook.banned}</div>
                    <br></br>
                    <div className='alex_merriweather_300 alex_font_14' >{singleBook.description}</div>
                </div>
                    : null}
            </div>
            <Reviews display={display} setDisplay={setDisplay} />
        </>
    );
}

export default BookById;
