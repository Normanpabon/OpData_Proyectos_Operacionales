import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { useUser } from "./context/UserContext";
import UserMainPage from "./pages/user/UserMainPage";
import ProjectForm from "./components/ProjectForm";
import ProjectRead from "./components/ProjectRead";
import UserProjectMain from "./components/UserProjectMain";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="user" element={<UserMainPage />}>
            <Route path="main" element={<UserProjectMain />} />
            <Route path="edit/:id" element={<ProjectForm />} />
            <Route path="create" element={<ProjectForm />} />
            <Route path="read/:id" element={<ProjectRead />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
