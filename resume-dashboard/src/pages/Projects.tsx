import { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/GetProjects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  const toggleProject = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`project-card ${
              openIndex === index ? "open" : ""
            }`}
          >
            <div
              className="project-header"
              onClick={() => toggleProject(index)}
            >
              <h3>{project.title}</h3>
              <span className="arrow">
                {openIndex === index ? "▲" : "▼"}
              </span>
            </div>

            <div className="project-body">
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                <strong>Tech Stack:</strong> {project.techStack}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
