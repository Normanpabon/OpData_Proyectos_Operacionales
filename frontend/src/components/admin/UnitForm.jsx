import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function UnitForm() {
  const { units, updateUnit, createUnit, setAlert, users, setUser } = useUser();
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [unit, setUnit] = useState({
    nombre_unidad: "",
    habilitado: false,
  });
  const [actualChief, setActualChief] = useState(0);
  useEffect(() => {
    if (params.id) {
      const temp = units.find((unitFound) => unitFound.id == params.id);
      setActualChief(temp.uid_jefe);
      setUnit(temp);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "habilitado") {
      setUnit({ ...unit, habilitado: e.target.checked });
    } else {
      setUnit({ ...unit, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationTemp = {};
    let validationPass = true;
    if (unit.nombre_unidad === "") {
      validationTemp = { ...validationTemp, nombre_unidad_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, nombre_unidad_empty: false };
    }
    if (unit.nombre_unidad.length > 128) {
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
    if (params.id) {
      if (actualChief == unit.uid_jefe) {
        validationTemp = { ...validationTemp, jefe_taken: false };
      } else {
        const exist = units.find((unitFound) => {
          return unitFound.uid_jefe == unit.uid_jefe;
        });
        if (exist == undefined) {
          validationTemp = { ...validationTemp, jefe_taken: false };
        } else {
          validationTemp = { ...validationTemp, jefe_taken: true };
          validationPass = false;
        }
      }
    } else {
      if (unit.uid_jefe == 1) {
        validationTemp = { ...validationTemp, jefe_taken: false };
      } else {
        const exist = units.find((unitFound) => {
          return unitFound.uid_jefe == unit.uid_jefe;
        });
        if (exist == undefined) {
          validationTemp = { ...validationTemp, jefe_taken: false };
        } else {
          validationTemp = { ...validationTemp, jefe_taken: true };
          validationPass = false;
        }
      }
    }
    setValidation(validationTemp);
    if (validationPass) {
      if (params.id) {
        const res = await updateUnit({
          ...unit,
          id: params.id,
        });
        console.log(res);
        if (res == true) {
          navigate("/admin/units");
          setAlert("");
          setTimeout(() => {
            setAlert(" hidden");
          }, 3000);
        } else {
          setUser(null);
          navigate("/serverDown");
        }
      } else {
        const res = await createUnit(unit);
        if (res === true) {
          navigate("/admin/units");
          setAlert("");
          setTimeout(() => {
            setAlert(" hidden");
          }, 3000);
        } else {
          setUser(null);
          navigate("/serverDown");
        }
      }
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
                  Nombre de la unidad <span className="text-red-600">*</span>
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
                    ? "El campo es obligatorio"
                    : ""}
                  {validation.nombre_unidad_length
                    ? "La longitud del nombre debe ser de máximo 128 caracteres"
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="" className="label">
                <span className="label-text font-bold">
                  Jefe de unidad <span className="text-red-600">*</span>
                </span>
              </label>
              <select
                name="uid_jefe"
                className={`select select-bordered${
                  validation.jefe_default || validation.jefe_taken
                    ? " select-error"
                    : " select-secondary"
                }`}
                value={unit.uid_jefe}
                onChange={handleChange}
                defaultValue={-1}
              >
                <option value={-1} disabled>
                  Seleccione un jefe o No Asignado*
                </option>
                <option value={1}>No Asignado</option>
                {users.map((chief) => {
                  if (chief.rol == "ROLE_JefeUnidad") {
                    return (
                      <option
                        value={chief.cod_ins}
                        disabled={!chief.habilitado}
                        key={chief.id}
                      >
                        {`${chief.cod_ins} ${chief.nombre} ${chief.apellido}`}
                      </option>
                    );
                  }
                })}
              </select>
              <label htmlFor="" className="label">
                <span className="label-text-alt text-error">
                  {validation.jefe_default
                    ? "Debe seleccionar un usuario o No Asignado"
                    : ""}
                  {validation.jefe_taken
                    ? "Ese usuario ya tiene una unidad asignada"
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="habilitado" className="label">
                <span className="label-text font-bold text-lg">
                  ¿Habilitar?
                </span>

                <input
                  type="checkbox"
                  name="habilitado"
                  id="habilitado"
                  className={`checkbox checkbox-primary checkbox-lg`}
                  checked={!!unit.habilitado}
                  onChange={handleChange}
                />
              </label>
            </div>
            <p className="text-xs">
              <span className="text-red-600">*</span> Campos Obligatorios
            </p>
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
