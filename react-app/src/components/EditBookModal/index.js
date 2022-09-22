import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBookForm from "./EditBookForm";
import "./EditBookModal.css";

function EditBookModal({ userBook }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-book-container">
        <button
          className="edit-book-button"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditBookForm setShowModal={setShowModal} userBook={userBook} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default EditBookModal;
