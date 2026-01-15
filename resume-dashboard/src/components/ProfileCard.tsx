import "./ProfileCard.css";

interface Profile {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photo?: string;
}

function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="profile-card">
    
    <div className="profile-header">
  <div className="profile-text">
    <h1>{profile.fullName}</h1>
    <h3>{profile.title}</h3>
  </div>

  <div className="profile-photo photo-flip">
  {profile.photo && (
    <div className="photo-flip">
      <img
        src={`data:image/jpeg;base64,${profile.photo}`}
        alt="Profile"
        className="profile-image"
      />
    </div>
  )}
</div>
</div>

      

      <p className="summary">{profile.summary}</p>

      

      <div className="details">
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Location:</strong> {profile.location}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
