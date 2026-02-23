import { useEffect, useState } from "react";
import ProjectForm from "./ProjectForm";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-toastify";
import { getProjects, upsertProject, deleteProject } from "../services/ProjectService";
import "./Projects.css";

export default function Projects() {

  const { isAdmin } = useAuth();

  const [projects, setProjects] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch {
      toast.error("Failed to load projects");
    }
  };

  const toggleProject = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAddClick = () => {
    setSelectedProject({
      title: "",
      description: "",
      techStack: ""
    });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setEditingId(project.id);
    setIsAdding(false);
  };

  const handleSave = async (data: any) => {
    try {
      const res = await upsertProject(data);
      toast.success(res.data);
      setEditingId(null);
      setIsAdding(false);
      loadProjects();
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (project:any) => {
    try {
      const res = await deleteProject(project.id);
      toast.success(res.data);
      loadProjects();
    } catch {
      toast.error("Operation failed");
    }
  };

  return (
    <section className="projects-section">

      <div className="project-title-full">
        <h2 className="projects-title">Projects</h2>

        {/* Add Button */}
        {isAdmin && (
          <div className="add-project">
            <button className="add-btn" onClick={handleAddClick}>
              + Add Project
            </button>
          </div>
        )}

      </div>

      {/* Add Form */}
      {isAdding && (
        <div className="modal-overlay" onClick={() => setIsAdding(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">Add Project</h3>

            <ProjectForm
              initialData={selectedProject}
              onSave={handleSave}
              onCancel={() => setIsAdding(false)}
            />
          </div>
        </div>
      )}

      <div className="projects-list">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${openIndex === index ? "open" : ""}`}
          >

            <div
              className="project-header"
              onClick={() => toggleProject(index)}
            >
              <h3>{project.title}</h3>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </div>

            <div className="project-body">

              {editingId === project.id ? (
                <ProjectForm
                  initialData={selectedProject}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <>
                  <p className="project-desc">{project.description}</p>

                  <div className="project-tech">
                    <strong>Tech Stack:</strong> {project.techStack}
                  </div>

                  {isAdmin && (
                    <div className="project-actions">
                      <button onClick={() => handleEdit(project)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(project)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}