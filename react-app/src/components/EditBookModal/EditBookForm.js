import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBooksThunk, updateBook } from "../../store/booksAlex";

const EditBookForm = ({ setShowModal, userBook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const book = useSelector((state) => state?.books[userBook.id]);
  console.log('userBook', userBook)

  const [errors, setErrors] = useState([]);
  const [bookId] = useState(userBook?.id);
  const [title, setTitle] = useState(userBook?.title);
  const [year, setYear] = useState(userBook?.year);
  const [author, setAuthor] = useState(userBook?.author);
  const [description, setDescription] = useState(userBook?.description);
  const [imageUrl, setImageUrl] = useState(userBook?.image_url);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateYear = (e) => setYear(e.target.value);
  const updateAuthor = (e) => setAuthor(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  useEffect(() => {
    dispatch(getAllBooksThunk())
  }, [dispatch])

  useEffect(() => {
    const newErrors = [];

    if (!currentUser) {
      newErrors.push("Please log in or sign up with BadReads to continue.");
    }
    if (title.length <= 0) {
      newErrors.push("Title is required.");
    } else if (title.length > 255) {
      newErrors.push("Title must be 255 characters or less.");
    }
    if (year <= 0 || year > 2022) {
      newErrors.push("Please provide a valid release year.");
    }
    if (author.length <= 0) {
      newErrors.push("Author is required.");
    } else if (author.length > 255) {
      newErrors.push("Name of author must be 255 characters or less.");
    }
    if (description.length <= 0) {
      newErrors.push("Description is required.");
    } else if (description.length > 5000) {
      newErrors.push("Description must be 5000 characters or less.");
    }
    setErrors(newErrors);
  }, [currentUser, title, year, author, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...book,
      id: bookId,
      title,
      year,
      author,
      description,
      image_url: imageUrl,
    };

    const updatedBook = await dispatch(updateBook(data));

    if (updatedBook) {
      setErrors([]);
      setShowModal(false);
      history.push("/my-books");
    }
  };

  return (
    <>
      <form className="edit-book-form" onSubmit={handleSubmit}>
        <div className="edit-book-form-title">Edit Your Book</div>
        <div className="edit-book-modal-body">
          <div className="edit-book-form-errors-container">
            {errors.map((error, idx) => (
              <span key={idx}>Error: {error}</span>
            ))}
          </div>
          <label className="edit-book-form-label">Title</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <label className="edit-book-form-label">Year</label>
          <input
            className="edit-book-form-input"
            type="integer"
            placeholder="Year"
            required
            value={year}
            onChange={updateYear}
          />
          <label className="edit-book-form-label">Author</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Author"
            required
            value={author}
            onChange={updateAuthor}
          />
          <label className="edit-book-form-label">Description</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Description"
            required
            value={description}
            onChange={updateDescription}
          />
          <label className="edit-book-form-label">Book Cover Image URL</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Book Cover Image URL"
            required
            value={imageUrl}
            onChange={updateImageUrl}
          />
        </div>
        <button
          className="edit-book-form-submit"
          type="submit"
          disabled={errors.length ? true : false}
        >
          Save Changes
        </button>
        <button
          className="edit-book-form-cancel"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default EditBookForm;
