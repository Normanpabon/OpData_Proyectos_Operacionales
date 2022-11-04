import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
function AdminNavBar() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [pageName, setPageName] = useState("Unidades");
  return (
    <div className="navbar bg-primary shadow-lg flex justify-between">
      <div className="min-w-[250px]">
        <a
          className="btn btn-ghost text-white normal-case text-3xl grow-0"
          onClick={() => navigate("/admin")}
        >
          OpData
        </a>

        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost text-white normal-case text-xl"
          >
            {pageName}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="ml-2"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a
                onClick={() => {
                  navigate("/admin/status");
                  setPageName("Estados");
                }}
              >
                Estados
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/admin/logs");
                  setPageName("Logs");
                }}
              >
                Logs
              </a>
            </li>
            {/* <li>
              <a
                onClick={() => {
                  navigate("/admin/projects");
                  setPageName("Proyectos");
                }}
              >
                Proyectos
              </a>
            </li> */}
            <li>
              <a
                onClick={() => {
                  navigate("/admin/units");
                  setPageName("Unidades");
                }}
              >
                Unidades
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  navigate("/admin/users");
                  setPageName("Usuarios");
                }}
              >
                Usuarios
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-2xl font-bold text-white">
        Administración
      </div>
      <div className="min-w-[250px] flex justify-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="m-1 btn btn-square btn-ghost">
            <div className="avatar placeholder">
              <div className="bg-secondary text-white rounded-full w-12">
                <span>AD</span>
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Editar perfil</a>
            </li>
            <li>
              <a onClick={() => setUser(null)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                  <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                </svg>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminNavBar;
