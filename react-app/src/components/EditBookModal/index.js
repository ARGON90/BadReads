import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditBookForm from "./EditBookForm";
import "./EditBookModal.css";

function EditBookModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-book-container">
        <button
          className="create-book-button"
          onClick={() => setShowModal(true)}
        >
          Edit Book
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditBookForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default EditBookModal;
