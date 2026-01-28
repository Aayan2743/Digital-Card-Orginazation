

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===================== BOOT ===================== */
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");
    const storedBrand = localStorage.getItem("org_brand");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBrand) setBrand(JSON.parse(storedBrand));

    setLoading(false);
  }, []);

  /* ===================== GLOBAL 401 LISTENER ===================== */
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
      navigate("/login", { replace: true });
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  /* ===================== FETCH ORGANIZATION ===================== */
  useEffect(() => {
    if (!user) return;

    const fetchOrganization = async () => {
      try {
        const { data } = await api.get("/settings-orginization");

        if (data?.data) {
          updateBrand(data.data);
        }
      } catch (error) {
        console.error("Organization fetch failed");
      }
    };

    fetchOrganization();
  }, [user]);

  /* ===================== LOGIN ===================== */
  const login = ({ token, user, brand }) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    if (brand) {
      localStorage.setItem("org_brand", JSON.stringify(brand));
      setBrand(brand);
    }

    setUser(user);
  };

  /* ===================== UPDATE BRAND ===================== */
  const updateBrand = (brandData) => {
    localStorage.setItem("org_brand", JSON.stringify(brandData));
    setBrand(brandData);
  };

  /* ===================== LOGOUT ===================== */
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("org_brand");

    setUser(null);
    setBrand(null);
  };

  /* ===================== PROVIDER ===================== */
  return (
    <AuthContext.Provider
      value={{
        user,
        brand,
        login,
        updateBrand,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

/* ===================== HOOK ===================== */
export const useAuth = () => useContext(AuthContext);
