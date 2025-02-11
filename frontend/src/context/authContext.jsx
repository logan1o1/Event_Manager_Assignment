import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

function decodeJWT(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    // Ensure we're on the client
    if (typeof window !== "undefined") {
      const token = getCookie("access_token");
      if (token) {
        const decoded = decodeJWT(token);
        setAuthUser(decoded);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
