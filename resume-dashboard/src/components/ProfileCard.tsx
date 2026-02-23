import { useState, useRef } from "react";
import { useAuth } from "./AuthContext";
import { upsertProfile } from "../services/ProfileService";
import "./ProfileCard.css";
import { toast } from "react-toastify";

interface Profile {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  photo?: string;
}

function ProfileCard({ profile, onProfileUpdated  }: { profile: Profile, onProfileUpdated: () => void;  }) {
  const { isAdmin } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // -----------------------------
  // Handle input change
  // -----------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -----------------------------
  // Upload from folder
  // -----------------------------
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result?.toString().split(",")[1];
      setFormData({ ...formData, photo: base64 });
    };
    reader.readAsDataURL(file);
  };

  // -----------------------------
  // Start camera
  // -----------------------------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      streamRef.current = stream;
      setShowCamera(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access denied or not available.");
    }
  };

  // -----------------------------
  // Capture image from webcam
  // -----------------------------
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg").split(",")[1];

    setFormData({ ...formData, photo: base64 });

    stopCamera();
  };

  // -----------------------------
  // Stop camera
  // -----------------------------
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setShowCamera(false);
  };

  // -----------------------------
  // Save profile
  // -----------------------------
  const handleSave = async () => {
  try {
    setLoading(true);

    const res = await upsertProfile(formData);
    onProfileUpdated();
    toast.success(res.data);
    setEditMode(false);

  } catch (err: any) {

    const errorMessage =
      err.response?.data || "Something went wrong";

    toast.error(errorMessage);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="profile-card">

      <div className="profile-header">

        <div className="profile-text">
          {editMode ? (
            <>
              <input name="fullName" value={formData.fullName} onChange={handleChange} />
              <input name="title" value={formData.title} onChange={handleChange} />
            </>
          ) : (
            <>
              <h1>{profile.fullName}</h1>
              <h3>{profile.title}</h3>
            </>
          )}
        </div>

        <div className="profile-photo">
          {formData.photo && (
            <img
              src={`data:image/jpeg;base64,${formData.photo}`}
              alt="Profile"
              className="profile-image"
            />
          )}

          {isAdmin && editMode && (
            <div className="photo-options">
              <label className="photo-btn">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  hidden
                />
              </label>

              <button className="photo-btn" onClick={startCamera}>
                Capture
              </button>
            </div>
          )}

          {showCamera && (
            <div className="camera-box">
              <video ref={videoRef} autoPlay width="200" />
              <div>
                <button onClick={captureImage}>Take Photo</button>
                <button onClick={stopCamera}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {editMode ? (
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
        />
      ) : (
        <p className="summary">{profile.summary}</p>
      )}

      <div className="details">
        {editMode ? (
          <>
            <input name="email" value={formData.email} onChange={handleChange} />
            <input name="phone" value={formData.phone} onChange={handleChange} />
            <input name="location" value={formData.location} onChange={handleChange} />
          </>
        ) : (
          <>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </>
        )}
      </div>

      {isAdmin && (
        <div className="project-actions">
          {editMode ? (
            <>
              <button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileCard;