import { useUser } from "../context/UserContext";
function ProjectForm() {
  const { projects, states } = useUser();
  return (
    <div>
      <form>
        <label htmlFor="">Nombre/Descripción del proyecto</label>
        <input type="text" name="" id="" />
        <label htmlFor="">Fecha de inicio</label>
        <input type="date" name="" id="" />
        <label htmlFor="">Fecha finalizacion</label>
        <input type="date" name="" id="" />
        <label htmlFor="">Estado</label>
        <select name="" id="">
          {/* {states.map((state) => {
            return <option value={state.id}>{state.estado}</option>;
          })} */}
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
