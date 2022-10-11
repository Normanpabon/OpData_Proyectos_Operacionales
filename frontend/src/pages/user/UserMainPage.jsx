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
    <div className="bg-zinc-800 h-screen align-middle" style={{backgroundImage: "url(/src/assets/Background.svg)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div class="relative h-32 w-full">
        <img src="/src/assets/Banner.svg" alt="" className="float-right h-20 pt-6 pr-6"/>
      </div>
      <div className="h-full bg-white">
      <div className="w-auto align-middle">
        <h1 className="text-center text-xl">Bienvenido, {user.name}</h1>
      </div>
      <Outlet />
      <ProjectList />
      </div>
      
      
      {/* {component} */}
      
    </div>
  );
}

export default UserMainPage;
