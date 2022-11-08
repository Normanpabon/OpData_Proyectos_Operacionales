import { Outlet, useNavigate } from "react-router-dom";
import UsersList from "../../components/admin/UsersList";
function AdminUsersPage() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-black font-bold text-3xl">Usuarios</h2>
      <Outlet />
      <UsersList />
      <label
        htmlFor="my-modal"
        className="btn btn-primary btn-circle btn-lg modal-button fixed bottom-14 right-2 text-white text-5xl"
        onClick={(e) => navigate(`/admin/users/create`)}
      >
        +
      </label>
    </>
  );
}

export default AdminUsersPage;
