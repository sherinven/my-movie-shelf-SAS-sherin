function DeleteConfirmModal({
  movie,
  onClose,
  onConfirm,
}) {
  if (!movie) return null;

  return (
    <div className="modal-bg">
      <div className="delete-modal">
        <h2>Delete Movie?</h2>

        <p>
          Are you sure you want to delete{" "}
          <b>{movie.title}</b>?
        </p>

        <div className="delete-actions">
          <button onClick={onClose}>
            Cancel
          </button>

          <button
            className="delete-confirm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
