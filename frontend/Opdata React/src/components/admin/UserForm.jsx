import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
function UserForm() {
  const { users, updateUser, createUser, setAlert } = useUser();
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({
    cod_ins: "",
    nombre: "",
    apellido: "",
    username: "",
    correo: "",
    hashed_pass: "",
    habilitado: true,
  });

  useEffect(() => {
    if (params.id) {
      const temp = users.find((userFound) => userFound.id == params.id);
      setUser(temp);
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "habilitado") {
      setUser({ ...user, habilitado: e.target.checked });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationTemp = {};
    let validationPass = true;
    if (user.cod_ins === "") {
      validationTemp = { ...validationTemp, cod_ins_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, cod_ins_empty: false };
    }
    if (user.cod_ins > 0) {
      validationTemp = { ...validationTemp, cod_ins_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, cod_ins_length: false };
    }
    if (user.nombre === "") {
      validationTemp = { ...validationTemp, nombre_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, nombre_empty: false };
    }
    if (user.nombre.length > 64) {
      validationTemp = { ...validationTemp, nombre_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, nombre_length: false };
    }
    if (user.apellido === "") {
      validationTemp = { ...validationTemp, apellido_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, apellido_empty: false };
    }
    if (user.apellido.length > 64) {
      validationTemp = { ...validationTemp, apellido_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, apellido_length: false };
    }
    if (user.username === "") {
      validationTemp = { ...validationTemp, username_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, username_empty: false };
    }
    if (user.username.length > 64) {
      validationTemp = { ...validationTemp, username_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, username_length: false };
    }
    if (user.correo === "") {
      validationTemp = { ...validationTemp, correo_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, correo_empty: false };
    }
    if (user.correo.length > 64) {
      validationTemp = { ...validationTemp, correo_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, correo_length: false };
    }
    if (user.hashed_pass === "") {
      validationTemp = { ...validationTemp, hashed_pass_empty: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, hashed_pass_empty: false };
    }
    if (user.hashed_pass.length > 1024) {
      validationTemp = { ...validationTemp, hashed_pass_length: true };
      validationPass = false;
    } else {
      validationTemp = { ...validationTemp, hashed_pass_length: false };
    }
    setValidation(validationTemp);
    if (validationPass) {
      if (params.id) {
        const res = await updateUser({ ...user, id: params.id });
        if (res === true) {
          navigate("/admin/users");
          setAlert("");
          setTimeout(() => {
            setAlert(" hidden");
          }, 3000);
        } else {
          setUser(null);
          navigate("/serverDown");
        }
      } else {
        const res = await createUser(user);
        if (res === true) {
          navigate("/admin/users");
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
              {params.id ? "Modificación de usuario" : "Creación de usuario"}
            </h2>
            <div className="form-control">
              <label htmlFor="cod_ins" className="label">
                <span className="label-text font-bold">
                  Código Institucional <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                name="cod_ins"
                id="cod_ins"
                className={`input input-bordered${
                  validation.cod_ins_empty || validation.cod_ins_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={user.cod_ins}
                onChange={handleChange}
              />
              <label htmlFor="cod_ins" className="label">
                <span className="label-text-alt text-error">
                  {validation.cod_ins_empty ? "El campo es obligatorio" : ""}
                  {validation.cod_ins_length
                    ? "El campo no debe sobrepasar los 100 carácteres"
                    : ""}
                </span>
              </label>
            </div>
            <div className="grid grid-cols-2">
              <div className="form-control">
                <label htmlFor="nombre" className="label">
                  <span className="label-text font-bold">
                    Nombre <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className={`input input-bordered${
                    validation.nombre_empty || validation.nombre_length
                      ? " input-error"
                      : " input-secondary"
                  }`}
                  value={user.nombre}
                  onChange={handleChange}
                />
                <label htmlFor="nombre" className="label">
                  <span className="label-text-alt text-error">
                    {validation.nombre_empty ? "El campo es obligatorio" : ""}
                    {validation.nombre_length
                      ? "La longitud del nombre no debe ser mayor a 64 caracteres"
                      : ""}
                  </span>
                </label>
              </div>
              <div className="form-control">
                <label htmlFor="apellido" className="label">
                  <span className="label-text font-bold">
                    Apellido <span className="text-red-600">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="apellido"
                  id="apellido"
                  className={`input input-bordered${
                    validation.apellido_empty || validation.apellido_length
                      ? " input-error"
                      : " input-secondary"
                  }`}
                  value={user.apellido}
                  onChange={handleChange}
                />
                <label htmlFor="apellido" className="label">
                  <span className="label-text-alt text-error">
                    {validation.apellido_empty ? "El campo es obligatorio" : ""}
                    {validation.apellido_length
                      ? "La longitud del apellido no debe ser mayor a 64 caracteres"
                      : ""}
                  </span>
                </label>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text font-bold">
                  Nombre de Usuario <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className={`input input-bordered${
                  validation.username_empty || validation.username_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={user.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className="label">
                <span className="label-text-alt text-error">
                  {validation.username_empty ? "El campo es obligatorio" : ""}
                  {validation.username_length
                    ? "La longitud no debe ser mayor a 64 caracteres"
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="correo" className="label">
                <span className="label-text font-bold">
                  Correo <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                name="correo"
                id="correo"
                className={`input input-bordered${
                  validation.correo_empty || validation.correo_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={user.correo}
                onChange={handleChange}
              />
              <label htmlFor="correo" className="label">
                <span className="label-text-alt text-error">
                  {validation.correo_empty ? "El campo es obligatorio" : ""}
                  {validation.correo_length
                    ? "La longitud no debe ser mayor a 64 caracteres"
                    : ""}
                </span>
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="hashed_pass" className="label">
                <span className="label-text font-bold">
                  Contraseña <span className="text-red-600">*</span>
                </span>
              </label>
              <input
                type="password"
                name="hashed_pass"
                id="hashed_pass"
                className={`input input-bordered${
                  validation.hashed_pass_empty || validation.hashed_pass_length
                    ? " input-error"
                    : " input-secondary"
                }`}
                value={user.hashed_pass}
                onChange={handleChange}
              />
              <label htmlFor="hashed_pass" className="label">
                <span className="label-text-alt text-error">
                  {validation.hashed_pass_empty
                    ? "El campo es obligatorio"
                    : ""}
                  {validation.hashed_pass_length
                    ? "La longitud no debe ser mayor a 1024 caracteres"
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
                  checked={!!user.habilitado}
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
                  navigate("/admin/users");
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

export default UserForm;
