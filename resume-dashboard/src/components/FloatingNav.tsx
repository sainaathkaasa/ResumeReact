import { useNavigate } from "react-router-dom";
import "./FloatingNav.css";

export default function FloatingNav() {
  const navigate = useNavigate();

  return (
    <div className="floating-nav">
      <div
        className="nav-item"
        onClick={() => navigate("/education")}
      >
        <span className="icon">🎓</span>
        <span className="text">Education</span>
      </div>

      <div
        className="nav-item"
        onClick={() => navigate("/projects")}
      >
        <span className="icon">💼</span>
        <span className="text">Projects</span>
      </div>
    </div>
  );
}
