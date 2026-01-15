import "./ConfirmDeleteModal.css";

type Props = {
  language: string;
  onCancel: () => void;
  onConfirm: () => void;
};

function ConfirmDeleteModal({ language, onCancel, onConfirm }: Props) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <h3>Confirm Delete</h3>

        <p>
          Are you sure you want to delete
          <strong> {language}</strong>?
        </p>

        <div className="confirm-actions">
          <button className="btn cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
