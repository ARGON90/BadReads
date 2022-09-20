import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBook } from "../../store/booksAlex";

const CreateBookForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [banned, setBanned] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const updateTitle = (e) => setTitle(e.target.value);
  const updateYear = (e) => setYear(e.target.value);
  const updateAuthor = (e) => setAuthor(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateBanned = (e) => setBanned(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  useEffect(() => {
    const newErrors = [];

    if (!currentUser) {
      newErrors.push('Please log in or sign up with BadReads to continue.');
    }
    if (title.length <= 0) {
      newErrors.push('Title is required.');
    } else if (title.length > 255) {
      newErrors.push('Title must be 255 characters or less.');
    }
    if (year <= 0 || year > 2022) {
      newErrors.push('Please provide a valid release year.');
    }
    if (author.length <= 0) {
      newErrors.push('Author is required.');
    } else if (author.length > 255) {
      newErrors.push('Name of author must be 255 characters or less.');
    }
    if (description.length <= 0) {
      newErrors.push('Description is required.');
    } else if (description.length > 5000) {
      newErrors.push('Description must be 5000 characters or less.');
    }
    if (banned.length <= 0) {
      newErrors.push('Banned reason is required.');
    } else if (banned.length > 5000) {
      newErrors.push('Banned reason must be 5000 characters or less.');
    }
    setErrors(newErrors);
  }, [currentUser, title, year, author, description, banned])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      year,
      author,
      description,
      banned,
      image_url: imageUrl
    }

    const createdBook = await dispatch(createBook(data));

    if (createdBook) {
      setErrors([]);
      setShowModal(false);
      history.push('/my-books');
    }
  }
  return (
    <>
      <form className="create-book-form" onSubmit={handleSubmit}>
        <div className="create-book-form-title">Add a Book to BadReads</div>
        <div className="create-book-modal-body">
          <div className="create-book-form-errors-container">
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
          <label className="create-book-form-label">Title</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <label className="create-book-form-label">Year</label>
          <input
            className="create-book-form-input"
            type="integer"
            placeholder="Year"
            required
            value={year}
            onChange={updateYear}
          />
          <label className="create-book-form-label">Author</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Author"
            required
            value={author}
            onChange={updateAuthor}
          />
          <label className="create-book-form-label">Description</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Description"
            required
            value={description}
            onChange={updateDescription}
          />
          <label className="create-book-form-label">Banned Reason</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Banned Reason"
            required
            value={banned}
            onChange={updateBanned}
          />
          <label className="create-book-form-label">Book Cover Image URL</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Book Cover Image URL"
            required
            value={imageUrl}
            onChange={updateImageUrl}
          />
        </div>
        <div className="create-book-form-body-separator"></div>
        <button className="create-book-form-submit" type="submit" disabled={errors.length ? true : false}>Submit</button>
      </form>
    </>
  )
}

export default CreateBookForm;
