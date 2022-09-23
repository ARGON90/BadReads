import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    updateLibraryThunk,
    getUserBookshelvesThunk,
    addUserBookshelvesThunk,
    deleteUserBookshelfThunk,
    renameUserBookshelfThunk,
} from "../store/bookshelvesRed";
import { getAllBooksThunk } from "../store/booksAlex";
import "./CSS/Bookshelves.css";

const Bookshelves = () => {
    //used in for onClick on individual books
    const history = useHistory();

    const dispatch = useDispatch();

    //object of the userBookshelves portion of store
    const bookshelvesDict = useSelector(
        (state) => state?.bookshelves?.userBookshelves
    );
    //object of the books portion of store
    const booksDict = useSelector((state) => state?.books);

    //toggled when clicking on shelf on left - used to conditionally render books for each shelf
    const [shelfID, setShelfID] = useState(false);
    //toggled to show the add button as opposed to the add form
    const [toggleAddButton, setToggleAddButton] = useState(true);
    //controlled input for adding shelf
    const [shelfName, setShelfName] = useState("");
    //controlled input for editing shelf
    const [renameShelfName, setRenameShelfName] = useState("");
    //toggled on (edit) - used to display edit page for bookshelves
    //**note "(edit)"" is for editing bookshelves, "edit" is assignined books to bookshelves
    const [toggleEdit, setToggleEdit] = useState(false);
    //toggled when clicking rename on bookshelf edit page - used for rename form
    const [toggleRename, setToggleRename] = useState(false);
    //used to conditionally render the book to shelf edit form on each book - set to ID of book when edit is clicked
    const [bookEditID, setBookEditID] = useState(false);

    //**IMPORTANT** holds the bookshelf IDs that a book is in -
    //default empty - when edit is clicked over a book, populates with initial shelves the book is in
    //changes every single time a user adjusts inputs in the form  (in the onChange in the inputs)
    //submitted to the backend to modify DB
    const [bookshelfIDArr, setBookshelfIDArr] = useState([]);

    //turn usershelves slice of store into arr of user shelves
    let userShelves = [];
    if (bookshelvesDict) {
        userShelves = Object.values(bookshelvesDict);
    }

    //organize into default shelves and custom, generate defaultIDs for use later in book to boohslef  logic
    let defaultArr = [];
    let defaultIDArr = [];
    let customArr = [1];
    if (userShelves.length > 0) {
        customArr = [];
        for (let shelf of userShelves) {
            if (shelf.default) {
                defaultArr.push(shelf);
                defaultIDArr.push(shelf.id);
            } else {
                customArr.push(shelf);
            }
        }
    }

    //get total books in all bookshelves non Dupes and make arr of ALL ids, exclude dupes
    //and grab user id why not
    let bookIDArr = [];
    let userID;
    if (userShelves.length > 0) {
        for (let shelf of userShelves) {
            userID = shelf.user_id;
            for (let id of shelf.books) {
                bookIDArr.push(id);
            }
        }
        //gets rid of dupes
        bookIDArr = [...new Set(bookIDArr)];
    }

    //run store dispatches on page load
    useEffect(() => {
        dispatch(getUserBookshelvesThunk());
        dispatch(getAllBooksThunk());
    }, []);

    //handle adding a shelf submission
    const handleAddShelfSubmit = (e) => {
        e.preventDefault();

        let newBookShelf = {
            user_id: userID,
            name: shelfName,
        };

        dispatch(addUserBookshelvesThunk(newBookShelf));
        setToggleAddButton(true);
        setShelfName("");
    };

    //handles deleting a shelf
    const handleDeleteShelf = (id) => {
        dispatch(deleteUserBookshelfThunk(id));
        setToggleRename(false);
        setRenameShelfName("");
        return;
    };

    //handle renaming a shelf submission
    const handleRenameShelfSubmit = (e, id) => {
        e.preventDefault();

        let editBookShelf = {
            user_id: userID,
            name: renameShelfName,
        };

        dispatch(renameUserBookshelfThunk(editBookShelf, id));
        setToggleRename(false);
        setRenameShelfName("");
        return;
    };

    //this is the function that is called when clicking "edit" to edit book-to-bookshelf
    //this function uses the userShelves Arr and the specific book ID to generate an array
    //of bookshelf IDs that that book is in.
    const genShelfIDArr = (bookID) => {
        let genShelfIDArr = [];
        for (let shelf of userShelves) {
            if (shelf.books.includes(bookID)) {
                if (!genShelfIDArr.includes(shelf.id)) {
                    genShelfIDArr.push(shelf.id);
                }
            }
        }
        return genShelfIDArr;
    };

    //this is the function that handles submission of the form for editing book-to-bookshelf
    //it calls the updateLibraryThunk which runs what is essentially an edit/add/delete in the backend
    const handleBookEdit = (e, bookID) => {
        e.preventDefault();
        const updateLibrary = {
            bookshelfIDArr: bookshelfIDArr,
            bookID: bookID,
        };

        //**IMPORTANT** chaining thens because the updateLibraryThunk DOES NOT update store - it relies on these two thunks
        dispatch(updateLibraryThunk(updateLibrary))
            .then(() => dispatch(getUserBookshelvesThunk()))
            .then(() => dispatch(getAllBooksThunk()));

        setBookEditID(false);
    };

    //onClick for each book - just takes you to the books page
    const spotIDredirect = (id) => {
        history.push(`/books/${id}`);
    };

    //JIC for page load
    if (bookshelvesDict.length < 1 && bookshelfIDArr.length < 1)
        return <div></div>;

    //JSX
    return (
        <>
            <div className="bookshelf_page_outer">
                <div className="bookshelf_page_title">My Bookshelves </div>
            </div>
            <div className="bookshelf_page_outer julie_container">
                <div className="bookshelf_page_inner1">
                    <div className="bookshelf_page_subTitleOuter">
                        <div className="bookshelf_page_subTitle">Bookshelves </div>
                        <div
                            // this is the edit bookshelves button, it untoggles anything else that might be open
                            //*note -- untoggling anything else when opening something new is a super common JIC pattern in my code for onClicks
                            onClick={() => {
                                setToggleAddButton(true);
                                setToggleEdit(!toggleEdit);
                                setShelfName("");
                                setBookEditID(false);
                                return;
                            }}
                            className="bookshelf_page_subEdit"
                        >
                            (Edit)
                        </div>
                    </div>
                    <div
                        className={
                            shelfID
                                ? "bookshelf_page_shelfName bookshelf_page_shelfNameAll"
                                : "bookshelf_page_shelfName bookshelf_page_shelfNameAll ben_underline"
                        }
                        onClick={() => {
                            setToggleEdit(false);
                            //notice how when clicking all, shelf ID does not become the shelf's ID...because all is not a shelf
                            //the pseudo 'all' shelf relies on shelfID being false, and the bookIDarr being generated to render properly
                            setShelfID(false);
                            setBookEditID(false);
                            return;
                        }}
                    >
                        All ({bookIDArr.length})
                    </div>
                    <div className="bookshelf_page_defaultArr">
                        {/* generating the default arr left aligned list */}
                        {defaultArr.map((shelf) => (
                            <div key={shelf.id}>
                                <div
                                    className={
                                        shelfID !== shelf.id
                                            ? "bookshelf_page_shelfName bookshelf_page_shelfNameDec"
                                            : "bookshelf_page_shelfName bookshelf_page_shelfNameDec ben_underline"
                                    }
                                    onClick={() => {
                                        setToggleEdit(false);
                                        setShelfID(shelf.id);
                                        setBookEditID(false);
                                        return;
                                    }}
                                >
                                    {shelf.name} ({shelf.books.length})
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bookshelf_page_customArr">
                        {/* generating the custom arr left aligned list */}
                        {customArr[0] !== 1 &&
                            customArr.map((shelf) => (
                                <div key={shelf.id}>
                                    <div
                                        onClick={() => {
                                            setToggleEdit(false);
                                            setShelfID(shelf.id);
                                            setBookEditID(false);
                                            return;
                                        }}
                                        className={
                                            shelfID !== shelf.id
                                                ? "bookshelf_page_shelfName bookshelf_page_shelfNameDec"
                                                : "bookshelf_page_shelfName bookshelf_page_shelfNameDec ben_underline"
                                        }
                                    >
                                        {shelf.name} ({shelf.books.length})
                                    </div>
                                </div>
                            ))}
                        {/* here is the contiondal rendering for the add bookshelf button VS the add bookshelf form */}
                        {toggleAddButton && (
                            <div
                                onClick={() => {
                                    setToggleRename(false);
                                    setToggleAddButton(false);
                                    setBookEditID(false);
                                    return;
                                }}
                                className="bookshelf_page_addShelfButton"
                            >
                                {" "}
                                Add shelf
                            </div>
                        )}
                        {!toggleAddButton && (
                            <>
                                <form
                                    className="bookshelf_page_addShelfForm"
                                    onSubmit={handleAddShelfSubmit}
                                >
                                    <div>
                                        <div className="bookshelf_page_addShelfFormTitle">
                                            Add a Shelf:
                                        </div>
                                        <input
                                            id="addShelfName"
                                            type="text"
                                            value={shelfName}
                                            onChange={(e) => setShelfName(e.target.value)}
                                            required
                                            maxLength={20}
                                            minLength={2}
                                        />
                                    </div>
                                    <button className="bookshelf_page_submitShelfButton">
                                        {" "}
                                        add
                                    </button>
                                    <div
                                        // this div is just an x to close out the form
                                        onClick={() => {
                                            setShelfName("");
                                            setToggleAddButton(true);
                                            setShelfName("");
                                            return;
                                        }}
                                        className="bookshelf_page_XaddShelf"
                                    >
                                        X
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
                {/* here begins some too complex conditional rendering */}
                {/* the toggle edit state var is used to know when to render the bookshelf edit page versus just the list of books */}
                {/* the shelfID is used to know what books to render when clicking on a bookshelf */}
                {!toggleEdit && (
                    <div className="bookshelf_page_inner2">
                        {/* since this is rendering when shelfID is false, we know that this rendering must be for the "all" pseudo bookshelf  */}
                        {!shelfID &&
                            bookIDArr?.map((id) => (
                                //**IMPORTANT** this is a repeated div
                                //This div should be refactored into a component, because it is in the All section
                                //and it is repeated  in the not ALL section
                                <div
                                    className="bookshelf_page_outerImage"
                                    key={booksDict[Number(id)]?.image_url}
                                >
                                    <div
                                        onClick={() => {
                                            //this onClick logic is so that you can toggle the book-to-bookshelf edit form by repeatedly clicking
                                            setToggleAddButton(true);
                                            if (bookEditID === id) {
                                                setBookEditID(false);
                                            } else {
                                                setBookEditID(id);
                                            }

                                            //this is where the inital bookshelfIDARR is generated so that the form can be default filled properly
                                            let arr = genShelfIDArr(id);
                                            setBookshelfIDArr(arr);
                                            return;
                                        }}
                                        className="bookshelf_page_imageEdit"
                                    >
                                        edit
                                    </div>

                                    {/* if a user has clicked the book-to-bookshelf edit button, now the form will open */}
                                    {bookEditID === id && (
                                        <form
                                            className="bookshelf_page_bookEditForm"
                                            onSubmit={(e) => {
                                                // console.log(id);
                                                handleBookEdit(e, id);
                                                return;
                                            }}
                                        >
                                            <div className="bookshelf_page_bookEditShelves">
                                                Shelves
                                            </div>
                                            {/* map through the custom arrays to generate form inputs */}
                                            {/* NOTE - these are all checkboxes since a book can be in multiple custom shelves */}
                                            {customArr.map((shelf) => (
                                                <div className="bookshelf_page_bookInputWrapDiv">
                                                    <label
                                                        className="bookshelf_page_bookLabel"
                                                        for={`${shelf.name}${shelf.id}`}
                                                    >
                                                        {shelf.name}
                                                    </label>
                                                    <input
                                                        className="bookshelf_page_bookCheck"
                                                        type="checkbox"
                                                        id={`${shelf.name}${shelf.id}`}
                                                        //not using the bookshelfID array per say, but same logic to decide to defaultCheck
                                                        defaultChecked={
                                                            shelf.books.includes(id) ? "checked" : ""
                                                        }
                                                        onChange={() => {
                                                            //**IMPORTANT** the checkbox and radio buttons are NOT technically controlled inputs
                                                            //what is shown on them is really just a visual for the user
                                                            //what is really important is that when the user makes a change and toggles the input
                                                            //the onChange looks inside of bookshelfIDArr
                                                            //and decides whether it needs to take the shelfID out or put it in
                                                            //the visual aspect of the input REFLECTS this change BUT IS NOT tracking this change in its value
                                                            if (bookshelfIDArr.includes(shelf.id)) {
                                                                let tempArr = [...bookshelfIDArr];
                                                                let finalArr = [];
                                                                for (let id of tempArr) {
                                                                    if (id !== shelf.id) {
                                                                        finalArr.push(id);
                                                                    }
                                                                }
                                                                setBookshelfIDArr(finalArr);
                                                            } else {
                                                                setBookshelfIDArr([
                                                                    ...bookshelfIDArr,
                                                                    shelf.id,
                                                                ]);
                                                            }
                                                        }}
                                                    ></input>
                                                </div>
                                            ))}
                                            <div className="bookshelf_page_bookEditStatus">
                                                Status
                                            </div>
                                            {/* map through the default arrays to generate form inputs */}
                                            {/* NOTE - these are all radios since a book can be in only one default shelf at a time */}
                                            {defaultArr.map((shelf) => (
                                                <div className="bookshelf_page_bookInputWrapDiv bookshelf_page_bookInputWrapDivBot">
                                                    <label
                                                        className="bookshelf_page_bookLabel"
                                                        for={`${shelf.name}${shelf.id}`}
                                                    >
                                                        {shelf.name}
                                                    </label>
                                                    <input
                                                        className="bookshelf_page_bookRadio"
                                                        type="radio"
                                                        id={`${shelf.name}${shelf.id}`}
                                                        name="defaultRadio"
                                                        defaultChecked={
                                                            shelf.books.includes(id) ? "checked" : ""
                                                        }
                                                        onChange={() => {
                                                            //read the IMPORTANT note above
                                                            //major difference is that there is only a single action
                                                            //every defaultID is taken out to start with
                                                            //then the one seleected is put back in
                                                            //this is very explicit so that there can never be more than one defaultShelfID
                                                            //in the all important bookshelfIDArr
                                                            let tempArr = [...bookshelfIDArr];
                                                            let finalArr = [];
                                                            for (let id of tempArr) {
                                                                if (!defaultIDArr.includes(id)) {
                                                                    finalArr.push(id);
                                                                }
                                                            }
                                                            finalArr.push(shelf.id);
                                                            setBookshelfIDArr(finalArr);
                                                        }}
                                                    ></input>
                                                </div>
                                            ))}
                                            {/* submits form to run the handle func */}
                                            <button className="bookshelf_page_bookSave">Save</button>
                                        </form>
                                    )}
                                    <img
                                        //redirect to book specific page
                                        onClick={() => spotIDredirect(id)}
                                        className="bookshelf_page_img"
                                        src={
                                            booksDict[Number(id)]?.image_url
                                                ? booksDict[Number(id)].image_url
                                                : "https://i.ibb.co/rQ7cKJC/5107.png"
                                        }
                                        alt="cover"
                                    />
                                </div>
                            ))}
                        {customArr[0] !== 1 && !shelfID && bookIDArr?.length === 0 && (
                            //this is for the All render (since its !shelfID) and it only renders if the user has no books
                            <div className="bookshelf_page_noMatch">No matching items!</div>
                        )}
                        {/* since this is rendering when shelfID is an actual shelfID,   */}
                        {/* this rendering must NOT be for the "all" pseudo bookshelf  */}
                        {/* this is the rendering for each of the other clicked bookshelves */}
                        {/* keying into the bookshelvesDict based on shelfID is how it knows which books to render */}
                        {shelfID &&
                            bookshelvesDict[shelfID]?.books?.map((id) => (
                                //REPEAT OF UPPER DIV READ THE NOTES THERE FOR EXPLANATION
                                <div
                                    className="bookshelf_page_outerImage"
                                    key={booksDict[Number(id)]?.image_url}
                                >
                                    <div
                                        onClick={() => {
                                            setToggleAddButton(true);
                                            if (bookEditID === id) {
                                                setBookEditID(false);
                                            } else {
                                                setBookEditID(id);
                                            }

                                            let arr = genShelfIDArr(id);
                                            setBookshelfIDArr(arr);

                                            return;
                                        }}
                                        className="bookshelf_page_imageEdit"
                                    >
                                        edit
                                    </div>
                                    {bookEditID === id && (
                                        <form
                                            className="bookshelf_page_bookEditForm"
                                            onSubmit={(e) => {
                                                // console.log(id);
                                                handleBookEdit(e, id);
                                                return;
                                            }}
                                        >
                                            <div className="bookshelf_page_bookEditShelves">
                                                Shelves
                                            </div>
                                            {customArr.map((shelf) => (
                                                <div className="bookshelf_page_bookInputWrapDiv">
                                                    <label
                                                        className="bookshelf_page_bookLabel"
                                                        for={`${shelf.name}${shelf.id}`}
                                                    >
                                                        {shelf.name}
                                                    </label>
                                                    <input
                                                        className="bookshelf_page_bookCheck"
                                                        type="checkbox"
                                                        id={`${shelf.name}${shelf.id}`}
                                                        defaultChecked={
                                                            shelf.books.includes(id) ? "checked" : ""
                                                        }
                                                        onChange={() => {
                                                            if (bookshelfIDArr.includes(shelf.id)) {
                                                                let tempArr = [...bookshelfIDArr];
                                                                let finalArr = [];
                                                                for (let id of tempArr) {
                                                                    if (id !== shelf.id) {
                                                                        finalArr.push(id);
                                                                    }
                                                                }
                                                                setBookshelfIDArr(finalArr);
                                                            } else {
                                                                setBookshelfIDArr([
                                                                    ...bookshelfIDArr,
                                                                    shelf.id,
                                                                ]);
                                                            }
                                                        }}
                                                    ></input>
                                                </div>
                                            ))}
                                            <div className="bookshelf_page_bookEditStatus">
                                                Status
                                            </div>
                                            {defaultArr.map((shelf) => (
                                                <div className="bookshelf_page_bookInputWrapDiv bookshelf_page_bookInputWrapDivBot">
                                                    <label
                                                        className="bookshelf_page_bookLabel"
                                                        for={`${shelf.name}${shelf.id}`}
                                                    >
                                                        {shelf.name}
                                                    </label>
                                                    <input
                                                        className="bookshelf_page_bookRadio"
                                                        type="radio"
                                                        id={`${shelf.name}${shelf.id}`}
                                                        name="defaultRadio"
                                                        defaultChecked={
                                                            shelf.books.includes(id) ? "checked" : ""
                                                        }
                                                        onChange={() => {
                                                            let tempArr = [...bookshelfIDArr];
                                                            let finalArr = [];
                                                            for (let id of tempArr) {
                                                                if (!defaultIDArr.includes(id)) {
                                                                    finalArr.push(id);
                                                                }
                                                            }
                                                            finalArr.push(shelf.id);
                                                            setBookshelfIDArr(finalArr);
                                                        }}
                                                    ></input>
                                                </div>
                                            ))}
                                            <button className="bookshelf_page_bookSave">Save</button>
                                        </form>
                                    )}
                                    <img
                                        onClick={() => spotIDredirect(id)}
                                        className="bookshelf_page_img"
                                        src={
                                            booksDict[Number(id)]?.image_url
                                                ? booksDict[Number(id)].image_url
                                                : "https://i.ibb.co/rQ7cKJC/5107.png"
                                        }
                                        alt="cover"
                                    />
                                </div>
                            ))}
                        {shelfID && bookshelvesDict[shelfID].books?.length === 0 && (
                            <div className="bookshelf_page_noMatch">No matching items!</div>
                        )}
                    </div>
                )}

                {/* this only renders when the (edit) button to edit a bookshelf has been clicked */}
                {toggleEdit && (
                    <div className="bookshelf_page_editInner2">
                        {/* if there are no bookshelves, then you get a nice message */}
                        {customArr[0] !== 1 && customArr.length === 0 && (
                            <div className="bookshelf_page_noMatch">
                                No custom bookshelves!
                            </div>
                        )}
                        {/* if there are bookshelvess, render them */}
                        {customArr.map((shelf) => (
                            <div key={shelf.id} className="bookshelf_page_editWrap">
                                <div
                                    //this subtle DIV is actually the entire delete crud
                                    onClick={() => handleDeleteShelf(shelf.id)}
                                    className="bookshelf_page_delete"
                                >
                                    X
                                </div>

                                {/* this is a very similar render to the shelfID */}
                                {/* by matching a state variable ID that tracks what shelf rename DIV is clicked
                                to each of the mapped shelves */}
                                {/* it knows which rename form to open when the rename button is clicked */}
                                {toggleRename !== shelf.id && (
                                    <div className="bookshelf_page_editShelfName">
                                        {shelf.name} ({shelf.books.length})
                                    </div>
                                )}
                                {toggleRename !== shelf.id && (
                                    <div
                                        onClick={() => {
                                            setToggleAddButton(true);
                                            setShelfName("");
                                            setToggleRename(shelf.id);
                                            return;
                                        }}
                                        className="bookshelf_page_editRename"
                                    >
                                        {" "}
                                        rename
                                    </div>
                                )}
                                {toggleRename == shelf.id && (
                                    <div className="bookshelf_page_renameFormOuter">
                                        <form
                                            className="bookshelf_page_renameShelfForm"
                                            onSubmit={(e) => handleRenameShelfSubmit(e, shelf.id)}
                                        >
                                            <div>
                                                <input
                                                    //this is a normal controlled component
                                                    id="renameShelfName"
                                                    type="text"
                                                    value={renameShelfName}
                                                    onChange={(e) => setRenameShelfName(e.target.value)}
                                                    required
                                                    maxLength={20}
                                                    minLength={2}
                                                    placeholder={shelf.name}
                                                />
                                            </div>
                                            <button className="bookshelf_page_submitRenameShelfButton">
                                                {" "}
                                                Save
                                            </button>
                                            <div
                                                onClick={() => {
                                                    setRenameShelfName("");
                                                    setToggleRename(false);
                                                    return;
                                                }}
                                                className="bookshelf_page_XRenameShelf"
                                            >
                                                Cancel
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div
                            onClick={() => {
                                setShelfID(false);
                                setToggleEdit(false);
                                setToggleRename(false);
                                setRenameShelfName("");
                            }}
                            className="bookshelf_page_editDone"
                        >
                            I'm Done
                        </div>
                    </div>
                )}
            </div>
            <div className="bookshelves-page-footer">
                <div className="bookshelves-page-footer-container">
                    <div className="bookshelves-page-footer-column-1">
                        <h2 className="bookshelves-page-footer-heading">INSPIRED BY</h2>
                        <a
                            className="bookshelves-page-column-1-goodreads"
                            href="https://www.goodreads.com/"
                        >
                            goodreads
                        </a>
                    </div>
                    <div className="bookshelves-page-footer-column-2">
                        <h2 className="bookshelves-page-footer-heading">WORK WITH US</h2>
                        <a
                            className="bookshelves-page-column-2-name"
                            href="https://github.com/ARGON90"
                        >
                            Alex Gonglach
                        </a>
                        <a
                            className="bookshelves-page-column-2-name"
                            href="https://github.com/benwaldee"
                        >
                            Ben Waldee
                        </a>
                        <a
                            className="bookshelves-page-column-2-name"
                            href="https://github.com/julieyj"
                        >
                            Julie Jung
                        </a>
                        <a
                            className="bookshelves-page-column-2-name"
                            href="https://github.com/jvstinejvng"
                        >
                            Justine Jang
                        </a>
                    </div>
                    <div className="bookshelves-page-footer-column-3">
                        <h2 className="bookshelves-page-footer-heading">SOURCE CODE</h2>
                        <a
                            className="bookshelves-page-column-3-github"
                            href="https://github.com/ARGON90/BadReads"
                        >
                            Github Repository
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Bookshelves;
