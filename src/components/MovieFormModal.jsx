import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  director: "",
  genre: "",
  release_year: "",
  rating: "",
  description: "",
  image: "",
};

function MovieFormModal({
  isOpen,
  movie,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
        release_year: movie.release_year,
        rating: movie.rating,
        description: movie.description,
        image: movie.image,
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [movie, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.director ||
      !form.genre ||
      !form.release_year ||
      !form.rating ||
      !form.description ||
      !form.image
    ) {
      setError("All fields are required.");
      return;
    }

    if (
      Number(form.rating) < 0 ||
      Number(form.rating) > 10
    ) {
      setError("Rating must be between 0 and 10.");
      return;
    }

    onSubmit({
      title: form.title,
      director: form.director,
      genre: form.genre,
      release_year: Number(form.release_year),
      rating: Number(form.rating),
      description: form.description,
      image: form.image,
    });

    setForm(initialForm);
  };

  return (
    <div className="modal-bg">
      <div className="modal">
        <button className="close" onClick={onClose}>
          ×
        </button>

        <h2>{movie ? "Edit Movie" : "Add Movie"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Movie Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="director"
            placeholder="Director"
            value={form.director}
            onChange={handleChange}
          />

          <input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
          />

          <input
            type="number"
            name="release_year"
            placeholder="Release Year"
            value={form.release_year}
            onChange={handleChange}
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating 0 - 10"
            value={form.rating}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <button className="submit-button" type="submit">
            {movie ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MovieFormModal;