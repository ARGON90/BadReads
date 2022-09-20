import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBookForm from "./DeleteBookForm";
import "./DeleteBookModal.css";

function DeleteBookModal({ userBook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-book-container">
        <button className="edit-book-button" onClick={() => setShowModal(true)}>
          Delete Book
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteBookForm setShowModal={setShowModal} userBook={userBook} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default DeleteBookModal;
