import {} from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function ProjectCard({ project }) {
  const navigate = useNavigate();
  return (
    <div>
      {/* <h3>{project.desc_pro}</h3>
      <p>{project.fecha_fin}</p>
      <p>
        {project.observaciones ? project.observaciones : "No hay Observaciones"}
      </p>
      <button onClick={(e) => navigate(`/user/read/${project.id}`)}>
        Modificar
      </button> */}
      <div className="flex">
        <div class="flex justify-center">
          <div class="block rounded-lg shadow-lg bg-white max-w-sm text-center">
            <div class="py-3 px-6 border-b font-medium  bg-rojoUAO-100">{project.desc_pro}</div>
            <div class="p-6">
              <h5 class="text-gray-900 text-xl mb-2">
                Fecha de Inicio: {fecha_ini}
              </h5>
              <h5 class="text-gray-900 text-xl mb-2">
                Fecha de Fin: {fecha_fin}
              </h5>
              <p class="text-gray-700 text-base mb-4">
                {project.observaciones ? project.observaciones : "No hay observaciones"}
              </p>
              <button
                type="button" onClick={(e) => navigate(`/user/read/${project.id}`)}
                class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Editar
              </button>
            </div>
            <div class="py-3 px-6 border-t border-gray-300 text-gray-600">
              2 days ago
            </div>
          </div>
        </div>
        <div>
          
        </div>
        
      </div>
    </div>
    
    
  );
}

export default ProjectCard;
