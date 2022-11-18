import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { allStatus, formatDate } = useUser();
  const estado = allStatus.find(
    (status) => status.id === project.id_estado
  ).estado;
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div
      className={`shadow-lg border-2 border-gray-100 rounded-xl py-2 px-3 m-3 flex flex-col h-fit relative
      }`}
      onClick={() => setOpen(~open)}
    >
      <h3
        className={`text-lg font-bold mb-1 text-white bg-primary rounded-lg py-1 px-2 text-justify overflow-hidden ${
          open ? "" : "max-h-9"
        }`}
      >
        {project.desc_pro}
      </h3>
      <p
        className={`badge mt-1 mb-3 absolute -top-5 -right-5 badge-secondary ${
          project.id_estado == 2 ? "text-black badge-warning" : ""
        } ${project.id_estado == 1 ? "text-white badge-success" : ""} ${
          project.id_estado == 3 ? "text-white badge-error" : ""
        }`}
      >
        {estado}
      </p>
      <div className="grid grid-cols-2 px-3 bg-gray-300 rounded-lg mb-2 relative">
        <p className="font-bold">Registro:</p>
        <p className="text-right">
          {formatDate(project.fecha_reg).toLocaleString("es-SP", options)}
        </p>
        <p className="font-bold">Inicio:</p>
        <p className="text-right">
          {formatDate(project.fecha_ini).toLocaleString("es-SP", options)}
        </p>
        <p className="font-bold">Finalización:</p>
        <p className="text-right">
          {formatDate(project.fecha_fin).toLocaleString("es-SP", options)}
        </p>
      </div>
      <div
        className={`border-primary border-2 overflow-auto rounded-xl p-2 text-justify ${
          open ? "" : "hidden"
        }`}
      >
        <p>
          {project.observaciones != "na"
            ? project.observaciones
            : "No hay Observaciones"}
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
