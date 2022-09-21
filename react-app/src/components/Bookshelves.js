import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateLibraryThunk, getUserBookshelvesThunk, addUserBookshelvesThunk, deleteUserBookshelfThunk, renameUserBookshelfThunk } from '../store/bookshelvesRed';
import { getAllBooksThunk } from '../store/booksAlex';
import "./CSS/Bookshelves.css"

const Bookshelves = () => {

    const history = useHistory()

    const dispatch = useDispatch();
    const bookshelvesDict = useSelector((state) => (state?.bookshelves?.userBookshelves))
    // const userID = useSelector((state) => state?.session?.user?.id)
    const booksDict = useSelector((state) => state?.books)

    const [shelfID, setShelfID] = useState(false)
    const [toggleAddButton, setToggleAddButton] = useState(true)
    const [shelfName, setShelfName] = useState('')
    const [renameShelfName, setRenameShelfName] = useState('')
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleRename, setToggleRename] = useState(false)
    // const [toggleBookEdit, setToggleBookEdit] = useState(false)
    const [bookEditID, setBookEditID] = useState(false)

    const [bookshelfIDArr, setBookshelfIDArr] = useState([])

    //turn usershelves slice of store into arr
    let userShelves = []
    if (bookshelvesDict) {
        userShelves = Object.values(bookshelvesDict)
    }

    //organize into default shelves and custom, generate defaultIDs for bookedit logic
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



    //run store dispatches on page load
    useEffect(() => {
        dispatch(getUserBookshelvesThunk())
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
        dispatch(addUserBookshelvesThunk(newBookShelf))
        setToggleAddButton(true)
        setShelfName('')
    }

    const handleDeleteShelf = (id) => {

        console.log("yup")
        dispatch(deleteUserBookshelfThunk(id))
        // dispatch(getUserBookshelvesThunk())
        // dispatch(getAllBooksThunk())
        setToggleRename(false)
        setRenameShelfName('')
        return
    }

    //handle renaming a shelf submission
    const handleRenameShelfSubmit = (e, id) => {
        e.preventDefault();


        let editBookShelf = {
            user_id: userID,
            name: renameShelfName
        };

        console.log(editBookShelf);

        //end
        //dispatch here
        dispatch(renameUserBookshelfThunk(editBookShelf, id));

        setToggleRename(false);
        setRenameShelfName('');
        return
    }

    const genShelfIDArr = (bookID) => {
        let genShelfIDArr = []
        for (let shelf of userShelves) {

            if (shelf.books.includes(bookID)) {
                if (!genShelfIDArr.includes(shelf.id)) {


                    genShelfIDArr.push(shelf.id)
                }
            }
        }
        return genShelfIDArr
    }

    const handleBookEdit = (e, bookID) => {
        e.preventDefault();

        // console.log("send shelfID arr back", bookshelfIDArr)
        // console.log("send bookID back", bookID)

        const updateLibrary = {
            bookshelfIDArr: bookshelfIDArr,
            bookID: bookID
        }

        //end
        //run thunk for book edit
        dispatch(updateLibraryThunk(updateLibrary))
            .then(() => dispatch(getUserBookshelvesThunk()))
            .then(() => dispatch(getAllBooksThunk()))

        setBookEditID(false)
    }

    const spotIDredirect = (id) => {

        history.push(`/books/${id}`)
    }

    if (bookshelvesDict.length < 1 && bookshelfIDArr.length < 1) return <div></div>
    return (
        <>
            <div className='bookshelf_page_outer'>
                <div className="bookshelf_page_title">My Bookshelves </div>
            </div>
            <div className='bookshelf_page_outer'>
                <div className='bookshelf_page_inner1'>
                    <div className='bookshelf_page_subTitleOuter'>
                        <div className='bookshelf_page_subTitle'>Bookshelves  </div>
                        <div
                            onClick={() => {
                                setToggleAddButton(true)
                                setToggleEdit(!toggleEdit)
                                setShelfName('')
                                setBookEditID(false)
                                return
                            }}
                            className='bookshelf_page_subEdit'>(Edit)</div>
                    </div>
                    <div
                        className='bookshelf_page_shelfName bookshelf_page_shelfNameAll'
                        onClick={() => {
                            setToggleEdit(false)
                            setShelfID(false)
                            setBookEditID(false)
                            return
                        }}>All ({bookIDArr.length})</div>
                    <div className='bookshelf_page_defaultArr'>
                        {defaultArr.map((shelf) =>
                            <div key={shelf.id}>
                                <div
                                    className='bookshelf_page_shelfName bookshelf_page_shelfNameDec'
                                    onClick={() => {
                                        setToggleEdit(false)
                                        setShelfID(shelf.id)
                                        setBookEditID(false)
                                        return
                                    }}>{shelf.name} ({shelf.books.length})</div>
                            </div>
                        )}
                    </div>
                    <div className='bookshelf_page_customArr'>
                        {customArr.map((shelf) =>
                            <div key={shelf.id}>
                                <div
                                    onClick={() => {
                                        setToggleEdit(false)
                                        setShelfID(shelf.id)
                                        setBookEditID(false)
                                        return
                                    }}
                                    className='bookshelf_page_shelfName bookshelf_page_shelfNameDec'>{shelf.name} ({shelf.books.length})</div>
                            </div>
                        )}
                        {toggleAddButton && <div
                            onClick={() => {
                                setToggleRename(false)
                                setToggleAddButton(false)
                                setBookEditID(false)
                                return
                            }}
                            className='bookshelf_page_addShelfButton'> Add shelf</div>}
                        {!toggleAddButton &&
                            <>
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
                                    <div
                                        onClick={() => {
                                            setShelfName("")
                                            setToggleAddButton(true)
                                            setShelfName('')
                                            return
                                        }}
                                        className='bookshelf_page_XaddShelf'>
                                        X
                                    </div>
                                </form>
                            </>

                        }
                    </div>
                </div>
                {!toggleEdit && <div className='bookshelf_page_inner2'>
                    {!shelfID && bookIDArr?.map((id) =>

                        //Repeat this div once more below
                        <div className='bookshelf_page_outerImage' key={booksDict[Number(id)]?.image_url} >
                            <div
                                onClick={() => {
                                    if (bookEditID === id) {
                                        setBookEditID(false)
                                    } else { setBookEditID(id) }

                                    let arr = genShelfIDArr(id)
                                    setBookshelfIDArr(arr)
                                    // console.log(bookshelfIDArr)
                                    return
                                }}
                                className='bookshelf_page_imageEdit'>edit</div>
                            {bookEditID === id &&
                                <form className='bookshelf_page_bookEditForm'
                                    onSubmit={(e) => {
                                        console.log(id)
                                        handleBookEdit(e, id)
                                        return
                                    }}>
                                    <div className="bookshelf_page_bookEditShelves">Shelves</div>
                                    {customArr.map((shelf) =>
                                        <div className='bookshelf_page_bookInputWrapDiv'>
                                            <label className='bookshelf_page_bookLabel' for={`${shelf.name}${shelf.id}`}>{shelf.name}</label>
                                            <input
                                                className='bookshelf_page_bookCheck'
                                                type='checkbox'
                                                id={`${shelf.name}${shelf.id}`}

                                                defaultChecked={shelf.books.includes(id) ? 'checked' : ''}
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
                                                defaultChecked={shelf.books.includes(id) ? 'checked' : ''}
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
                            <img
                                onClick={() => spotIDredirect(id)}
                                className="bookshelf_page_img"
                                src={booksDict[Number(id)]?.image_url} alt='cover' />
                        </div>

                    )}
                    {shelfID && bookshelvesDict[shelfID]?.books.map((id) =>

                        //REPEAT OF UPPER DIV
                        <div className='bookshelf_page_outerImage' key={booksDict[Number(id)]?.image_url} >
                            <div
                                onClick={() => {
                                    if (bookEditID === id) {
                                        setBookEditID(false)
                                    } else { setBookEditID(id) }

                                    let arr = genShelfIDArr(id)
                                    setBookshelfIDArr(arr)
                                    // console.log(bookshelfIDArr)
                                    return
                                }}
                                className='bookshelf_page_imageEdit'>edit</div>
                            {bookEditID === id &&
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

                                                defaultChecked={shelf.books.includes(id) ? 'checked' : ''}
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
                                                defaultChecked={shelf.books.includes(id) ? 'checked' : ''}
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
                            <img
                                onClick={() => spotIDredirect(id)}
                                className="bookshelf_page_img"
                                src={booksDict[Number(id)]?.image_url} alt='cover' />
                        </div>


                    )}
                    {shelfID && bookshelvesDict[shelfID].books.length === 0 &&

                        <div className="bookshelf_page_noMatch">No matching items!</div>

                    }
                </div>}
                {toggleEdit &&
                    <div className='bookshelf_page_editInner2'>
                        {customArr.map((shelf) =>
                            <div key={shelf.id} className="bookshelf_page_editWrap">
                                <div
                                    onClick={() => handleDeleteShelf(shelf.id)}
                                    className="bookshelf_page_delete">X</div>
                                {toggleRename !== shelf.id &&
                                    <div
                                        className='bookshelf_page_editShelfName'>{shelf.name} ({shelf.books.length})</div>
                                }
                                {toggleRename !== shelf.id && <div
                                    onClick={() => {
                                        setToggleAddButton(true)
                                        setShelfName("")
                                        setToggleRename(shelf.id)
                                        return
                                    }}
                                    className="bookshelf_page_editRename"> rename</div>}
                                {toggleRename == shelf.id &&
                                    <div className="bookshelf_page_renameFormOuter">
                                        <form className='bookshelf_page_renameShelfForm' onSubmit={(e) => handleRenameShelfSubmit(e, shelf.id)}>
                                            <div>
                                                <input
                                                    id='renameShelfName'
                                                    type="text"
                                                    value={renameShelfName}
                                                    onChange={(e) => setRenameShelfName(e.target.value)}
                                                    required
                                                    maxLength={20}
                                                    minLength={2}
                                                    placeholder={shelf.name}

                                                />
                                            </div>
                                            <button

                                                className='bookshelf_page_submitRenameShelfButton'> Save</button>
                                            <div
                                                onClick={() => {
                                                    setRenameShelfName("")
                                                    setToggleRename(false)
                                                    return
                                                }}
                                                className='bookshelf_page_XRenameShelf'>
                                                Cancel
                                            </div>
                                        </form>
                                    </div>
                                }
                            </div>
                        )}
                        <div
                            onClick={() => {
                                setShelfID(false)
                                setToggleEdit(false)
                                setToggleRename(false)
                                setRenameShelfName('')
                            }}
                            className="bookshelf_page_editDone">I'm Done</div>

                    </div>
                }
            </div>
        </>
    );
}

export default Bookshelves;
