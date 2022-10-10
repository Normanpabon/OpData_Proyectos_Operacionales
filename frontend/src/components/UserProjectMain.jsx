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
      <button onClick={() => navigate("/user/create")}>Crear Proyecto</button>
    </div>
  );
}

export default UserProjectMain;
