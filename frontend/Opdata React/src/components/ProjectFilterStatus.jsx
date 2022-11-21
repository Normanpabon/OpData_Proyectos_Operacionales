import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

function ProjectFilterStatus({ open }) {
  const {
    allStatus,
    filterProjectsByStatus,
    orderProjectsByStatus,
    setUserTitle,
  } = useUser();
  const [statusArray, setStatusArray] = useState();
  useEffect(() => {
    var statusArrayTemp = {};
    allStatus.map((status) => {
      statusArrayTemp = { ...statusArrayTemp, [status.id]: false };
    });
    setStatusArray(statusArrayTemp);
    
  }, []);

  return (
    <div className="dropdown dropdown-right dropdown-end">
      <div
        className="tooltip tooltip-right w-full"
        data-tip="Mostrar filtros por estado"
      >
        <label tabIndex={0} className="btn btn-primary text-white w-full mt-2">
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className=""
              viewBox="0 0 16 16"
            >
              <path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z" />
              <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">filtrar por estado</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div className="dropdown-content bg-secondary rounded-box w-fit">
        <ul tabIndex={0} className="menu p-2">
          <li>
            <p
              onClick={() => {
                orderProjectsByStatus("asc");
              }}
            >
              Ascendente
            </p>
          </li>
          <li>
            <p
              onClick={() => {
                orderProjectsByStatus("des");
              }}
            >
              Descendente
            </p>
          </li>
        </ul>
        <div className="flex flex-col p-3">
          {allStatus.map((state) => {
            return (
              <div className="form-control " key={state.id}>
                <label className="label cursor-pointer">
                  <span className="label-text text-white">{state.estado}</span>
                  <input
                    type="checkbox"
                    name={state.id}
                    className="checkbox checkbox-primary ml-2"
                    onChange={(e) => {
                      setStatusArray({
                        ...statusArray,
                        [e.target.name]: e.target.checked,
                      });
                    }}
                  />
                </label>
              </div>
            );
          })}
          <button
            onClick={() => {
              setUserTitle("Proyectos filtrados por estado");
              filterProjectsByStatus(statusArray);
            }}
            className="btn btn-primary btn-sm text-white"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectFilterStatus;
