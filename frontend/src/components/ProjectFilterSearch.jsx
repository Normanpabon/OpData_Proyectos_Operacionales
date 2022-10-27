import { useUser } from "../context/UserContext";
import { useRef } from "react";
function ProjectFilterSearch({ setFilterApplied }) {
  const { filterProjectsByName } = useUser();
  const searchBox = useRef(null);
  return (
    <div className="form-control flex flex-row m-1">
      <input
        ref={searchBox}
        type="text"
        placeholder="Search…"
        className="input input-sm input-bordered text-black"
      />
      <button
        onClick={() => {
          filterProjectsByName(searchBox.current.value);
          setFilterApplied(true);
        }}
        className="btn btn-square btn-sm btn-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default ProjectFilterSearch;
