function Header({ onAdd }) {
  return (
    <header className="header">
      <div className="header-content">
        <p className="label">MOVIE COLLECTION</p>

        <h1>
          My <span>Movie</span> Shelf
        </h1>

        <p className="subtitle">
          Keep track of everything you've watched and loved.
        </p>
      </div>

      <button className="add-button" onClick={onAdd}>
        + Add movie
      </button>
    </header>
  );
}

export default Header;