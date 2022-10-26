import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import ProjectCard from "./ProjectCard";
import ProjectFilterBar from "./ProjectFilterBar";
function ProjectList() {
  const {
    filteredProjects,
    setFilteredProjects,
    getProjectsByUnit,
    getAllStatus,
    orderProjectsByStatus,
    projects,
  } = useUser();
  useEffect(() => {
    getProjectsByUnit();
    getAllStatus();
  }, []);
  return (
    <>
      <div className="h-full shadow-xl rounded-xl pt-2 border-2 border-secondart pb-2">
        <ProjectFilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {filteredProjects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
