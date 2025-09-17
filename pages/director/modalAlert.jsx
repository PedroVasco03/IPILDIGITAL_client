import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

function ModalAlert({ show, closed, id, route }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteData = async () => {
    try {
      setLoading(true);

      // Deleta o item principal
      await axios.delete(`http://localhost:5000/${route}/${id}`);

      // Deleta reclamações associadas
      const reclamacaoRes = await axios.get('http://localhost:5000/reclamacao');
      await Promise.all(
        reclamacaoRes.data
          .filter(item => item.idlocal === id)
          .map(item => axios.delete(`http://localhost:5000/reclamacao/${item.id}`))
      );

      // Deleta horários associados
      const horarioRes = await axios.get('http://localhost:5000/horario-secretaria');
      await Promise.all(
        horarioRes.data
          .filter(item => item.idhorario === id)
          .map(item => axios.delete(`http://localhost:5000/horario-secretaria/${item.id}`))
      );

      // Remove localStorage e redireciona
      localStorage.removeItem('iddirector');
      router.push('/login/director/login');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      closed();
    }
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmação</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
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
              {loading ? 'Eliminando...' : 'Sim'}
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ padding: '5px 16px' }}
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

export default ModalAlert;
