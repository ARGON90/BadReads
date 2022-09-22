import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllBooksThunk, updateBook } from "../../store/booksAlex";

const EditBookForm = ({ setShowModal, userBook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const book = useSelector((state) => state?.books[userBook.id]);

  const [errors, setErrors] = useState({
    title: "",
    year: "",
    author: "",
    description: "",
    banned: "",
    imageUrl: "",
  });
  const [bookId] = useState(userBook?.id);
  const [title, setTitle] = useState(userBook?.title);
  const [year, setYear] = useState(userBook?.year);
  const [author, setAuthor] = useState(userBook?.author);
  const [description, setDescription] = useState(userBook?.description);
  const [banned, setBanned] = useState(userBook?.banned);
  const [imageUrl, setImageUrl] = useState(userBook?.image_url);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateYear = (e) => setYear(e.target.value);
  const updateAuthor = (e) => setAuthor(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateBanned = (e) => setBanned(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  const isValidImage = (string) => {
    const validEndings = [".jpg", ".jpeg", ".png", ".tiff"];
    for (let i = 0; i < validEndings.length; i++) {
      let suffix = validEndings[i];
      if (string.endsWith(suffix)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, [dispatch]);

  useEffect(() => {
    const newErrors = {};

    if (title.length <= 0) {
      newErrors["title"] = "Title is required.";
    } else if (title.length > 255) {
      newErrors["title"] = "Title must be 255 characters or less.";
    }
    if (isNaN(year)) {
      newErrors["year"] = "Year must be numerical.";
    }
    if (year <= 0 || year > 2022) {
      newErrors["year"] = "Valid release year is required.";
    }
    if (author.length <= 0) {
      newErrors["author"] = "Author is required.";
    } else if (author.length > 255) {
      newErrors["author"] = "Name of author must be 255 characters or less.";
    }
    if (description.length <= 0) {
      newErrors["description"] = "Description is required.";
    } else if (description.length > 5000) {
      newErrors["description"] = "Description must be 5000 characters or less.";
    }
    if (banned.length <= 0) {
      newErrors["banned"] = "Banned reason is required.";
    } else if (banned.length > 5000) {
      newErrors["banned"] = "Banned reason must be 5000 characters or less.";
    }
    if (!isValidImage(imageUrl)) {
      newErrors["imageUrl"] = "Please provide a valid image.";
    }
    setErrors(newErrors);
  }, [title, year, author, description, banned, imageUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...book,
      id: bookId,
      title,
      year,
      author,
      description,
      banned,
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
        <div className="edit-book-form-body-separator-top"></div>
        <div className="edit-book-modal-body">
          <label className="edit-book-form-label">Title</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <div className="edit-book-form-error-message">{errors.title}</div>
          <label className="edit-book-form-label">Year</label>
          <input
            className="edit-book-form-input"
            type="number"
            placeholder="Year"
            required
            value={year}
            onChange={updateYear}
          />
          <div className="edit-book-form-error-message">{errors.year}</div>
          <label className="edit-book-form-label">Author</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Author"
            required
            value={author}
            onChange={updateAuthor}
          />
          <div className="edit-book-form-error-message">{errors.author}</div>
          <label className="edit-book-form-label">Description</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Description"
            required
            value={description}
            onChange={updateDescription}
          />
          <div className="edit-book-form-error-message">
            {errors.description}
          </div>
          <label className="edit-book-form-label">Banned Reason</label>
          <input
            className="edit-book-form-input"
            type="string"
            placeholder="Banned Reason"
            required
            value={banned}
            onChange={updateBanned}
          />
          <div className="edit-book-form-error-message">{errors.banned}</div>
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
        <div className="edit-book-form-error-message">{errors.imageUrl}</div>
        <div className="edit-book-form-body-separator-bottom"></div>
        <div className="edit-book-form-button-container">
          <button
            className="edit-book-form-submit"
            type="submit"
            disabled={
              Object.values(errors).every((x) => x === "") ? false : true
            }
          >
            Save Changes
          </button>
          <button
            className="edit-book-form-cancel"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBookForm;
