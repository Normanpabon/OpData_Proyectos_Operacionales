import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { useUser } from "./context/UserContext";
import UserMainPage from "./pages/user/UserMainPage";
import ProjectForm from "./components/ProjectForm";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="user" element={<UserMainPage />}>
            <Route path="main" element={<ProjectForm />} />
            <Route path="edit/:id" element={<h1>Hola</h1>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
