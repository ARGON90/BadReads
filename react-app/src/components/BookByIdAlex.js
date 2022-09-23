import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllBooksThunk } from '../store/booksAlex';
import { updateLibraryThunk, getUserBookshelvesThunk } from '../store/bookshelvesRed';
import { getAllReviewsThunk } from '../store/reviews';
import Reviews from './Reviews';

import "./CSS/Reviews.css"

const BookById = () => {
  // console.log('INSIDE BOOKS BY ID COMPONENT')
  const { id } = useParams()
  const dispatch = useDispatch();
  const booksDict = useSelector((state) => (state?.books))
  const booksArray = useSelector((state) => Object.values(state?.books))
  const singleBook = booksDict[id]
  const reviewsArray = useSelector((state) => Object.values(state?.reviews))
  const reviewsByBookId = reviewsArray.filter(review => review.book_id === Number(id))
  const [display, setDisplay] = useState('landing')
  const currentUser = useSelector((state) => (state?.session?.user))

  const bookIdArray = []
  booksArray.map((books) => bookIdArray.push(books.id))
  // console.log(bookIdArray.includes(Number(id)), 'TRUE OR FALSE>>')


  useEffect(() => {
    // console.log('BOOKS BY ID USE EFFECT')
    dispatch(getUserBookshelvesThunk())
    dispatch(getAllBooksThunk())
    dispatch(getAllReviewsThunk())
  }, [dispatch])

  let allStarRatings = [];
  reviewsByBookId.forEach((review) => allStarRatings.push(review.stars))
  const allStarsSum = allStarRatings.reduce((prev, curr) => prev + curr, 0);
  let avgStarRating = parseFloat(allStarsSum / allStarRatings.length)

  const [dropToggle, setDropToggle] = useState(false)
  const bookshelvesDict = useSelector((state) => (state?.bookshelves?.userBookshelves))
  const [bookshelfIDArr, setBookshelfIDArr] = useState([])

  if (currentUser == null) {
    return null
  }

  const currentUserId = currentUser.id
  const reviewOfCurrentUser = reviewsByBookId.filter(review => review.user_id == currentUserId)
  const currentUserRating = reviewOfCurrentUser[0]?.stars

  function currentUserStarRating() {
    if (currentUserRating > 0) {
      return (
        <div className='alex_merriweather_300 alex_font_16'>Your Rating: {currentUserRating}/5</div>
      )
    }
  }

  // import from bookshelves
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
    // console.log('USERSHELVES', userShelves)
    // console.log('GEN SHELF ID ARR', genShelfIDArr)
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

  if (booksArray.length < 1) return (
    <div className='alex_flex_row alex_justify_center alex_pad_top_35'>
      <div className='alex_merriweather_300 alex_font_16 alex_bold' >Loading All Books...</div>
    </div>
  )
  if (!bookIdArray.includes(Number(id)))
    return (
      <>
        <div className="alex_flex_column alex_align_center alex_pad_top_35 julie_outer_div_404">
          <div className="alex_review_page_title alex_pad_bottom_10">
            We couldn't find the book you were looking for...
          </div>
          <img
            className="alex-404-image "
            src="https://i.imgur.com/Ou7Pk4P.jpg"
            alt="page not found"
          />
          <div className="alex_flex_row alex_pad_top_10 ">
            <div className="alex_merriweather_300 alex_font_16 alex_bold alex_margin_right_3">
              Want to add a banned book to the site? Create one
            </div>
            <NavLink className={"alex_text_deco_none"} to="/my-books">
              <div className="alex_merriweather_300 alex_font_16 alex_bold alex_font_green">
                here!
              </div>
            </NavLink>
          </div>
        </div>
        <div className="single-book-page-footer">
          <div className="single-book-page-footer-container">
            <div className="single-book-page-footer-column-1">
              <h2 className="single-book-page-footer-heading">
                INSPIRED BY
              </h2>
              <a
                className="single-book-page-column-1-goodreads"
                href="https://www.goodreads.com/"
              >
                goodreads
              </a>
            </div>
            <div className="single-book-page-footer-column-2">
              <h2 className="single-book-page-footer-heading">
                WORK WITH US
              </h2>
              <a
                className="single-book-page-column-2-name"
                href="https://github.com/ARGON90"
              >
                Alex Gonglach
              </a>
              <a
                className="single-book-page-column-2-name"
                href="https://github.com/benwaldee"
              >
                Ben Waldee
              </a>
              <a
                className="single-book-page-column-2-name"
                href="https://github.com/julieyj"
              >
                Julie Jung
              </a>
              <a
                className="single-book-page-column-2-name"
                href="https://github.com/jvstinejvng"
              >
                Justine Jang
              </a>
            </div>
            <div className="single-book-page-footer-column-3">
              <h2 className="single-book-page-footer-heading">
                SOURCE CODE
              </h2>
              <a
                className="single-book-page-column-3-github"
                href="https://github.com/ARGON90/BadReads"
              >
                Github Repository
              </a>
            </div>
          </div>
        </div>
      </>
    );




  return (
    <>
      {/* PAGE CONTAINER DIV */}
      <div className="alex_flex_column alex_row_gap_10 julie_outer_div">
        {/* BOOK BY ID DIV */}
        <div className="alex_flex_row alex_justify_center alex_pad_top_35 julie_inner_container">
          {/* LEFT PANEL */}
          <div className="alex_flex_column  alex_row_gap_10 alex_align_center ben_merge_bookDiv_left">
            <div className="alex-image-size">
              <img
                src={singleBook.image_url}
                alt="Cover"
                className="alex-image-fill"
              />
            </div>

            <div className="alex_bookshelf_div ben_bookWrap_bookId">
              <button
                onClick={() => {
                  setDropToggle((dropToggle) => !dropToggle);
                  let arr = genShelfIDArr(id);
                  // console.log("ARR", arr);
                  setBookshelfIDArr(arr);
                  // console.log("BOOKSHELF ID ARRAY", bookshelfIDArr);
                  return;
                }}
                id="alex_bookshelf_button"
              >
                Add to Bookshelf
              </button>
            </div>
            {dropToggle && (
              <form
                className="bookshelf_page_bookEditForm "
                onSubmit={(e) => {
                  // console.log(id);
                  handleBookEdit(e, id);
                  return;
                }}
              >
                <div className="bookshelf_page_bookEditShelves">Shelves</div>
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
                        shelf.books.includes(Number(id)) ? "checked" : ""
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
                          setBookshelfIDArr([...bookshelfIDArr, shelf.id]);
                        }
                      }}
                    ></input>
                  </div>
                ))}
                <div className="bookshelf_page_bookEditStatus">Status</div>
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
                        shelf.books.includes(Number(id)) ? "checked" : ""
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
          </div>
          <div className="alex_margin_right_20"></div>
          {/* RIGHT PANEL */}
          <div className="alex_flex_column alex_row_gap_10 alex_width_450">
            <div className="alex_review_page_title alex_margin_remove">
              {singleBook.title}{" "}
            </div>
            <div className="alex_merriweather_300 alex_font_16">
              by {singleBook.author}
            </div>
            {reviewsByBookId.length > 0 ? (
              <div>
                <div className="alex_merriweather_300 alex_font_16">
                  Average Rating: {avgStarRating.toFixed(2)}/5
                </div>
                <div className="alex_merriweather_300 alex_font_16">
                  {currentUserStarRating()}
                </div>
              </div>
            ) : (
              <div className="alex_merriweather_300 alex_font_14">
                This book hasn't been rated yet
              </div>
            )}

            {display === "landing" ? (
              <div>
                <div className="alex_merriweather_300 alex_font_14 alex_bold">
                  Why was it banned?
                </div>
                <div className="alex_merriweather_300 alex_font_14">
                  {singleBook.banned}
                </div>
                <br></br>
                <div className="alex_merriweather_300 alex_font_14 alex_border_bottom alex_pad_bottom_5">
                  {singleBook.description}
                </div>
                <br></br>
              </div>
            ) : null}

            <Reviews
              display={display}
              setDisplay={setDisplay}
              dropToggle={dropToggle}
              setDropToggle={setDropToggle}
            />
          </div>
        </div>
      </div>
      <div className="single-book-page-footer">
        <div className="single-book-page-footer-container">
          <div className="single-book-page-footer-column-1">
            <h2 className="single-book-page-footer-heading">INSPIRED BY</h2>
            <a
              className="single-book-page-column-1-goodreads"
              href="https://www.goodreads.com/"
            >
              goodreads
            </a>
          </div>
          <div className="single-book-page-footer-column-2">
            <h2 className="single-book-page-footer-heading">WORK WITH US</h2>
            <a
              className="single-book-page-column-2-name"
              href="https://github.com/ARGON90"
            >
              Alex Gonglach
            </a>
            <a
              className="single-book-page-column-2-name"
              href="https://github.com/benwaldee"
            >
              Ben Waldee
            </a>
            <a
              className="single-book-page-column-2-name"
              href="https://github.com/julieyj"
            >
              Julie Jung
            </a>
            <a
              className="single-book-page-column-2-name"
              href="https://github.com/jvstinejvng"
            >
              Justine Jang
            </a>
          </div>
          <div className="single-book-page-footer-column-3">
            <h2 className="single-book-page-footer-heading">SOURCE CODE</h2>
            <a
              className="single-book-page-column-3-github"
              href="https://github.com/ARGON90/BadReads"
            >
              Github Repository
            </a>
          </div>
        </div>
      </div>
      {/* <div className='footerBookID'>
            <div className="footerMainDiv">
                <div className='footerContainerDiv'>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>INSPIRED BY</h2>
                        <a href="https://www.goodreads.com/">goodreads</a>
                    </div>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>WORK WITH US</h2>
                        <a href="https://github.com/ARGON90">Alex Gonglach</a>
                        <a href="https://github.com/benwaldee">Ben Waldee</a>
                        <a href="https://github.com/julieyj">Julie Jung</a>
                        <a href="https://github.com/jvstinejvng">Justine Jang</a>
                    </div>
                    <div className='footerColumn'>
                        <h2 className='footerColumnTitle'>SOURCE CODE</h2>
                        <a href="https://github.com/ARGON90/BadReads">Github Repository</a>
                    </div>
                </div>
            </div>
            </div> */}
    </>
  );
}

export default BookById;
