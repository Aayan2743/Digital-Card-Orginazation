// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Boot
//   useEffect(() => {
//     const storedUser = localStorage.getItem("admin_user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//     setLoading(false);
//   }, []);

//   // Listen for 401 logout
//   useEffect(() => {
//     const handleUnauthorized = () => {
//       logout();
//       navigate("/login");
//     };

//     window.addEventListener("unauthorized", handleUnauthorized);
//     return () => window.removeEventListener("unauthorized", handleUnauthorized);
//   }, []);

//   const login = ({ token, user }) => {
//     localStorage.setItem("auth_token", token);
//     localStorage.setItem("admin_user", JSON.stringify(user));
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem("auth_token");
//     localStorage.removeItem("admin_user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, loading, isAuthenticated: !!user }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [brand, setBrand] = useState(null); // ✅ GLOBAL BRAND
  const [loading, setLoading] = useState(true);

  // Boot
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    const storedBrand = localStorage.getItem("org_brand");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBrand) setBrand(JSON.parse(storedBrand));

    setLoading(false);
  }, []);

  // Listen for 401 logout
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
      navigate("/login");
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  const login = ({ token, user, brand }) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    if (brand) {
      localStorage.setItem("org_brand", JSON.stringify(brand));
      setBrand(brand);
    }

    setUser(user);
  };

  // ✅ THIS IS WHAT YOU NEED
  const updateBrand = (brandData) => {
    localStorage.setItem("org_brand", JSON.stringify(brandData));
    setBrand(brandData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("org_brand");
    setUser(null);
    setBrand(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        brand, // 👈 GLOBAL
        login,
        updateBrand, // 👈 GLOBAL
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
