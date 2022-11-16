import { useRef, useState } from "react";
import { useUser } from "../context/UserContext";
function ProjectFilterDate({ open }) {
  const { filterProjectsByDate, orderProjectsByDate, setUserTitle } = useUser();
  const order = useRef(null);
  const dateFilter = useRef(null);
  const [dateType, setDateType] = useState("");
  return (
    <div className="dropdown dropdown-right dropdown-end">
      <div
        className="tooltip tooltip-right w-full"
        data-tip="Mostrar filtros por fecha"
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
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>

            {open ? (
              <p className="my-auto text-left col-span-3">filtrar por fecha</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div className="dropdown-content p-2 shadow bg-secondary rounded-box w-fit flex flex-col">
        <div className="p-2 border-white border-2 rounded-xl mb-2 bg-secondary">
          <div className="form-control">
            <label htmlFor="reg" className="label cursor-pointer">
              <span className="label-text font-bold text-white">
                Fecha de Registro
              </span>
              <input
                id="reg"
                type="radio"
                name="radio-1"
                className="radio radio-accent checked:bg-accent"
                onChange={(e) => {
                  setDateType(e.target.value);
                }}
                value={"reg"}
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="ini" className="label cursor-pointer">
              <span className="label-text font-bold text-white">
                Fecha de Inicio
              </span>
              <input
                id="ini"
                type="radio"
                name="radio-1"
                className="radio radio-accent checked:bg-accent"
                onChange={(e) => {
                  setDateType(e.target.value);
                }}
                value={"ini"}
              />
            </label>
          </div>
          <div className="form-control">
            <label htmlFor="fin" className="label cursor-pointer">
              <span className="label-text font-bold text-white">
                Fecha de Finalización
              </span>
              <input
                id="fin"
                type="radio"
                name="radio-1"
                className="radio radio-accent checked:bg-accent"
                onChange={(e) => {
                  setDateType(e.target.value);
                }}
                value={"fin"}
              />
            </label>
          </div>
        </div>
        <ul
          tabIndex={0}
          className="p-2 menu border-white border-2 bg-secondary rounded-box w-full mb-2"
        >
          <li>
            <button
              onClick={() => {
                orderProjectsByDate(dateType, "asc");
              }}
            >
              Ascendente
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                orderProjectsByDate(dateType, "des");
              }}
            >
              Descendente
            </button>
          </li>
        </ul>
        <p>Filtrar por fecha: </p>
        <div className="p-2 flex flex-row border-white border-2 rounded-xl">
          <select ref={order} className="inline select select-sm text-black">
            <option className="" value={">"}>
              {">"}
            </option>
            <option className="" value={"<"}>
              {"<"}
            </option>
            <option className="" value={"="}>
              {"="}
            </option>
          </select>
          <input
            ref={dateFilter}
            type="date"
            className="input text-black input-sm mx-2"
          />
          <button
            onClick={() => {
              setUserTitle("Proyectos filtrados por fecha");
              filterProjectsByDate(
                dateType,
                dateFilter.current.value,
                order.current.value
              );
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

export default ProjectFilterDate;
