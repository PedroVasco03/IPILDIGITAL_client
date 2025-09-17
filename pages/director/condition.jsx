import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import empty from '../../public/images/images-system/empty.png';
import ModalView from "./components/modalVisualizar";
import ModalConfirmation from "./components/modalConfirmation";
import { useRouter } from "next/router";

function Condition() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [reclamacao, setReclamacao] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [message, setMessage] = useState([]);
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [dia, setDia] = useState('');
  const [filter, setFilter] = useState([]);
  const [id, setId] = useState('');
  const [dias, setDias] = useState([]);
  const [alterar, setAlterar] = useState('');

  useEffect(() => {
    setDias([]);
    getUsers();
    filtrarDias();
    getReclamacao();
  }, []);

  const filtrarDias = async () => {
    try {
      const res = await axios.get('http://localhost:5000/horario-secretaria');
      const idcoordenador = localStorage.getItem('iddirector');
      const all = res.data.filter(d => d.idhorario === idcoordenador);
      setDias(all);
    } catch (err) { console.log(err); }
  };

  const getReclamacao = async () => {
    try {
      const res = await axios.get('http://localhost:5000/reclamacao');
      const idcoordenador = localStorage.getItem('iddirector');
      const all = res.data.filter(d => d.idlocal === idcoordenador && d.diasemana === alterar);
      setFilter(all);
    } catch (err) { console.log(err); }
  };

  const filtrarReclamacao = async (change) => {
    try {
      const res = await axios.get('http://localhost:5000/reclamacao');
      const idcoordenador = localStorage.getItem('iddirector');
      const all = res.data.filter(d => d.idlocal === idcoordenador && d.diasemana === change);
      setFilter(all);
    } catch (err) { console.log(err); }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/horario-secretaria');
      const dado = localStorage.getItem('iddirector');
      const search = res.data.filter(d => d.idhorario === dado);
      setData(search);
    } catch (err) {
      console.log('erro: solicitação negada');
    }
  };

  if (data.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center w-100">
        <Image className="home_img" src={empty} alt="empty" />
        <p>Nenhuma actividade.</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      <div className="card p-4 mb-4">
        <div className="d-flex flex-wrap">
          <span className="m-1 fs-5 fw-bold">Dias de Atendimento:</span>
          {data.map(item => (
            <span key={item.diasemana} className="m-1 fs-5">{item.diasemana}</span>
          ))}
        </div>
        <div className="m-2 fs-5 fw-bold">
          Atendimento das {data[0].inicio}h às {data[0].fim}h
        </div>
        <div className="m-2 fs-5">
          Limite de pessoas para atendimento: {data[0].limite}
        </div>
      </div>

      <div className="mt-3">
        <div className="d-flex align-items-center mb-3">
          <select
            className="form-select me-2"
            style={{ width: '300px' }}
            value={alterar}
            onChange={(e) => {
              setAlterar(e.target.value);
              filtrarReclamacao(e.target.value);
            }}
          >
            <option value="" disabled>Verifique o dia de atendimento</option>
            {dias.map(item => (
              <option key={item.diasemana} value={item.diasemana}>{item.diasemana}</option>
            ))}
          </select>
          <button
            className="btn btn-secondary"
            title="Atualize alguns dados podem estar desatualizados"
            onClick={getReclamacao}
          >
            Actualizar dados
          </button>
        </div>

        <h5>Agendados:</h5>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Senha</th>
                <th>Dia de semana</th>
                <th>Hora</th>
                <th>Permissão</th>
              </tr>
            </thead>
            <tbody>
              {filter.map(item => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.idsenha}</td>
                  <td>{item.diasemana}</td>
                  <td>{item.hora}</td>
                  <td className="d-flex flex-wrap">
                    <button
                      className="btn btn-danger btn-sm me-1 mb-1"
                      onClick={() => {
                        setId(item.id);
                        setModal2(true);
                      }}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-1 mb-1"
                      onClick={() => {
                        setDia(item.diasemana);
                        setSenha(item.idsenha);
                        setMensagem(item.mensagem);
                        setModal(true);
                      }}
                    >
                      Visualizar
                    </button>
                    <button
                      className="btn btn-secondary btn-sm me-1 mb-1"
                      onClick={() => {
                        axios.get(`http://localhost:5000/aluno/${item.idaluno}`).then(res => {
                          localStorage.setItem('receptorDirector', res.data.nome);
                          router.push('/director/mensagem');
                        });
                      }}
                    >
                      Enviar mensagem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalView show={modal} closed={() => setModal(false)} senha={senha} mensagem={mensagem} dia={dia} />
      <ModalConfirmation show={modal2} closed={() => setModal2(false)} id={id} route={'reclamacao'} />
    </div>
  );
}

export default Condition;
