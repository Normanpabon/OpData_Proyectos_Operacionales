import ProjectList from "../../components/ProjectList";
import { useUser } from "../../context/UserContext";
import { Outlet } from "react-router-dom";

function UserMainPage() {
  const { user } = useUser();
  return (
    <div className="">
      <h1>Bienvenido, {user.name}</h1>
      <Outlet />
      <ProjectList />
    </div>
  );
}

export default UserMainPage;
