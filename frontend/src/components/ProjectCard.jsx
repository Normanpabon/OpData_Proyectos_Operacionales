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
      <button onClick={(e) => navigate(`/user/read/${project.id}`)}>
        Modificar
      </button>
    </div>
  );
}

export default ProjectCard;
