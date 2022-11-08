import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function UnitForm() {
  const { units, updateUnit, createUnit, setAlert, users } = useUser();
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [unit, setUnit] = useState({
    nombre_unidad: "",
  });
  useEffect(() => {
    if (params.id) {
      const temp = units.find((unitFound) => unitFound.id == params.id);
      setUnit(temp);
    }
  }, []);

  const handleChange = (e) => {
    setUnit({ ...unit, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationTemp = {};
    let validationPass = true;
    if (unit.nombre_unidad === "") {
      validationTemp = { ...validationTemp, nombre_unidad_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, nombre_unidad_empty: false };
    }
    if (unit.nombre_unidad.length > 100) {
      validationTemp = { ...validationTemp, nombre_unidad_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, nombre_unidad_length: false };
    }
    if (unit.uid_jefe === undefined) {
      validationTemp = { ...validationTemp, jefe_default: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, jefe_default: false };
    }
    setValidation(validationTemp);
    if (validationPass) {
      if (params.id) {
        updateUnit({
          ...unit,
          id: params.id,
        });
        navigate("/admin/units");
      } else {
        createUnit(unit);
        navigate("/admin/units");
      }
      setAlert("");
      setTimeout(() => {
        setAlert(" hidden");
      }, 5000);
    }
  };

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
              {params.id ? "Modificación de unidad" : "Creación de unidad"}
            </h2>
            <div className="form-control">
              <label htmlFor="nombre_estado" className="label">
                <span className="label-text font-bold">
                  Nombre de la unidad
                </span>
              </label>
              <input
                type="text"
                name="nombre_unidad"
                id="nombre_unidad"
                className={`input input-bordered${
                  validation.nombre_unidad_empty ||
                  validation.nombre_unidad_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={unit.nombre_unidad}
                onChange={handleChange}
              />
              <label htmlFor="nombre_unidad" className="label">
                <span className="label-text-alt text-error">
                  {validation.nombre_unidad_empty
                    ? "El campo no debe estar vacío"
                    : ""}
                  {validation.nombre_unidad_length
                    ? "El campo no debe sobrepasar los 100 carácteres"
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-bold">Jefe de unidad</span>
              </label>
              <select
                name="uid_jefe"
                className={`select select-bordered${
                  validation.jefe_default
                    ? " select-error"
                    : " select-secondary"
                }`}
                value={unit.uid_jefe}
                onChange={handleChange}
                defaultValue={-1}
              >
                <option value={-1} disabled>
                  Seleccione un jefe o No Asignado
                </option>
                <option value={1}>No Asignado</option>
                {users.map((chief) => {
                  if (chief.rol == "ROLE_JefeUnidad") {
                    return (
                      <option value={chief.cod_ins} key={chief.id}>
                        {`${chief.cod_ins} ${chief.nombre} ${chief.apellido}`}
                      </option>
                    );
                  }
                })}
              </select>
              <label htmlFor="" className="label">
                <span className="label-text-alt text-error">
                  {validation.jefe_default
                    ? "Debe seleccionar un Jefe o No Asignado"
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
                  navigate("/admin/units");
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

export default UnitForm;
