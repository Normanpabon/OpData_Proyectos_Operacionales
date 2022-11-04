function StatusCard({ status }) {
  return (
    <div
      className={`shadow-lg border-2 border-gray-100 rounded-xl py-2 px-3 m-3 flex flex-col h-fit
  }`}
    >
      <h3
        className={`text-lg font-bold mb-1 text-white bg-primary rounded-lg py-1 px-2 text-justify overflow-hidden max-h-9
      `}
      >
        {status.estado}
      </h3>
      <label
        htmlFor="my-modal"
        className={`btn btn-primary modal-button text-white rounded-3xl w-fit self-end mt-3`}
        onClick={(e) => navigate(`/user/edit/${project.id}`)}
      >
        Editar
      </label>
    </div>
  );
}

export default StatusCard;
