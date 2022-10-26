import ProjectList from "../../components/ProjectList";
import { useUser } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";
import { useNavigate } from "react-router-dom";

function UserMainPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <UserNavBar />
      <main className="grid grid-cols-1 flex-1">
        <section className="shadow-2xl mx-auto w-11/12 px-10 pt-2 pb-5 flex flex-col relative">
          <h1 className="text-5xl mb-1">Bienvenido, {user.name}</h1>
          <Outlet />
          <ProjectList />
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-circle modal-button absolute bottom-1 right-3 text-white text-bold text-lg"
            onClick={(e) => navigate(`/user/create/`)}
          >
            +
          </label>
        </section>
      </main>
      <footer className="footer footer-center p-4 bg-secondary text-white ">
        <div>
          <p className="inline">
            <img src="/logonuevo.png" className="w-10 inline" />
            Copyright © 2022 - All right reserved by QRO
          </p>
        </div>
      </footer>
    </div>
  );
}

export default UserMainPage;
