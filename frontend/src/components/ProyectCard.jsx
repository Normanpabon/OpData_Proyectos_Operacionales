import {} from "../context/UserContext";
function ProyectCard({ project }) {
  return (
    <div>
      <h3>{project.desc_pro}</h3>
      <p>{project.fecha_fin}</p>
      <p>
        {project.observaciones ? project.observaciones : "No hay Observaciones"}
      </p>
    </div>
  );
}

export default ProyectCard;
