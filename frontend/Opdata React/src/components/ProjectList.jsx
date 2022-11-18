import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ProjectCard from "./ProjectCard";
function ProjectList() {
  const { filteredProjects, getProjectsByUnit, getAllStatus, setUser } =
    useUser();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getProjectsByUnit()
      .then(() =>
        getAllStatus()
          .then(() => setLoading(false))
          .catch(() => {
            setUser(null);
            navigate("/serverDown");
          })
      )
      .catch(() => {
        setUser(null);
        navigate("/serverDown");
      });
  }, []);
  return (
    <>
      <div className="h-full shadow-xl rounded-xl border-2 border-secondary pb-2 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-4">
          {loading
            ? "Loading"
            : filteredProjects.map((project) => {
                return <ProjectCard key={project.id} project={project} />;
              })}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
