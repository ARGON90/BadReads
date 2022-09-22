import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBook } from "../../store/booksAlex";

const CreateBookForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({
    title: "",
    year: "",
    author: "",
    description: "",
    banned: "",
    imageUrl: "",
  });
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [banned, setBanned] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
      title,
      year,
      author,
      description,
      banned,
      image_url: imageUrl,
    };

    const createdBook = await dispatch(createBook(data));

    if (createdBook) {
      setErrors([]);
      setShowModal(false);
      history.push("/my-books");
    }
  };

  return (
    <>
      <form className="create-book-form" onSubmit={handleSubmit}>
        <div className="create-book-form-title">Add a Book to BadReads</div>
        <div className="create-book-form-body-separator-top"></div>
        <div className="create-book-modal-body">
          <label className="create-book-form-label">Title</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <div className="edit-book-form-error-message">{errors?.title}</div>
          <label className="create-book-form-label">Year</label>
          <input
            className="create-book-form-input"
            type="number"
            placeholder="Year"
            required
            value={year}
            onChange={updateYear}
          />
          <div className="edit-book-form-error-message">{errors.year}</div>
          <label className="create-book-form-label">Author</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Author"
            required
            value={author}
            onChange={updateAuthor}
          />
          <div className="edit-book-form-error-message">{errors.author}</div>
          <label className="create-book-form-label">Description</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Description"
            required
            value={description}
            onChange={updateDescription}
          />
          <div className="edit-book-form-error-message">
            {errors.description}
          </div>
          <label className="create-book-form-label">Banned Reason</label>
          <input
            className="create-book-form-input"
            type="string"
            placeholder="Banned Reason"
            required
            value={banned}
            onChange={updateBanned}
          />
          <div className="edit-book-form-error-message">{errors.banned}</div>
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
        <div className="edit-book-form-error-message">{errors.imageUrl}</div>
        <div className="create-book-form-body-separator-bottom"></div>
        <div className="create-book-form-button-container">
          <button
            className="create-book-form-submit"
            type="submit"
            disabled={
              Object.values(errors).every((x) => x === "") ? false : true
            }
          >
            Submit
          </button>
          <button
            className="create-book-form-cancel"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateBookForm;
