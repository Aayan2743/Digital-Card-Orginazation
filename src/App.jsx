import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
