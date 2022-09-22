import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteBookForm from "./DeleteBookForm";
import "./DeleteBookModal.css";

function DeleteBookModal({ userBook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="delete-book-container">
        <button className="delete-book-button" onClick={() => setShowModal(true)}>
          Delete
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
