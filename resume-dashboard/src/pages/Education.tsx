import { useEffect, useState } from "react";
import axios from "axios";
import "./Education.css";
import api from "../api/api";

export default function Education() {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api
      .get("/GetEducation")
      .then((res) => setEducation(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="education-section">
      <h2 className="education-title">Education</h2>

      <div className="education-cards">
        {education.map((edu, index) => (
          <div className="education-card" key={index}>
            <div className="edu-level">{edu.level}</div>

            <div className="edu-course">{edu.course}</div>

            <div className="edu-score">
              CGPA / Score: <strong>{edu.cgpa}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
