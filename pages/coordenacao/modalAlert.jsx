import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function ModalAlert({ show, closed, id, route }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function deleteData() {
    setLoading(true);
    try {
      // Deletar o registro principal
      await axios.delete(`http://localhost:5000/${route}/${id}`);

      // Deletar reclamações associadas
      const reclamacao = await axios.get('http://localhost:5000/reclamacao');
      await Promise.all(
        reclamacao.data
          .filter(item => item.idlocal === id)
          .map(item => axios.delete(`http://localhost:5000/reclamacao/${item.id}`))
      );

      // Deletar horários associados
      const horarios = await axios.get('http://localhost:5000/horario-coordenacao');
      await Promise.all(
        horarios.data
          .filter(item => item.idcoordenador === id)
          .map(item => axios.delete(`http://localhost:5000/horario-coordenacao/${item.id}`))
      );

      localStorage.removeItem('idcoordenador');
      router.push('/login/coordenacao/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      closed();
    }
  }

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmação</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <p style={{ fontSize: '1.2rem' }}>
              Tens a certeza que desejas <strong className="text-danger">eliminar</strong> isto?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ padding: '5px 16px' }}
              onClick={deleteData}
              disabled={loading}
            >
              Sim
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ padding: '5px 16px' }}
              onClick={closed}
              disabled={loading}
            >
              Não
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

export default ModalAlert;
