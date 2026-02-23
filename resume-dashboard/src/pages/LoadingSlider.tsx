
import './LoadingSlider.css'

import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


const techStack = [
  {
    name: ".Net Core",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  },
  {
    name: "SpringBoot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "MSSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
];

function LoadingSlider() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % techStack.length);
    }, 1800);

    setTimeout(() => setLoaded(true), 5000); // simulate loading

    return () => clearInterval(interval);
  }, []);

  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <div className={`hero-section ${loaded ? "fade-out" : ""}`}>

      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
  fullScreen: { enable: false },  // VERY IMPORTANT
  background: { color: "transparent" },
  particles: {
    number: { value: 35 },
    size: { value: 2 },
    move: { enable: true, speed: 0.4 },
    opacity: { value: 0.25 },
    color: { value: "#38bdf8" },
  }
}}
      />

      {/* Glass Card */}
      <div className="glass-card">
        <h1 className="hero-name">Sainaath Kaasa</h1>
        <h2 className="hero-role">Full Stack Developer</h2>

        <div className="tech-display">
          <div className="logo-glow"></div>
          <img
            src={techStack[index].logo}
            alt={techStack[index].name}
            className="tech-logo"
          />
          <span className="tech-text">{techStack[index].name}</span>
        </div>

        <div className="code-snippet">
  <pre>
{`const developer = {
  role: "Full Stack Engineer",
  stack: [${techStack.map(t => `"${t.name}"`).join(", ")}],
  focus: ["Scalable Architecture", "Performance", "Security"],
  passion: "Designing enterprise-grade systems"
};`}
  </pre>
</div>

        <div className="loading-footer">
          <div className="spinner"></div>
          <span>Loading portfolio...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingSlider;