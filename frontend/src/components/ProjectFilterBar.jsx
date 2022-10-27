import ProjectFilterDate from "./ProjectFilterDate";
import ProjectFilterName from "./ProjectFilterName";
import ProjectFilterStatus from "./ProjectFilterStatus";
import { useUser } from "../context/UserContext";
import ProjectFilterSearch from "./ProjectFilterSearch";
import { useState } from "react";
function ProjectFilterBar() {
  const { clearFilters } = useUser();
  const [filterApplied, setFilterApplied] = useState(false);
  return (
    <div className="w-[99%] mx-auto h-10 bg-secondary rounded-xl mb-1 text-white flex flex-row">
      <ProjectFilterName setFilterApplied={setFilterApplied} />
      <ProjectFilterDate setFilterApplied={setFilterApplied} />
      <ProjectFilterStatus setFilterApplied={setFilterApplied} />
      <button
        onClick={() => {
          clearFilters();
          setFilterApplied(false);
        }}
        className={`btn btn-primary text-white btn-sm mt-1 ${
          filterApplied ? "" : "hidden"
        }`}
      >
        Quitar Filtros
      </button>
      <ProjectFilterSearch setFilterApplied={setFilterApplied} />
    </div>
  );
}

export default ProjectFilterBar;
