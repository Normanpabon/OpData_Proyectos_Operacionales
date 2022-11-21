import { useUser } from "../context/UserContext";
function ProjectQuickFilterButtons({ open }) {
  const {
    filterProjectsBySingleStatus,
    clearFilters,
    filterProjectsSoonToExpire,
    filterProjectsExpired,
    setUserTitle,
  } = useUser();
  return (
    <>
      <div
        className="tooltip tooltip-right"
        data-tip="Mostrar proyectos activos"
      >
        <label
          onClick={() => {
            setUserTitle("Proyectos activos");
            {/**TODO: Quitar id 1 hardcodeado */}
            filterProjectsBySingleStatus(1);
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Proyectos Activos</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Mostrar proyectos en espera"
      >
        <label
          onClick={() => {
            setUserTitle("Proyectos en espera");
            filterProjectsBySingleStatus(2);
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 4.5V9h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v7H2V2a2 2 0 0 1 2-2h5.5L14 4.5zM13 12h1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2h1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">
                Proyectos en Espera
              </p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Mostrar todos los proyectos"
      >
        <label
          onClick={() => {
            setUserTitle("Todos los proyectos");
            clearFilters();
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">
                Todos los proyectos
              </p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Mostrar los proyectos a vencer en 7 días"
      >
        <label
          onClick={() => {
            setUserTitle("Proyectos próximos a vencer");
            filterProjectsSoonToExpire();
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332h.684zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a1.806 1.806 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98v4.105zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43zm.094 5.093h.672V7.418h-.672v4.105z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Próximos a Vencer</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
      <div
        className="tooltip tooltip-right"
        data-tip="Mostrar los proyectos vencidos"
      >
        <label
          onClick={() => {
            setUserTitle("Proyectos vencidos");
            filterProjectsExpired();
          }}
          className={`btn btn-primary text-white w-full mt-2`}
        >
          <div className={`${open ? "grid grid-cols-4 w-full" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z" />
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
            </svg>
            {open ? (
              <p className="my-auto text-left col-span-3">Vencidos</p>
            ) : (
              ""
            )}
          </div>
        </label>
      </div>
    </>
  );
}

export default ProjectQuickFilterButtons;
