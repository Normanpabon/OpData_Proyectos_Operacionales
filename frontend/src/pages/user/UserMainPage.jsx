import { useEffect, useState } from "react";
import ProjectList from "../../components/ProjectList";
import ProjectForm from "../../components/ProjectForm";
import { useUser } from "../../context/UserContext";
import { useParams, Outlet } from "react-router-dom";

function UserMainPage() {
  const { user } = useUser();
  const [page, setPage] = useState("default");
  const params = useParams();

  useEffect(() => {
    setPage(params);
  }, []);

  // var component = null;

  // switch (page.estado) {
  //   case "create":
  //     component = <h1>Hola</h1>;
  //     break;
  //   case "edit":
  //     component = <h1>Hola</h1>;
  //   default:
  //     component = <ProjectForm />;
  //     break;
  // }

  return (
    <div>
      <h1>Bienvenido, {user.name}</h1>
      {/* {component} */}
      <Outlet />
      <ProjectList />
    </div>
  );
}

export default UserMainPage;
