import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function ProjectForm() {
  const { projects, allStatus, updateProject, createProject } = useUser();
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
      navigate(`/user`);
    } else {
      createProject({ ...project, id: params.id, fecha_reg: fechaFormateada });
      navigate("/user");
    }
  };

  const fechaRegistroComponente = (
    <div className="form-control">
      <label htmlFor="" className="label">
        <span className="label-text font-bold">Fecha de registro</span>
      </label>
      <input
        type="date"
        name="fecha_reg"
        id=""
        className="input input-bordered input-secondary"
        value={project.fecha_reg}
        onChange={handleChange}
      />
      <label className="label">
        <span className="label-text-alt"></span>
      </label>
    </div>
  );

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 h-11/12 bg bg-primary over">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-3 h-full bg-white rounded-xl border-black border-2 overflow-auto"
          >
            <div className="form-control">
              <label htmlFor="desc_pro" className="label">
                <span className="label-text font-bold">
                  Nombre/Descripción del proyecto
                </span>
              </label>
              <input
                type="text"
                name="desc_pro"
                id="desc_pro"
                className="input input-bordered input-secondary"
                value={project.desc_pro}
                onChange={handleChange}
              />
              <label htmlFor="desc_pro" className="label">
                <span className="label-text-alt"></span>
              </label>
            </div>
            <div className="grid grid-cols-2">
              {params.id ? fechaRegistroComponente : <></>}
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text font-bold">Fecha de inicio</span>
                </label>
                <input
                  type="date"
                  name="fecha_ini"
                  id=""
                  className="input input-bordered input-secondary"
                  value={project.fecha_ini}
                  onChange={handleChange}
                />
                <label htmlFor="" className="label">
                  <span className="label-text-alt"></span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">
                    Fecha finalizacion
                  </span>
                </label>
                <input
                  type="date"
                  name="fecha_fin"
                  id=""
                  className="input input-bordered input-secondary"
                  value={project.fecha_fin}
                  onChange={handleChange}
                />
                <label className="label">
                  <span className="label-text-alt"></span>
                </label>
              </div>
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text font-bold">Estado</span>
                </label>
                <select
                  name="id_estado"
                  id=""
                  className="select select-secondary select-bordered"
                  value={project.id_estado}
                  onChange={handleChange}
                >
                  <option disabled selected>
                    Seleccione un estado
                  </option>
                  {allStatus.map((state) => {
                    return (
                      <option value={state.id} key={state.id}>
                        {state.estado}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="" className="label">
                  <span className="label-text-alt"></span>
                </label>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-bold">Observaciones</span>
              </label>
              <textarea
                name="observaciones"
                id=""
                className="textarea textarea-bordered textarea-secondary"
                placeholder="Observaciones...."
                value={project.observaciones}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="" className="label">
                <span className="label-text-alt"></span>
              </label>
            </div>
            <div className="self-end mt-3">
              <button className="btn btn-primary text-white rounded-3xl w-fit mx-3">
                Guardar
              </button>
              <button
                className="btn btn-secondary text-white rounded-3xl w-fit"
                onClick={() => navigate("/user")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;
