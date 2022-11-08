import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function ProjectForm() {
  const { projects, allStatus, updateProject, createProject, setAlert } =
    useUser();
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState({
    desc_pro: "",
    fecha_ini: "",
    fecha_fin: "",
    observaciones: "",
  });
  useEffect(() => {
    if (params.id) {
      const temp = projects.find(
        (projectFound) => projectFound.id == params.id
      );
      if (!(typeof temp.fecha_reg == "string")) {
        temp.fecha_reg = `${temp.fecha_reg[0]}-${
          temp.fecha_reg[1] < 10 ? `0${temp.fecha_reg[1]}` : temp.fecha_reg[1]
        }-${
          temp.fecha_reg[2] < 10 ? `0${temp.fecha_reg[2]}` : temp.fecha_reg[2]
        }`;
        temp.fecha_ini = `${temp.fecha_ini[0]}-${
          temp.fecha_ini[1] < 10 ? `0${temp.fecha_ini[1]}` : temp.fecha_ini[1]
        }-${
          temp.fecha_ini[2] < 10 ? `0${temp.fecha_ini[2]}` : temp.fecha_ini[2]
        }`;
        temp.fecha_fin = `${temp.fecha_fin[0]}-${
          temp.fecha_fin[1] < 10 ? `0${temp.fecha_fin[1]}` : temp.fecha_fin[1]
        }-${
          temp.fecha_fin[2] < 10 ? `0${temp.fecha_fin[2]}` : temp.fecha_fin[2]
        }`;
      }
      setProject(temp);
    }
  }, []);
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().slice(0, 10);
    let validationTemp = {};
    let validationPass = true;
    if (project.desc_pro.length > 500) {
      validationTemp = { ...validationTemp, desc_pro_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, desc_pro_length: false };
    }
    if (project.desc_pro === "") {
      validationTemp = { ...validationTemp, desc_pro_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, desc_pro_empty: false };
    }
    if (project.fecha_ini === "") {
      validationTemp = { ...validationTemp, fecha_ini_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, fecha_ini_empty: false };
    }
    if (project.fecha_fin === "") {
      validationTemp = { ...validationTemp, fecha_fin_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, fecha_fin_empty: false };
    }
    if (
      project.fecha_ini.replace("-", "") > project.fecha_fin.replace("-", "")
    ) {
      validationTemp = { ...validationTemp, fecha_mayor: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, fecha_mayor: false };
    }
    if (project.id_estado === undefined) {
      validationTemp = { ...validationTemp, estado_default: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, estado_default: false };
    }
    if (project.observaciones.length > 1000) {
      validationTemp = { ...validationTemp, obs: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, obs: false };
    }
    setValidation(validationTemp);

    if (validationPass) {
      if (params.id) {
        updateProject({
          ...project,
          id: params.id,
        });
        navigate(`/user`);
      } else {
        createProject({
          ...project,
          id: params.id,
          fecha_reg: fechaFormateada,
        });
        navigate("/user");
      }
      setAlert("");
      setTimeout(() => {
        setAlert(" hidden");
      }, 5000);
    }
  }

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
        <div className="modal-box w-11/12 h-11/12 bg-secondary">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-3 h-full bg-white rounded-xl border-black border-2 overflow-auto"
          >
            <h2 className="text-xl font-bold bg-primary -m-2 mb-1 text-white rounded-xl p-2">
              {params.id ? "Modificación de proyecto" : "Creación de proyecto"}
            </h2>
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
                className={`input input-bordered${
                  validation.desc_pro_empty || validation.desc_pro_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={project.desc_pro}
                onChange={handleChange}
              />
              <label htmlFor="desc_pro" className="label">
                <span className="label-text-alt text-error">
                  {validation.desc_pro_empty
                    ? "El campo no debe ser vacío"
                    : ""}
                  {validation.desc_pro_length
                    ? "El campo no debe sobrepasar los 500 carácteres"
                    : ""}
                </span>
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
                  className={`input input-bordered input-secondary${
                    validation.fecha_ini_empty || validation.fecha_mayor
                      ? " input-error"
                      : " input-secondary"
                  }`}
                  value={project.fecha_ini}
                  onChange={handleChange}
                />
                <label htmlFor="" className="label">
                  <span className="label-text-alt text-error">
                    {validation.fecha_ini_empty
                      ? "El campo no debe ser vacío"
                      : ""}
                    {validation.fecha_mayor
                      ? "La fecha de inicio debe ser menor o igual a la fecha de fin"
                      : ""}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold">Fecha de fin</span>
                </label>
                <input
                  type="date"
                  name="fecha_fin"
                  id=""
                  className={`input input-bordered input-secondary${
                    validation.fecha_fin_empty || validation.fecha_mayor
                      ? " input-error"
                      : " input-secondary"
                  }`}
                  value={project.fecha_fin}
                  onChange={handleChange}
                />
                <label className="label">
                  <span className="label-text-alt text-error">
                    {validation.fecha_fin_empty
                      ? "El campo no debe ser vacío"
                      : ""}
                    {validation.fecha_mayor
                      ? "La fecha de fin debe ser mayor o igual a la fecha de inicio"
                      : ""}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label htmlFor="" className="label">
                  <span className="label-text font-bold">Estado</span>
                </label>
                <select
                  name="id_estado"
                  className={`select select-bordered${
                    validation.estado_default
                      ? " select-error"
                      : " select-secondary"
                  }`}
                  value={project.id_estado}
                  onChange={handleChange}
                  defaultValue={-1}
                >
                  <option value={-1} disabled>
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
                  <span className="label-text-alt text-error">
                    {validation.estado_default
                      ? "Debe seleccionar un estado"
                      : ""}
                  </span>
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
                className={`textarea textarea-bordered textarea-secondary${
                  validation.obs ? " textarea-error" : " textarea-secondary"
                }`}
                placeholder="Observaciones...."
                value={
                  project.observaciones == "na" ? "" : project.observaciones
                }
                onChange={handleChange}
              ></textarea>
              <label htmlFor="" className="label">
                <span className="label-text-alt text-error">
                  {validation.obs
                    ? "Alcanzó el máximo número de carácteres permitidos"
                    : ""}
                </span>
              </label>
            </div>
            <div className="mt-2 -ml-3">
              <button className="btn btn-primary text-white rounded-xl w-fit mx-3">
                Guardar
              </button>
              <button
                className="btn btn-secondary text-white rounded-xl w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/user");
                }}
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
