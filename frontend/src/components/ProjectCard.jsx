import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { allStatus } = useUser();
  const estado = allStatus.find(
    (status) => status.id === project.id_estado
  ).estado;
  return (
    <div
      className={`shadow-lg border-2 border-gray-100 rounded-xl py-2 px-3 m-3 flex flex-col h-fit`}
      onClick={() => setOpen(~open)}
    >
      <h3
        className={`text-lg font-bold mb-1 text-white bg-primary rounded-lg py-1 px-2 text-justify ${
          open ? "" : "max-h-9"
        }`}
      >
        {/* {project.desc_pro} */}
        Proyecto con un titulo que tenga el maximo de caracteres permitidos para
        el campo, para asi acomodar las dimensiones en el front
      </h3>
      <div className="grid grid-cols-2 px-3 bg-gray-300 rounded-lg mb-2">
        <p className="font-bold">Registro:</p>
        <p className="text-right">{project.fecha_reg}</p>
        <p className="font-bold">Inicio:</p>
        <p className="text-right">{project.fecha_ini}</p>
        <p className="font-bold">Finalización:</p>
        <p className="text-right">{project.fecha_fin}</p>
        <p className="badge badge-black text-white mt-1 mb-3">{estado}</p>
      </div>
      <div
        className={`border-primary border-2 overflow-auto rounded-xl p-2 text-justify ${
          open ? "" : "hidden"
        }`}
      >
        <p>
          {/* {project.observaciones
            ? project.observaciones
            : "No hay Observaciones"} */}
          Observación que tiene la máxima cantidad de caracteres posibles para
          el campo con el objetivo de organizar las dimensiones del frontend por
          lo cual se trata en lo posible de escribir los caracteres máximos los
          cuales serían 256 caracteres que irían en este
        </p>
      </div>
      <label
        htmlFor="my-modal"
        className={`btn btn-primary modal-button text-white rounded-3xl w-fit self-end mt-3 ${
          open ? "" : "hidden"
        }`}
        onClick={(e) => navigate(`/user/edit/${project.id}`)}
      >
        Editar
      </label>
    </div>
  );
}

export default ProjectCard;
