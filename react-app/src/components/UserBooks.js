import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk } from "../store/booksAlex";
import { getAllReviewsThunk } from "../store/reviews";
import CreateBookModal from "./CreateBookModal";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import "./CSS/UserBooks.css";

const UserBooks = () => {
  console.log("INSIDE USER BOOKS COMPONENT");

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector((state) => state?.session?.user);
  const booksList = useSelector((state) => Object.values(state?.books));
  const reviewsList = useSelector((state) => Object.values(state?.reviews));

  useEffect(() => {
    dispatch(getAllBooksThunk()).then(() => setIsLoaded(true));
    dispatch(getAllReviewsThunk());
  }, [dispatch]);

  if (currentUser == null) {
    return null;
  }

  const userBooks = booksList.filter(
    (book) => book.user_id === currentUser["id"]
    );

  const userReviews = reviewsList.filter(
    (reviews) => reviews.user_id === currentUser["id"]
    );

  console.log(userBooks)
  console.log(userReviews)

  const sortedUserBooks = userBooks.sort((a, b) => b.id - a.id);

  if (!isLoaded) return null;

  return (
    <>
      {isLoaded && currentUser && userBooks && userReviews && (
        <div className="my-books-page-outer">
          <div className="my-books-page-container">
            <div className="my-books-page-header-container">
              <div className="my-books-page-title">My Books</div>
              <div className="my-books-page-create-button-container">
                <CreateBookModal />
              </div>
            </div>
            <div className="my-books-page-separator"></div>
            <table className="my-books-page-books-table">
              <tr className="my-books-page-table-row-header">
                <th className="my-books-pager-table-header-cover">cover</th>
                <th className="my-books-pager-table-header-title">title</th>
                <th className="my-books-pager-table-header-author">author</th>
                <th className="my-books-pager-table-header-avg-ratings">
                  avg rating
                </th>
                <th className="my-books-pager-table-header-user-rating">
                  your rating
                </th>
                <th className="my-books-pager-table-header-shelves">shelves</th>
                <th className="my-books-pager-table-header-create-review">
                  review
                </th>
                <th className="my-books-pager-table-header-buttons"></th>
                <th className="my-books-pager-table-header-buttons"></th>
              </tr>
              {userBooks?.map((userBook, index) => (
                <tr
                  className="my-books-page-table-book-row"
                  key={index}
                  style={{
                    verticalAlign: "top",
                    fontSize: "14px",
                    color: "#00635d",
                  }}
                >
                  <NavLink to={`/books/${userBook.id}`}>
                    <td className="my-books-page-book-cover-container">
                      <img
                        className="my-books-page-book-cover"
                        src={userBook.image_url}
                        alt="bookcover"
                        style={{ width: "50px" }}
                      />
                    </td>
                  </NavLink>
                  <td className="my-books-page-title-container">
                    {userBook.title}
                  </td>
                  <td className="my-books-page-author-container">
                    {userBook.author}
                  </td>
                  <td className="my-books-page-avg-ratings-container"></td>
                  <td className="my-books-page-user-rating-container"></td>
                  <td className="my-books-page-shelves-container"></td>
                  <td className="my-books-page-create-review-link-container">
                    <NavLink to={`/books/${userBook.id}`}>
                      Write or edit a review
                    </NavLink>
                  </td>
                  <td
                    className="my-books-page-edit-container"
                    style={{ textAlign: "right" }}
                  >
                    <EditBookModal userBook={userBook} />
                  </td>
                  <td className="my-books-page-delete-container">
                    <DeleteBookModal userBook={userBook} />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
      <div className="my-books-page-footer">
        <div className="my-books-page-footer-container">
          <div className="my-books-page-footer-column-1">
            <h2 className="my-books-page-footer-heading">INSPIRED BY</h2>
            <a
              className="my-books-page-column-1-goodreads"
              href="https://www.goodreads.com/"
            >
              goodreads
            </a>
          </div>
          <div className="my-books-page-footer-column-2">
            <h2 className="my-books-page-footer-heading">WORK WITH US</h2>
            <a
              className="my-books-page-column-2-name"
              href="https://github.com/ARGON90"
            >
              Alex Gonglach
            </a>
            <a
              className="my-books-page-column-2-name"
              href="https://github.com/benwaldee"
            >
              Ben Waldee
            </a>
            <a
              className="my-books-page-column-2-name"
              href="https://github.com/julieyj"
            >
              Julie Jung
            </a>
            <a
              className="my-books-page-column-2-name"
              href="https://github.com/jvstinejvng"
            >
              Justine Jang
            </a>
          </div>
          <div className="my-books-page-footer-column-3">
            <h2 className="my-books-page-footer-heading">SOURCE CODE</h2>
            <a
              className="my-books-page-column-3-github"
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

export default UserBooks;
