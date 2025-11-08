// contex/AuthContext.js

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); //  Loader to prevent flashing

  //  Initial load  localStorage form user/token
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwt");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    //  Optional delay (for loader effect), or make it immediate
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // ✅ login handler
  const login = (userObj, jwt) => {
    setUser(userObj);
    setToken(jwt);
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(userObj));
  };

  // ✅ logout handler
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for access
export const useAuth = () => useContext(AuthContext);
