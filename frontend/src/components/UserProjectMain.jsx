import { useNavigate } from "react-router-dom";
function UserProjectMain() {
  const navigate = useNavigate();
  // const fecha = new Date();
  // console.log(fecha.toISOString().slice(0, 10));
  return (
    <div>
      <h1>
        Agrega un proyecto con el boton de abajo, o modifica los existentes con
        su respectivo boton en cada proyecto.
      </h1>
      <button className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => navigate("/user/create")}>Crear Proyecto</button>
      
    </div>
  );
}

export default UserProjectMain;
