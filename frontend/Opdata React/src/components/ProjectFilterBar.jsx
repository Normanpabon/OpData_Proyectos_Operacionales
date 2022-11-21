import { useState, useEffect } from "react";
import ProjectFilterDate from "./ProjectFilterDate";
import ProjectFilterName from "./ProjectFilterName";
import ProjectFilterStatus from "./ProjectFilterStatus";
import ProjectFilterSearch from "./ProjectFilterSearch";
import ProjectQuickFilterButtons from "./ProjectQuickFilterButtons";
import ProjectQuickExportCsv from "./ProjectQuickExportCsv";
function ProjectFilterBar() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div
      className={`${
        open ? "w-fit" : "w-16"
      } mx-auto h-full bg-secondary p-2 mb-1 text-white flex flex-col z-50`}
    >
      <div
        className="tooltip tooltip-right"
        data-tip="Abrir/Cerrar la barra de filtros"
      >
        <button
          className="btn btn-primary btn-square w-full"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>
        </button>
      </div>
      {open ? <ProjectFilterSearch /> : ""}
      {!open ? (
        <div
          className="tooltip tooltip-right"
          data-tip="Buscar un proyecto por nombre"
        >
          <button
            onClick={() => {
              setOpen(!open);
            }}
            className="btn btn-square btn-primary mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
      {open ? (
        <div className="divider font-bold">Filtros Rápidos</div>
      ) : (
        <div className="divider"></div>
      )}
      <ProjectQuickFilterButtons open={open} />

      {open ? (
        <div className="divider font-bold">Filtros</div>
      ) : (
        <div className="divider"></div>
      )}

      <ProjectFilterName open={open} />
      <ProjectFilterDate open={open} />
      <ProjectFilterStatus open={open} />
      
      {/** Codigo para boton de generar reporte */}
      {open ?(
        <div className="divider font-bold">Generar reporte</div>
      ): (
        <div className="divider"></div>
      )}
      <ProjectQuickExportCsv open={open}/>

    </div>
  );
}

export default ProjectFilterBar;
