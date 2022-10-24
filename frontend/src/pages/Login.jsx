import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { users } from "../test-data/users";
import { useState } from "react";

function Login() {
  //Contexto
  const { setUser } = useUser();
  //Estados
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(" hidden");
  //Otros
  const navigate = useNavigate();
  //Funciones
  const handleSubmit = (e) => {
    e.preventDefault();
    const userValidation = users.find(
      (user) => user.email === username && user.password === password
    );
    if (userValidation) {
      const { name, role, unit } = userValidation;
      setUser({ name, role, unit });
      navigate("/user", { relative: false });
    } else {
      setIncorrect("");
      setTimeout(() => setIncorrect(" hidden"), 5000);
    }
  };
  //Render
  return (
    <main className="grid grid-cols-2 w-full h-screen" id="root-login">
      <div className=""></div>
      <div className="p-10 bg-white content-center grid grid-cols-1">
        <img
          src="/public/Logo_OpData.png"
          className="max-w-[400px] w-full mx-auto mb-0]"
        />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 mx-auto w-full max-w-[400px]"
        >
          <div className={"alert alert-error shadow-lg" + incorrect}>
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
              <span>Credenciales incorrectas intente de nuevo</span>
            </div>
          </div>
          <label
            className="text-black text-lg mb-2"
            htmlFor="user-username-login-input"
          >
            Usuario
          </label>
          <input
            className="input input-bordered mb-1 input-primary"
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
            className="input input-bordered mb-1 input-primary"
            type="password"
            name="password-login"
            id="user-password-login-input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary mt-3 max-w-xs mx-auto text-white border-white hover:border-white">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
