import axios from "axios";
import { useState } from "react";
import "./AddSkillModal.css";
import { useAuth } from "./AuthContext";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

function AddSkillModal({ onClose, onSuccess }: Props) {
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      

      await axios.post(
        "http://localhost:8080/UpsertSkills",
        [
            {
              language,
              description,
            }
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onSuccess(); // refresh skills
      onClose();   // close modal
    } catch (error) {
      console.error("Error saving skill", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Skill</h3>

        <form onSubmit={handleSubmit}>
          <label>Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSkillModal;
