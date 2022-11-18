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
import UnitForm from "./components/admin/UnitForm";
import StatusForm from "./components/admin/StatusForm";
import UserForm from "./components/admin/UserForm";
import ServerDown from "./pages/ServerDown";

function App() {
  const { user } = useUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/serverDown" element={<ServerDown />} />
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
              <Route path="edit/:id" element={<UserForm />} />
              <Route path="create" element={<UserForm />} />
            </Route>
            <Route path="units" element={<AdminUnitsPage />}>
              <Route path="edit/:id" element={<UnitForm />} />
              <Route path="create" element={<UnitForm />} />
            </Route>
            <Route path="status" element={<AdminStatusPage />}>
              <Route path="edit/:id" element={<StatusForm />} />
              <Route path="create" element={<StatusForm />} />
            </Route>
            <Route path="logs" element={<AdminLogsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
