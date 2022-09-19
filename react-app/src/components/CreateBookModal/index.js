import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateBookForm from "./CreateBookForm";
import './CreateBookModal.css'

function CreateBookModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-book-container">
        <button className="create-book-button" onClick={() => setShowModal(true)}>
          Add a Book
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateBookForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default CreateBookModal;
