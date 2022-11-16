import { Outlet, useNavigate } from "react-router-dom";
import UnitsList from "../../components/admin/UnitsList";

function AdminUnitsPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="w-full px-5 pt-2 pb-5 flex flex-col grow">
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
      </section>
    </>
  );
}

export default AdminUnitsPage;
