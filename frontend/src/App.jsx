import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { useUser } from "./context/UserContext";
import UserMainPage from "./pages/user/UserMainPage";
import ProjectForm from "./components/ProjectForm";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="user" element={<UserMainPage />}>
            <Route path="edit/:id" element={<ProjectForm />} />
            <Route path="create" element={<ProjectForm />} />
          </Route>
        </Route>
        <Route
          element={
            <ProtectedRoute isAllowed={!!user && user.role === "admin"} />
          }
        >
          <Route path="admin" element="">
            <Route path="projects" element="">
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
            <Route path="users" element="">
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
            <Route path="units" element="">
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
            <Route path="status" element="">
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
