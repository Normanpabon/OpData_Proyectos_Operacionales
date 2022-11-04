import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from "./context/UserContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/Login";
import UserMainPage from "./pages/user/UserMainPage";
import ProjectForm from "./components/ProjectForm";
import AdminMainPage from "./pages/admin/AdminMainPage";
import AdminUnitsPage from "./pages/admin/AdminUnitsPage";
import AdminLogsPage from "./pages/admin/AdminLogsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminStatusPage from "./pages/admin/AdminStatusPage";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user.rol === "ROLE_JefeUnidad"}
            />
          }
        >
          <Route path="user" element={<UserMainPage />}>
            <Route path="edit/:id" element={<ProjectForm />} />
            <Route path="create" element={<ProjectForm />} />
          </Route>
        </Route>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user.rol === "ROLE_Administrador"}
            />
          }
        >
          <Route path="admin" element={<AdminMainPage />}>
            {/* <Route path="projects" element={""}>
              <Route path="edit/:id" element={""} />
              <Route path="create" />
            </Route> */}
            <Route path="users" element={<AdminUsersPage />}>
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
            <Route path="units" element={<AdminUnitsPage />}>
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
            <Route path="status" element={<AdminStatusPage />}>
              <Route path="edit/:id" />
              <Route path="create" />
            </Route>
            <Route path="logs" element={<AdminLogsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
