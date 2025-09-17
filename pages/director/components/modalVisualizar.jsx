import React from "react";

function ModalView({ show, closed, senha, mensagem, dia }) {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Reclamação</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <p><strong>Senha:</strong> {senha}</p>
            <p><strong>Dia de atendimento:</strong> {dia}</p>
            <p><strong>Mensagem:</strong></p>
            <textarea
              className="form-control"
              rows={10}
              readOnly
              value={mensagem}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closed}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalView;
