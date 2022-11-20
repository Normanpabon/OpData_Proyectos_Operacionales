import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import Logo from "../assets/Logo_OpData.png";

function Login() {
  const { userAuth } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(["", " hidden"]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userValidation = await userAuth(username, password);
    if (userValidation[1] === true) {
      if (userValidation[0] === "ROLE_Administrador") {
        navigate("/admin/units", { relative: false });
      } else if (userValidation[0] === "ROLE_JefeUnidad") {
        navigate("/user", { relative: false });
      }
    } else {
      if (userValidation.response.status == 401) {
        setIncorrect(["Credenciales incorrectas, intente de nuevo", ""]);
        setTimeout(() => setIncorrect(["", " hidden"]), 5000);
      } else {
        setIncorrect([userValidation.response.data, ""]);
        setTimeout(() => setIncorrect(["", " hidden"]), 5000);
      }
    }
  };
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2 w-full h-screen"
      id="root-login"
    >
      <div className=""></div>
      <div className="p-10 bg-white content-center grid grid-cols-1 h-screen md:h-full">
        <img src={Logo} className="max-w-[400px] w-full mx-auto mb-0]" />
        <form className="grid grid-cols-1 mx-auto w-full max-w-[400px]">
          <div className={`alert alert-error shadow-lg${incorrect[1]}`}>
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
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{incorrect[0]}</span>
            </div>
          </div>
          <label
            className="text-black text-lg mb-2"
            htmlFor="user-username-login-input"
          >
            Usuario
          </label>
          <input
            className="input input-bordered mb-1 input-accent"
            type="email"
            name="user-login"
            id="user-username-login-input"
            placeholder="juanito.perez@uao.edu.co"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            className="text-black text-lg mb-2"
            htmlFor="user-password-login-input"
          >
            Contrase&ntilde;a
          </label>
          <input
            className="input input-bordered mb-1 input-accent"
            type="password"
            name="password-login"
            id="user-password-login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-primary mt-3 max-w-xs mx-auto text-white border-white hover:border-white"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
