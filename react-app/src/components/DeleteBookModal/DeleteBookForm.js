import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBooksThunk, deleteBook } from "../../store/booksAlex";

const DeleteBookForm = ({ setShowModal, userBook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const book = useSelector((state) => state?.books[userBook.id]);
  console.log("userBook", userBook);

  const [bookId] = useState(userBook?.id);

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedBook = await dispatch(deleteBook(userBook.id));

    if (deletedBook) {
      console.log(`Successfully deleted bookId: ${userBook.id}`);
      history.push("/my-books");
    }
  };

  return (
    <>
      <div className="delete-book-form">
        <div className="delete-book-form-title">Are you sure?</div>
        <div className="delete-book-modal-body">
          <button className="delete-book-form-delete-button" onClick={handleDelete}>
            Delete Book
          </button>
          <button className="delete-book-form-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default DeleteBookForm;
