import { useUser } from "../context/UserContext";
import { useRef } from "react";

function ProjectFilterStatus({ setFilterApplied }) {
  const { allStatus, filterProjectsByStatus, orderProjectsByStatus } =
    useUser();
  const status = useRef(null);
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-primary text-white btn-sm m-1">
        Estado
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-fit"
      >
        <li>
          <p
            onClick={() => {
              orderProjectsByStatus("asc");
              setFilterApplied(true);
            }}
          >
            Ascendente
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              orderProjectsByStatus("des");
              setFilterApplied(true);
            }}
          >
            Descendente
          </p>
        </li>
        <li>
          <div className="">
            <select ref={status} className="inline select select-sm text-black">
              {allStatus.map((state) => {
                return (
                  <option value={state.id} key={state.id}>
                    {state.estado}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                filterProjectsByStatus(status.current.value);
                setFilterApplied(true);
              }}
              className="btn btn-primary btn-sm text-white"
            >
              Aplicar
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProjectFilterStatus;
