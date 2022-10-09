import { useUser } from "../context/UserContext";
import ProyectCard from "./ProyectCard";
function ProyectList() {
  const { user, projects } = useUser();
  console.log(projects, user);
  return (
    <div>
      {projects.map((project) => {
        return <ProyectCard key={project.id} project={project} />;
      })}
    </div>
  );
}

export default ProyectList;
