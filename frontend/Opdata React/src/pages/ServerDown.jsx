import { useNavigate } from "react-router-dom";
function ServerDown() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen bg-secondary">
      <div className="flex flex-row h-full">
        <div className="mx-auto w-11/12 p-3 text-white">
          <h2 className="text-xl font-bold">Hubo un problema</h2>
          <p className>El servidor no responde, porfavor intentelo mas tarde</p>
          <a
            onClick={() => navigate("/")}
            className="link text-white hover:text-primary"
          >
            Volver al login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServerDown;
