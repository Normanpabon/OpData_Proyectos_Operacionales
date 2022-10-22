import {} from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function ProjectCard({ project }) {
  const navigate = useNavigate();
  return (
    <div>
      <h3>{project.desc_pro}</h3>
      <p>{project.fecha_fin}</p>
      <p>
        {project.observaciones ? project.observaciones : "No hay Observaciones"}
      </p>
      <label
        htmlFor="my-modal"
        className="btn btn-primary modal-button"
        onClick={(e) => navigate(`/user/read/${project.id}`)}
      >
        Modificar
      </label>
    </div>
  );
}

export default ProjectCard;
