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
    <>
      <div className="h-full shadow-xl rounded-xl pt-2 border-2 border-black pb-2">
        <div className="w-[99%] mx-auto h-10 bg-black rounded-xl mb-1 text-white text-center">
          Aqui irían los filtros, si tuvieramos unos
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
