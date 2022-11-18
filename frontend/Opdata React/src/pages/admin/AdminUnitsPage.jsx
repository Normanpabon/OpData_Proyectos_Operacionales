import { Outlet, useNavigate } from "react-router-dom";
import UnitsFilterBar from "../../components/admin/UnitsFilterBar";
import UnitsList from "../../components/admin/UnitsList";
import { useUser } from "../../context/UserContext";
function AdminUnitsPage() {
  const navigate = useNavigate();
  const { alert } = useUser();
  return (
    <>
      <UnitsFilterBar />
      <section className="w-full px-5 pt-2 pb-5 flex flex-col grow">
        <h2 className="text-black font-bold text-3xl">Unidades</h2>
        <div className={`alert alert-success shadow-lg ${alert}`}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>¡Operación exitosa!</span>
          </div>
        </div>
        <Outlet />
        <UnitsList />
        <div
          className="tooltip tooltip-left fixed bottom-14 right-2"
          data-tip="Crear una nueva unidad"
        >
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-circle btn-lg modal-button text-white text-5xl"
            onClick={(e) => navigate(`/admin/units/create`)}
          >
            +
          </label>
        </div>
      </section>
    </>
  );
}

export default AdminUnitsPage;
