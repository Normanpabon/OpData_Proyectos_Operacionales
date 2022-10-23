import {} from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
function ProjectCard({ project }) {
  const navigate = useNavigate();
  const { allStatus } = useUser();
  const estado = allStatus.find(
    (status) => status.id === project.id_estado
  ).estado;
  return (
    <div className="shadow-lg border-2 border-gray-100 rounded-xl min-w-[300px] min-h-[300px] max-h-[300px] max-w-[400px] mx-auto py-2 px-3 my-5">
      <h3 className="text-lg font-bold mb-1 text-white bg-primary rounded-lg px-2">
        {project.desc_pro}
      </h3>
      <p>Registro:</p>
      <p>{project.fecha_reg}</p>
      <p>Inicio:</p>
      <p>{project.fecha_ini}</p>
      <p>Finalización:</p>
      <p>{project.fecha_fin}</p>
      <p className="badge badge-black text-white">{estado}</p>
      <div className="border-black border-2">
        <p>
          {project.observaciones
            ? project.observaciones
            : "No hay Observaciones"}
        </p>
      </div>
      <label
        htmlFor="my-modal"
        className="btn btn-primary modal-button text-white rounded-3xl"
        onClick={(e) => navigate(`/user/edit/${project.id}`)}
      >
        Editar
      </label>
    </div>
  );
}

export default ProjectCard;
