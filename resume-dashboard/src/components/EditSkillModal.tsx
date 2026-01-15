import axios from "axios";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import "./AddSkillModal.css"; // reuse same modal CSS

type Skill = {
  language: string;
  description: string;
};

type Props = {
  skill: Skill;
  onClose: () => void;
  onSuccess: () => void;
};

function EditSkillModal({ skill, onClose, onSuccess }: Props) {
  const [description, setDescription] = useState(skill.description);
  const [loading, setLoading] = useState(false);

  console.log("Edit modal opened with skill:");
  console.log("Language:", skill.language);
  console.log("Original Description:", skill.description);
  console.log("Updated Description (state):", description);

  const { token } = useAuth();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);

      await axios.put(
        "http://localhost:8080/updateskill",
        {
          language: skill.language,
          description: description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      
      onSuccess(); // refresh dashboard
      onClose();   // close modal
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Skill</h3>

        <form onSubmit={handleUpdate}>
          <label>Language</label>
          <input value={skill.language} disabled />

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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSkillModal;
