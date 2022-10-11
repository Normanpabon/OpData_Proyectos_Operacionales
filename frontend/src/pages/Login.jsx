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
    <section class="h-screen">
      <div className="bg-zinc-800 h-screen align-middle" style={{backgroundImage: "url(/src/assets/Background.svg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
        <img
          src="/src/assets/Banner.svg"
          class="w-full"
          alt="Phone image"
        />
      </div>
      <div  class="rounded-[15px]" className="bg-white shadow-lg p-8 rounded-2xl">
          <img class="pl-24" src="/src/assets/LogoUAO.svg"  alt="" />
          <div
            class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
          >
            <p class="text-center font-semibold mx-4 mb-0">Inicio de Sesión</p>
          </div>
      <form onSubmit={handleSubmit}>

        <label htmlFor="user-username-login-input">Usuario</label>
        <div className="mb-6">
        <input
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="email"
          name="user-login"
          id="user-username-login-input"
          placeholder="juanito.perez@uao.edu.co"
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <label htmlFor="user-password-login-input">Contrase&ntilde;a</label>
        <div className="mb-6">
        <input
        class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          type="password"
          name="password-login"
          id="user-password-login-input"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button
            type="submit"
            class="inline-block px-7 py-3 bg-rojoUAO text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            Enviar
          </button>
      </form>
      </div>
      </div>     
      </div>
      
    </section>
    
  );
}

export default Login;
