import { Outlet, useNavigate } from "react-router-dom";
import UnitsList from "../../components/admin/UnitsList";

function AdminUnitsPage() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-black font-bold text-3xl">Unidades</h2>
      <Outlet />
      <UnitsList />
      <label
        htmlFor="my-modal"
        className="btn btn-primary btn-circle btn-lg modal-button fixed bottom-14 right-2 text-white text-5xl"
        onClick={(e) => navigate(`/admin/units/create`)}
      >
        +
      </label>
    </>
  );
}

export default AdminUnitsPage;
