import React, { useEffect, useState } from "react";
import axios from "axios";

const ModalPermission = ({ show, closed, id, route }) => {
  const [senha, setSenha] = useState("");
  const [data, setData] = useState("");

  const confirm = async (senhaAvaliada) => {
    if (
      (senha && senhaAvaliada !== "") ||
      (senha !== "" && senhaAvaliada !== "")
    ) {
      if (senha === senhaAvaliada) {
        await deletar();
      } else {
        alert("Senha Inválida");
        closed(); // fecha modal
      }
    }
  };

  const deletar = async () => {
    await axios.delete(`http://localhost:5000/${route}/${id}`);

    if (route === "coordenador") {
      const reclamacoes = await axios.get("http://localhost:5000/reclamacao");
      reclamacoes.data.forEach(async (item) => {
        if (item.idlocal === id) {
          await axios.delete(`http://localhost:5000/reclamacao/${item.id}`);
        }
      });

      const horarios = await axios.get(
        "http://localhost:5000/horario-coordenacao"
      );
      horarios.data.forEach(async (item) => {
        if (item.idcoordenador === id) {
          await axios.delete(
            `http://localhost:5000/horario-coordenacao/${item.id}`
          );
        }
      });
    }

    if (route === "director") {
      const reclamacoes = await axios.get("http://localhost:5000/reclamacao");
      reclamacoes.data.forEach(async (item) => {
        if (item.idlocal === id) {
          await axios.delete(`http://localhost:5000/reclamacao/${item.id}`);
        }
      });

      const horarios = await axios.get(
        "http://localhost:5000/horario-secretaria"
      );
      horarios.data.forEach(async (item) => {
        if (item.idhorario === id) {
          await axios.delete(
            `http://localhost:5000/horario-secretaria/${item.id}`
          );
        }
      });
    }

    if (route === "aluno") {
      const reclamacoes = await axios.get("http://localhost:5000/reclamacao");
      reclamacoes.data.forEach(async (item) => {
        if (item.idaluno === id) {
          await axios.delete(`http://localhost:5000/reclamacao/${item.id}`);
        }
      });
    }

    alert("Eliminado com sucesso");
    window.location.reload();
  };

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("login"));
      setSenha(user.senha);
    } catch (err) {
      console.log(err);
    }
  }, []);

  if (!show) return null; // se modal não estiver aberto, não renderiza nada

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header">
            <h5 className="modal-title">Segurança</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closed}
            ></button>
          </div>
          <div className="modal-body">
            <input
              type="password"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Digite a sua senha"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={closed}>
              Cancelar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => confirm(data)}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
      {/* fundo escuro */}
      <div
        className="modal-backdrop fade show"
        onClick={closed}
      ></div>
    </div>
  );
};

export default ModalPermission;
