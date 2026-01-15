import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Load from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const login = (token: string, role: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        login,
        logout,
        isAdmin: role === "ROLE_ADMIN",
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
