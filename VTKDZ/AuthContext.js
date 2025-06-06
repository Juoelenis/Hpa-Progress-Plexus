import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const login = (e, email, password) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
        console.log(errorCode, errorMessage);
      });
  };

  const logout = async () => {
    try {
      await auth.signOut();
      alert("Signed out successfully");
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      setIsAuthenticated(true);
    }

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
