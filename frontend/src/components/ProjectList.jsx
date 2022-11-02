import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import ProjectCard from "./ProjectCard";
import ProjectFilterBar from "./ProjectFilterBar";
function ProjectList() {
  const { filteredProjects, getProjectsByUnit, getAllStatus } = useUser();
  useEffect(() => {
    getProjectsByUnit();
    getAllStatus();
  }, []);
  return (
    <>
      <div className="h-full shadow-xl rounded-xl border-2 border-secondary pb-2 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4">
          {filteredProjects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
