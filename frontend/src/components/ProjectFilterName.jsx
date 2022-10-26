import { useUser } from "../context/UserContext";
function ProjectFilterName() {
  const { allStatus, orderProjectsByName } = useUser();
  const {} = useUser();
  const asc = () => {};
  const des = () => {};
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-primary text-white btn-sm m-1">
        Nombre
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-fit"
      >
        <li>
          <p onClick={() => orderProjectsByName("asc")}>Ascendente</p>
        </li>
        <li>
          <p onClick={() => orderProjectsByName("des")}>Descendente</p>
        </li>
      </ul>
    </div>
  );
}

export default ProjectFilterName;
