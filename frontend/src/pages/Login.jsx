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
      navigate("/user/main", { relative: false });
    } else {
      //toggle classes
    }
  };
  //Render
  return (
    
    <div className="bg-zinc-800 h-screen align-middle" style={{backgroundImage: "url(/src/assets/Background.svg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <h1>Bienvenido</h1>
      <p>Ingreso a Prodata</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-username-login-input">Usuario</label>
        <input
          type="email"
          name="user-login"
          id="user-username-login-input"
          placeholder="juanito.perez@uao.edu.co"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="user-password-login-input">Contrase&ntilde;a</label>
        <input
          type="password"
          name="password-login"
          id="user-password-login-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
