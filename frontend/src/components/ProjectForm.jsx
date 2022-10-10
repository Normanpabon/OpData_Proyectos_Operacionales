import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
function ProjectForm() {
  const { projects, allStatus, getAllStatus } = useUser();
  useState;
  useEffect(() => {
    getAllStatus();
  }, []);
  return (
    <div>
      <form>
        <label htmlFor="">Nombre/Descripción del proyecto</label>
        <input type="text" name="" id="" />
        <label htmlFor="">Fecha de inicio</label>
        <input type="date" name="" id="" />
        <label htmlFor="">Fecha finalizacion</label>
        <input type="date" name="" id="" onChange={(e) => console.log(e)} />
        <label htmlFor="">Estado</label>
        <select name="" id="" value={2}>
          {allStatus.map((state) => {
            return (
              <option value={state.id} key={state.id}>
                {state.estado}
              </option>
            );
          })}
        </select>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Observaciones...."
        ></textarea>
      </form>
    </div>
  );
}

export default ProjectForm;
