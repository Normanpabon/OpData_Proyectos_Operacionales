import { useNavigate } from "react-router-dom";
function StatusCard({ status }) {
  const navigate = useNavigate();
  return (
    <div
      className={`shadow-lg border-2 border-gray-100 rounded-xl py-2 px-3 m-3 flex flex-col h-fit relative`}
    >
      <p
        className={`badge mt-1 mb-3 absolute -top-3 -right-2 text-white ${
          status.habilitado ? "badge-success" : "badge-error"
        }`}
      >
        {status.habilitado ? "Habilitado" : "No Habilitado"}
      </p>
      <h3
        className={`text-lg font-bold mb-1 text-white bg-primary rounded-lg py-1 px-2 text-justify overflow-hidden max-h-9
      `}
      >
        {status.estado}
      </h3>
      <label
        htmlFor="my-modal"
        className={`btn btn-primary modal-button text-white rounded-3xl w-fit self-end mt-3`}
        onClick={(e) => navigate(`/admin/status/edit/${status.id}`)}
      >
        Editar
      </label>
    </div>
  );
}

export default StatusCard;
