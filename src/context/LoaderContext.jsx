// import { createContext, useContext, useState } from "react";
// import Loader from "../components/Loader";

// const LoaderContext = createContext();

// export function LoaderProvider({ children }) {
//   const [loading, setLoading] = useState(false);

//   const showLoader = () => setLoading(true);
//   const hideLoader = () => setLoading(false);

//   return (
//     <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
//       {children}
//       {loading && <Loader />}
//     </LoaderContext.Provider>
//   );
// }

// export const useLoader = () => useContext(LoaderContext);

import { createContext, useContext, useRef, useState } from "react";
// import GlobalLoader from "../components/GlobalLoader";
import Loader from "../components/Loader";

const LoaderContext = createContext();

const MIN_LOADING_TIME = 50; // 👈 ms (adjust if needed)

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const startTimeRef = useRef(null);
  const timeoutRef = useRef(null);

  const showLoader = () => {
    if (loading) return;

    startTimeRef.current = Date.now();
    setLoading(true);
  };

  const hideLoader = () => {
    const elapsed = Date.now() - (startTimeRef.current || 0);
    const remaining = MIN_LOADING_TIME - elapsed;

    // Clear old timeout (safety)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (remaining > 0) {
      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        startTimeRef.current = null;
      }, remaining);
    } else {
      setLoading(false);
      startTimeRef.current = null;
    }
  };

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && <Loader />}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
