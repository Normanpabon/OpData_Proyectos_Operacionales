import ProjectList from "../../components/ProjectList";
import { useUser } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import UserNavBar from "../../components/UserNavBar";
import { useNavigate } from "react-router-dom";
import ProjectFilterBar from "../../components/ProjectFilterBar";

function UserMainPage() {
  const { user, alert } = useUser();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <UserNavBar />
      <main className="flex flex-row flex-1 relative">
        <ProjectFilterBar />
        <section className="shadow-2xl mx-auto w-full px-10 pt-2 pb-5 flex flex-col grow">
          <h2 className="text-black font-bold text-2xl">Todos los proyectos</h2>
          <div className={`alert alert-success shadow-lg ${alert}`}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>¡Operación exitosa!</span>
            </div>
          </div>
          <Outlet />
          <ProjectList />
          <label
            htmlFor="my-modal"
            className="btn btn-primary btn-circle btn-lg modal-button fixed bottom-14 right-2 text-white text-5xl"
            onClick={(e) => navigate(`/user/create/`)}
          >
            +
          </label>
        </section>
      </main>
      <footer className="footer footer-center p-4 bg-accent h-12 text-white ">
        <div className="-mt-2">
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
