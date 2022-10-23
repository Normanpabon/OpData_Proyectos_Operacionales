import { useUser } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function ProjectRead() {
  const { projects, allStatus } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((proj) => proj.id == id);
  const status = allStatus.find((stat) => stat.id == project.id_estado);
  return (
    <>
      <div className="modal-box">
        <h2>Nombre: {project.desc_pro}</h2>
        <h3>Fecha Registro: {project.fecha_reg}</h3>
        <h3>Fecha Inicio: {project.fecha_ini}</h3>
        <h3>Fecha Fin: {project.fecha_fin}</h3>
        <h3>Estado: {status.estado}</h3>
        <p>
          Observaciones:
          {project.observaciones ? (
            <p>No hay observaciones</p>
          ) : (
            project.observaciones
          )}
        </p>
        <label
          htmlFor="my-modal-form"
          className="btn btn-primary modal-button"
          onClick={(e) => navigate(`/user/edit/${project.id}`)}
        >
          Modificar
        </label>
        {/* <button onClick={() => navigate(`/user/edit/${project.id}`)}>
            Modificar
          </button> */}
      </div>
    </>
  );
}

export default ProjectRead;
