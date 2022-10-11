import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import ProjectCard from "./ProjectCard";
function ProjectList() {
  const { projects, getProjectsByUnit, getAllStatus } = useUser();
  useEffect(() => {
    getProjectsByUnit();
    getAllStatus();
  }, []);
  return (
    <div className="columns-3 m-2 p-8 bg-gray-300 h-full">
      {projects.map((project) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
}

export default ProjectList;
