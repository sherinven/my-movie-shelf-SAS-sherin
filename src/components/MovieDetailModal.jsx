function MovieDetailModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modal-bg">
      <div className="detail-modal">
        <button className="close" onClick={onClose}>
          ×
        </button>

        <img
          src={movie.image}
          alt={movie.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x900?text=No+Image";
          }}
        />

        <div>
          <h2>{movie.title}</h2>

          <p>
            <b>Director:</b> {movie.director}
          </p>

          <p>
            <b>Genre:</b> {movie.genre}
          </p>

          <p>
            <b>Release Year:</b> {movie.release_year}
          </p>

          <p>
            <b>Rating:</b> ⭐ {movie.rating}
          </p>

          <p>
            <b>Description:</b>
          </p>

          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailModal;
