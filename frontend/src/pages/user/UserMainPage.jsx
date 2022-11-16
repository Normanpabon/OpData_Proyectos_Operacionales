import ProjectList from "../../components/ProjectList";
import { useUser } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import UserNavBar from "../../components/user/UserNavBar";
import { useNavigate } from "react-router-dom";
import ProjectFilterBar from "../../components/ProjectFilterBar";
import Footer from "../../components/common/Footer";

function UserMainPage() {
  const { alert, userTitle } = useUser();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <UserNavBar />
      <main className="flex flex-row flex-1 relative">
        <ProjectFilterBar />
        <section className="shadow-2xl mx-auto w-full px-10 pt-2 pb-5 flex flex-col grow">
          <h2 className="text-black font-bold text-2xl">{userTitle}</h2>
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
          <div
            className="tooltip tooltip-left fixed bottom-14 right-2"
            data-tip="Crear un nuevo proyecto"
          >
            <label
              htmlFor="my-modal"
              className="btn btn-primary btn-circle btn-lg modal-button  text-white text-5xl"
              onClick={(e) => navigate(`/user/create/`)}
            >
              +
            </label>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default UserMainPage;
