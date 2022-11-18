import { useState } from "react";
import { useNavigate } from "react-router-dom";
function UserCard({ user }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={`shadow-lg border-2 border-gray-100 rounded-xl py-2 px-3 m-3 flex flex-col h-fit relative
  }`}
      onClick={() => setOpen(~open)}
    >
      <p
        className={`badge mt-1 mb-3 absolute -top-3 -right-2 text-white ${
          user.habilitado ? "badge-success" : "badge-error"
        }`}
      >
        {user.habilitado ? "Habilitado" : "No Habilitado"}
      </p>
      <h3
        className={`text-lg font-bold mb-1 text-white bg-primary rounded-lg py-1 px-2 text-justify overflow-hidden ${
          open ? "" : "max-h-9"
        }`}
      >
        {`${user.nombre} ${user.apellido}`}
      </h3>
      <div className="grid grid-cols-1 px-3 py-2 bg-gray-300 rounded-lg mb-2 relative">
        <p className="font-bold">Código:</p>
        <p className="col-span-2">{user.cod_ins}</p>
        <p className="font-bold">Rol:</p>
        <p className="col-span-2">
          {user.rol === "ROLE_JefeUnidad" ? "Jefe de Unidad" : "Administrador"}
        </p>
        <p className={`font-bold`}>Correo:</p>
        <p className={`col-span-2`}>{user.correo}</p>
        <p className={`font-bold`}>Usuario:</p>
        <p className={`col-span-2`}>{user.username}</p>
      </div>
      <label
        htmlFor="my-modal"
        className={`btn btn-primary modal-button text-white rounded-3xl w-fit self-end mt-3 ${
          open ? "" : "hidden"
        }`}
        onClick={(e) => navigate(`/admin/users/edit/${user.id}`)}
      >
        Editar
      </label>
    </div>
  );
}

export default UserCard;
