import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function ProjectForm() {
  const { projects, allStatus, updateProject, createProject, user } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState([]);
  useEffect(() => {
    if (params.id) {
      setProject(projects.find((projectFound) => projectFound.id == params.id));
    }
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().slice(0, 10);
    if (params.id) {
      updateProject({ ...project, id: params.id, fecha_reg: fechaFormateada });
      navigate(`/user/read/${params.id}`);
    } else {
      createProject({ ...project, id: params.id, fecha_reg: fechaFormateada });
      navigate("/user/main");
    }
  };

  const fechaRegistroComponente = (
    <>
      <label htmlFor="">Fecha de registro</label>
      <input
        type="date"
        name="fecha_reg"
        id=""
        value={project.fecha_reg}
        onChange={handleChange}
      />
    </>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nombre/Descripción del proyecto</label>
        <input
          type="text"
          name="desc_pro"
          id=""
          value={project.desc_pro}
          onChange={handleChange}
        />
        {params.id ? fechaRegistroComponente : <></>}
        <label htmlFor="">Fecha de inicio</label>
        <input
          type="date"
          name="fecha_ini"
          id=""
          value={project.fecha_ini}
          onChange={handleChange}
        />
        <label htmlFor="">Fecha finalizacion</label>
        <input
          type="date"
          name="fecha_fin"
          id=""
          value={project.fecha_fin}
          onChange={handleChange}
        />
        <label htmlFor="">Estado</label>
        <select
          name="id_estado"
          id=""
          value={project.id_estado}
          onChange={handleChange}
        >
          <option value="-1">Seleccione un estado</option>
          {allStatus.map((state) => {
            return (
              <option value={state.id} key={state.id}>
                {state.estado}
              </option>
            );
          })}
        </select>
        <textarea
          name="observaciones"
          id=""
          cols="30"
          rows="10"
          placeholder="Observaciones...."
          value={project.observaciones}
          onChange={handleChange}
        ></textarea>
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default ProjectForm;
