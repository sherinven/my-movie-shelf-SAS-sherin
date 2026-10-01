import MovieCard from "./MovieCard";

function MovieList({
  movies,
  onDetail,
  onEdit,
  onDelete,
}) {
  return (
    <section>
      <div className="section-header">
        <h2>Movie Collection</h2>
        <span>{movies.length} Movies</span>
      </div>

      {movies.length === 0 ? (
        <div className="empty">
          <h3>No movies found</h3>
          <p>Try another search or add a new movie.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onDetail={onDetail}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieList;