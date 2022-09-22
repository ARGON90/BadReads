import React, { useEffect } from "react";
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
  const currentUser = useSelector((state) => state?.session?.user);
  const booksList = useSelector((state) => Object.values(state?.books));
  const reviewsList = useSelector((state) => Object.values(state?.reviews));

  useEffect(() => {
    dispatch(getAllBooksThunk());
    dispatch(getAllReviewsThunk());
  }, [dispatch]);

  if (currentUser == null) {
    console.log("currentUser == null conditional");
    return null;
  }

  const userBooks = booksList.filter(
    (book) => book.user_id === currentUser["id"]
    );

  const userReviews = reviewsList.filter(
    (reviews) => reviews.user_id === currentUser["id"]
    );

    console.log('****', userReviews)

  return (
    <>
      {currentUser && userBooks && userReviews && (
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
                <th className="my-books-pager-table-header-avg-ratings">avg rating</th>
                <th className="my-books-pager-table-header-user-rating">your rating</th>
                <th className="my-books-pager-table-header-shelves">shelves</th>
                <th className="my-books-pager-table-header-create-review">review</th>
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
                    <NavLink to={`/books/${userBook.id}`}>Write or edit a review</NavLink>
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
    </>
  );
};

export default UserBooks;
