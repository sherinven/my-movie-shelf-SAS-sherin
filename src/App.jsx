import { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import "./App.css";

const API_URL =
  "https://6abc6f8c5121d616d90b90df.mockapi.io/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [rating, setRating] = useState("Any rating");

  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);

  const [form, setForm] = useState({
    title: "",
    director: "",
    genre: "Action",
    release_year: "",
    rating: "",
    image: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.log(error));
  }, []);

  const genres = [
    "All",
    "Action",
    "Animation",
    "Comedy",
    "Drama",
    "Horror",
    "Science Fiction",
  ];

  const filteredMovies = movies.filter((movie) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      movie.title?.toLowerCase().includes(keyword) ||
      movie.director?.toLowerCase().includes(keyword);

    const matchesGenre =
      genre === "All" ||
      movie.genre?.toLowerCase() === genre.toLowerCase();

    const matchesRating =
      rating === "Any rating" ||
      Number(movie.rating) >= Number(rating);

    return matchesSearch && matchesGenre && matchesRating;
  });

  const openAdd = () => {
    setEditingMovie(null);
    setForm({
      title: "",
      director: "",
      genre: "Action",
      release_year: "",
      rating: "",
      image: "",
    });
    setShowForm(true);
  };

  const openEdit = (movie) => {
    setEditingMovie(movie);
    setForm({
      title: movie.title || "",
      director: movie.director || "",
      genre: movie.genre || "Action",
      release_year: movie.release_year || "",
      rating: movie.rating || "",
      image: movie.image || "",
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingMovie) {
        const response = await fetch(
          `${API_URL}/${editingMovie.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        const updatedMovie = await response.json();

        setMovies(
          movies.map((movie) =>
            movie.id === editingMovie.id
              ? updatedMovie
              : movie
          )
        );
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const newMovie = await response.json();

        setMovies([...movies, newMovie]);
      }

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (movie) => {
    const confirmDelete = window.confirm(
      `Delete "${movie.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/${movie.id}`, {
        method: "DELETE",
      });

      setMovies(
        movies.filter((item) => item.id !== movie.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetail = (movie) => {
    setSelectedMovie(movie);
    setShowDetail(true);
  };

  return (
    <div className="app">
      <Header onAdd={openAdd} />

      <main>
        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by title or director"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option>Any rating</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div className="genre-filter">
          {genres.map((item) => (
            <button
              key={item}
              className={genre === item ? "active" : ""}
              onClick={() => setGenre(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <MovieList
          movies={filteredMovies}
          onDetail={handleDetail}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div
          className="modal-bg"
          onClick={() => setShowForm(false)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <h2>
              {editingMovie ? "Edit Movie" : "Add Movie"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Movie title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <input
                name="director"
                placeholder="Director"
                value={form.director}
                onChange={handleChange}
                required
              />

              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
              >
                {genres
                  .filter((item) => item !== "All")
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </select>

              <input
                name="release_year"
                type="number"
                placeholder="Release year"
                value={form.release_year}
                onChange={handleChange}
                required
              />

              <input
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="10"
                placeholder="Rating"
                value={form.rating}
                onChange={handleChange}
                required
              />

              <input
                name="image"
                placeholder="Poster image URL"
                value={form.image}
                onChange={handleChange}
                required
              />

              <button className="submit-button" type="submit">
                {editingMovie ? "Save Changes" : "Add Movie"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {showDetail && selectedMovie && (
        <div
          className="modal-bg"
          onClick={() => setShowDetail(false)}
        >
          <div
            className="detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close"
              onClick={() => setShowDetail(false)}
            >
              ×
            </button>

            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x900?text=No+Image";
              }}
            />

            <div className="detail-info">
              <h2>{selectedMovie.title}</h2>

              <span className="detail-rating">
                ⭐ {selectedMovie.rating}
              </span>

              <p>
                <b>Director</b>
                <br />
                {selectedMovie.director}
              </p>

              <p>
                <b>Genre</b>
                <br />
                {selectedMovie.genre}
              </p>

              <p>
                <b>Release Year</b>
                <br />
                {selectedMovie.release_year}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;