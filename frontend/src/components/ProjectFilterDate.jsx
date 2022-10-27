import { useRef, useState } from "react";
import { useUser } from "../context/UserContext";
function ProjectFilterDate({ setFilterApplied }) {
  const { filterProjectsByDate, orderProjectsByDate } = useUser();
  const order = useRef(null);
  const dateFilter = useRef(null);
  const [dateType, setDateType] = useState("");
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-primary text-white btn-sm m-1">
        Fecha
      </label>
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
                setFilterApplied(true);
              }}
            >
              Ascendente
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                orderProjectsByDate(dateType, "des");
                setFilterApplied(true);
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
              filterProjectsByDate(
                dateType,
                dateFilter.current.value,
                order.current.value
              );
              setFilterApplied(true);
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
