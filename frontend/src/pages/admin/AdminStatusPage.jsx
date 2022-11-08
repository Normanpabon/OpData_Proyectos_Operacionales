import { Outlet, useNavigate } from "react-router-dom";
import StatusList from "../../components/admin/StatusList";
function AdminStatusPage() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-black font-bold text-3xl">Estados</h2>
      <Outlet />
      <StatusList />
      <label
        htmlFor="my-modal"
        className="btn btn-primary btn-circle btn-lg modal-button fixed bottom-14 right-2 text-white text-5xl"
        onClick={(e) => navigate(`/admin/status/create`)}
      >
        +
      </label>
    </>
  );
}

export default AdminStatusPage;
