// import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import AdminRoutes from "./routes/AdminRoutes";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AdminRoutes />
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import { LoaderProvider } from "./context/LoaderContext";
// import { LoaderProvider } from "./context/LoaderContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoaderProvider>
          <AdminRoutes />
        </LoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
