import { useUser } from "../context/UserContext";
import { useEffect, useRef, useState } from "react";

function ProjectFilterStatus({ setFilterApplied }) {
  const { allStatus, filterProjectsByStatus, orderProjectsByStatus } =
    useUser();
  const [statusArray, setStatusArray] = useState();
  useEffect(() => {
    var statusArrayTemp = {};
    allStatus.map((status) => {
      statusArrayTemp = { ...statusArrayTemp, [status.id]: false };
    });
    setStatusArray(statusArrayTemp);
  }, []);

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
          <div className="flex flex-col">
            {allStatus.map((state) => {
              return (
                <div className="form-control " key={state.id}>
                  <label className="label cursor-pointer">
                    <span className="label-text text-white">
                      {state.estado}
                    </span>
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
                filterProjectsByStatus(statusArray);
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
