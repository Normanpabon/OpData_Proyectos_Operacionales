import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
function UserNavBar() {
  const navigation = useNavigate();
  const { setUser, user } = useUser();
  return (
    <div className="navbar bg-primary shadow-lg">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-white normal-case text-3xl"
          onClick={() => navigation("/user")}
        >
          OpData
        </a>

        <div className="text-center text-2xl font-bold flex-1 text-white">
          {user.nombre_unidad}
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="m-1 btn btn-square btn-ghost">
          <div className="avatar placeholder">
            <div className="bg-secondary text-white rounded-full w-12">
              <span>{user.nombre.slice(0, 2)}</span>
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
  );
}

export default UserNavBar;
