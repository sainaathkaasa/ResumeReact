import { useEffect, useState } from "react";
import "./Projects.css";

interface Props {
  initialData: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export default function ProjectForm({ initialData, onSave, onCancel }: Props) {

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="edit-form-card">

      <div className="form-group">
        <label>Project Name</label>
        <input
          name="title"
          value={formData?.title || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label>Project Description</label>
        <textarea
          name="description"
          value={formData?.description || ""}
          onChange={handleChange}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label>Tech Stack</label>
        <input
          name="techStack"
          value={formData?.techStack || ""}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="project-actions">
        <button
          className="save-btn"
          onClick={() => onSave(formData)}
        >
          Save
        </button>

        <button
          className="cancel-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

    </div>
  );
}