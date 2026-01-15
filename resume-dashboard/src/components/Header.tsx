import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./AuthContext";

function Header() {
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();
    const username = localStorage.getItem("username");
    const [authKey, setAuthKey] = useState(0);

    const handleLogout = () => {
        logout();
        navigate("/");
      };

  return (
    <header className="header">
      <h2
        className="logo clickable"
        onClick={() => navigate("/")}
      >
        Sainaath Kaasa
      </h2>

      <div className="actions">
      {username ? (
          <>
            <span className="welcome">Welcome, {username}</span>

            {/*  LOGOUT */}
            <button className="btn outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="btn outline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn primary"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
