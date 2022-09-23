import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooksThunk } from "../store/booksAlex";
import CreateBookModal from "./CreateBookModal";
import EditBookModal from "./EditBookModal";
import DeleteBookModal from "./DeleteBookModal";
import "./CSS/UserBooks.css";

const UserBooks = () => {
  // console.log("INSIDE USER BOOKS COMPONENT");
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const filterResponse = (books) => {
    return currentUser
      ? books
        .filter((book) => book.user_id === currentUser["id"])
        .sort((a, b) => b.id - a.id)
      : history.push("/");
  };

  const currentUser = useSelector((state) => state?.session?.user);
  const booksList = useSelector((state) => Object.values(state?.books));
  const filteredBookList = filterResponse(booksList);

  useEffect(() => {
    dispatch(getAllBooksThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="my-books-page-outer">
        <div className="my-books-page-container">
          <div className="my-books-page-header-container">
            <div className="my-books-page-title">My Books</div>
            <div className="my-books-page-create-button-container">
              <CreateBookModal />
            </div>
          </div>
          <div className="my-books-page-separator"></div>
          <div className="my-books-page-books-item-container">
            {isLoaded &&
              currentUser &&
              filteredBookList?.length > 0 &&
              filteredBookList?.map((userBook, index) => (
                <div className="my-books-page-book-item" key={index}>
                  <NavLink to={`/books/${userBook.id}`}>
                    <img
                      className="my-books-page-book-cover"
                      src={userBook.image_url}
                      alt="bookcover"
                      style={{ height: "200px" }}
                    />
                  </NavLink>
                  <div className="my-books-page-buttons-container">
                    <div className="my-books-page-edit-button-container">
                      <EditBookModal userBook={userBook} />
                    </div>
                    <div className="my-books-page-delete-button-container">
                      <DeleteBookModal userBook={userBook} />
                    </div>
                  </div>
                </div>
              ))}
            {isLoaded && currentUser && !filteredBookList?.length && (
              <div className="my-books-page-books-item-empty-container">
                <div className="my-books-page-empty-container-image">
                  <img
                    src="https://d15be2nos83ntc.cloudfront.net/images/404.png"
                    alt="no-books"
                    style={{ width: "470px" }}
                  />
                </div>
                <div className="my-books-page-empty-container-message">
                  You have not added any books to BadReads yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoaded && filteredBookList?.length > 0 && (
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
      )}
      {isLoaded && !filteredBookList?.length && (
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
      )}
    </>
  );
};

export default UserBooks;
