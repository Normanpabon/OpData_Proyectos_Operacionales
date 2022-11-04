import { useUser } from "../../context/UserContext";
function UnitCard({ unit }) {
  const { users } = useUser();
  const jefe = users.find((user) => unit.uid_jefe === user.cod_ins);
  return (
    <div
      className={`shadow-lg border-2 border-gray-100 rounded-xl py-2 px-3 m-3 flex flex-col h-fit relative
    }`}
    >
      <h3
        className={`text-lg font-bold mb-1 text-white bg-primary rounded-lg py-1 px-2 text-justify overflow-hidden max-h-9
        `}
      >
        {unit.nombre_unidad}
      </h3>
      <div className="grid grid-cols-2 px-3 bg-gray-300 rounded-lg mb-2 relative">
        <p className="font-bold text-base col-span-2">
          {jefe ? "Datos del jefe asignado" : "No Asignado"}
        </p>
        <p className="font-bold">Código:</p>
        <p className="text-right">{jefe ? jefe.cod_ins : "Na"}</p>
        <p className="font-bold">Nombre:</p>
        <p className="text-right">
          {jefe ? `${jefe.nombre} ${jefe.apellido}` : "Na"}
        </p>
      </div>
      <label
        htmlFor="my-modal"
        className={`btn btn-primary modal-button text-white rounded-3xl w-fit self-end mt-3 ${
          open ? "" : "hidden"
        }`}
        onClick={(e) => navigate(`/user/edit/${project.id}`)}
      >
        Editar
      </label>
    </div>
  );
}

export default UnitCard;
