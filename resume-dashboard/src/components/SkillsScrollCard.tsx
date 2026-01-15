import "./SkillsScrollCard.css";
import axios from "axios";
import { useState } from "react";
import AddSkillModal from "./AddSkillModal";
import { useAuth } from "./AuthContext";
import EditSkillModal from "./EditSkillModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

type SkillDetails = {
  id: number;
  language: string;
  description: string;
};

type Props = {
  skills: string[];
  onSkillAdded: () => void; // 🔥 callback from Dashboard
};


  

function SkillsScrollCard({ skills, onSkillAdded }: Props) {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ✅ Hook used ONCE at top level
  const { isAdmin, role, token } = useAuth();

  console.log("TOKEN:", token);
  console.log("ROLE:", role);
  console.log("IS ADMIN:", isAdmin);

  const handleDeleteSkill = async (language: string) => {
    if (!token) return;

    try {
      await axios.delete(
        `http://localhost:8080/admin/deletespecificskill?language=${language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Deleted skill:", language);

      setSelectedSkill(null); // ✅ clear description card
      onSkillAdded();         // ✅ refresh dashboard skills
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  

  const handleAddSkill = () => {
    setShowAddModal(true);
  };

  const handleSkillClick = async (language: string) => {
    if (loading || !token) return;

    try {
      setActiveSkill(language);
      setLoading(true);

      const response = await axios.get(
        `http://localhost:8080/specificskill?language=${language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token from context
          },
        }
      );

      setSelectedSkill(response.data);
    } catch (error) {
      console.error("Error fetching skill:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="skills-section">
      {/* Header */}
      <div className="skills-header">
        <h2 className="skills-title">Skills</h2>

        {isAdmin && (
          <button className="add-skill-btn" onClick={handleAddSkill}>
            + Add Skill
          </button>
        )}
      </div>

      {/* Scroll Cards */}
      <div className="skills-scroll-container">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`skill-card ${
              activeSkill === skill ? "active" : ""
            } ${loading ? "disabled" : ""}`}
            onClick={() => handleSkillClick(skill)}
          >
            {skill}
          </div>
        ))}
      </div>

      {/* Description Card */}
      {selectedSkill && (
  <div className="skill-detail-card">
    <div className="skill-detail-header">
      <h3>{selectedSkill.language}</h3>

      {isAdmin && (
        <div className="skill-actions">
          <span
            className="icon edit"
            title="Edit"
            onClick={() => setShowEditModal(true)}
          >
            ✏️
          </span>
          <span
            className="icon delete"
            title="Delete"
            onClick={() => setShowDeleteModal(true)}
          >
            🗑️
          </span>
        </div>
      )}
    </div>

    <p className="skill-description">
      {selectedSkill.description}
    </p>
  </div>
)}


      {/* Add Skill Modal */}
      {showAddModal && (
        <AddSkillModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            onSkillAdded();          // 🔥 refresh Dashboard skills
            setShowAddModal(false);  // close modal
          }}
        />
      )}

{showEditModal && selectedSkill && (
  <EditSkillModal
    skill={{
      language: selectedSkill.language,
      description: selectedSkill.description
    }}
    onClose={() => setShowEditModal(false)}
    onSuccess={() => {
      onSkillAdded();        // 🔥 refresh dashboard skills
      setShowEditModal(false);
    }}
  />
)}

{showDeleteModal && selectedSkill && (
  <ConfirmDeleteModal
    language={selectedSkill.language}
    onCancel={() => setShowDeleteModal(false)}
    onConfirm={() => {
      handleDeleteSkill(selectedSkill.language);
      setShowDeleteModal(false);
    }}
  />
)}



    </div>
  );
}

export default SkillsScrollCard;
