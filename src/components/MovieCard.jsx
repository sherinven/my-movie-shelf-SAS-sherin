function MovieCard({
  movie,
  onDetail,
  onEdit,
  onDelete,
}) {
  const fallbackImage =
    "https://placehold.co/600x900/292477/FFFFFF?text=No+Poster";

  const imageSrc = movie.image?.trim()
    ? movie.image
    : fallbackImage;

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img
          src={imageSrc}
          alt={movie.title}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />

        <div className="rating">
          ⭐ {movie.rating}
        </div>
      </div>

      <div className="movie-content">
        <h3>{movie.title}</h3>

        <p className="director">
          {movie.director} · {movie.release_year}
        </p>

        <span className="genre">
          {movie.genre}
        </span>

        <div className="actions">
          <button
            className="detail"
            onClick={() => onDetail(movie)}
          >
            Details
          </button>

          <button onClick={() => onEdit(movie)}>
            Edit
          </button>

          <button
            className="delete"
            onClick={() => onDelete(movie)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;