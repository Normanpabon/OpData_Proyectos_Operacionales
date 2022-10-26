import ProjectFilterDate from "./ProjectFilterDate";
import ProjectFilterName from "./ProjectFilterName";
import ProjectFilterStatus from "./ProjectFilterStatus";
import { useUser } from "../context/UserContext";
import ProjectFilterSearch from "./ProjectFilterSearch";
function ProjectFilterBar() {
  const { clearFilters } = useUser();
  return (
    <div className="w-[99%] mx-auto h-10 bg-secondary rounded-xl mb-1 text-white flex flex-row">
      <ProjectFilterName />
      <ProjectFilterDate />
      <ProjectFilterStatus />
      <button
        onClick={clearFilters}
        className="btn btn-primary text-white btn-sm mt-1"
      >
        Clear
      </button>
      <ProjectFilterSearch />
    </div>
  );
}

export default ProjectFilterBar;
