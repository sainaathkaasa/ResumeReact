import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import SkillsScrollCard from "../components/SkillsScrollCard";
import { getProfile } from "../services/ProfileService";
import { getLanguages } from "../services/skillsService";

function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [reloadSkills, setReloadSkills] = useState(0);
  console.log("ENV:", import.meta.env.VITE_API_BASE_URL);

  useEffect(() => {
    getProfile().then(res => setProfile(res.data));
  }, []);

  useEffect(() => {
  console.log("Profile State Updated:", profile);
}, [profile]);

  useEffect(() => {
    getLanguages().then(res => setSkills(res.data));
  }, [reloadSkills]);

  if (!profile) return <p>Loading...</p>;

  return (
    <main
      style={{
        background: "#f1f5f9",
        minHeight: "80vh",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <ProfileCard profile={profile} />

      {/* Skills below profile */}
      <SkillsScrollCard
  skills={skills}
  onSkillAdded={() => setReloadSkills(prev => prev + 1)}
/>
    </main>
  );
}

export default Dashboard;
