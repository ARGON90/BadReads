import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllBooksThunk, updateBook, deleteBook } from "../../store/booksAlex";

const EditBookForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const book = useSelector((state) => state?.books[id]);
  // console.log('userBook', book)

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(book?.title);
  const [year, setYear] = useState(book?.year);
  const [author, setAuthor] = useState(book?.author);
  const [description, setDescription] = useState(book?.description);
  const [imageUrl, setImageUrl] = useState(book?.image_url);

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

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedBook = await dispatch(deleteBook(id));

    if (deletedBook) {
      console.log(`Successfully deleted bookId: ${id}`);
      history.push('/my-books');
    }
  }


  return (
    <>
      <form className="update-book-form" onSubmit={handleSubmit}>
        <div className="update-book-form-title">Edit Your Book</div>
        <div className="update-book-modal-body">
          <div className="update-book-form-errors-container">
            {errors.map((error, idx) => (
              <span key={idx}>Error: {error}</span>
            ))}
          </div>
          <label className="update-book-form-label">Title</label>
          <input
            className="update-book-form-input"
            type="string"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <label className="update-book-form-label">Year</label>
          <input
            className="update-book-form-input"
            type="integer"
            placeholder="Year"
            required
            value={year}
            onChange={updateYear}
          />
          <label className="update-book-form-label">Author</label>
          <input
            className="update-book-form-input"
            type="string"
            placeholder="Author"
            required
            value={author}
            onChange={updateAuthor}
          />
          <label className="update-book-form-label">Description</label>
          <input
            className="update-book-form-input"
            type="string"
            placeholder="Description"
            required
            value={description}
            onChange={updateDescription}
          />
          <label className="update-book-form-label">Book Cover Image URL</label>
          <input
            className="update-book-form-input"
            type="string"
            placeholder="Book Cover Image URL"
            required
            value={imageUrl}
            onChange={updateImageUrl}
          />
        </div>
        <button
          className="update-book-form-submit"
          type="submit"
          disabled={errors.length ? true : false}
        >
          Save Changes
        </button>
        <button
          className="update-book-form-delete-button"
          onClick={handleDelete}
        >
          Delete Book
        </button>
      </form>
    </>
  );
};

export default EditBookForm;
