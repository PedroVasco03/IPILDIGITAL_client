import axios from "axios";

function ModalConfirmation({ show, closed, id, route }) {

  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:5000/${route}/${id}`);
      closed(); // fecha o modal
      window.location.reload(); // atualiza a página
    } catch (err) {
      console.log("Erro ao deletar:", err);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmação</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <p style={{ fontSize: "1.2rem" }}>
              Tens a certeza que desejas{" "}
              <strong className="text-danger">eliminar</strong> isto?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ padding: "5px 16px" }}
              onClick={deleteData}
            >
              Sim
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ padding: "5px 16px" }}
              onClick={closed}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmation;
