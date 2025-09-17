import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import imagem from '../../../public/images/profile_user.png';

function ModalMessage({ show, closed }) {
  const [hidden, setHidden] = useState(false);
  const [change, setChange] = useState('aluno');
  const [datas, setDatas] = useState([]);
  const [tipo, setTipo] = useState('');
  const [procurar, setProcurar] = useState('');
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('iddirector');
    axios.get(`http://localhost:5000/director/${data}`)
      .then((res) => setTipo(res.data.tipo))
      .catch(err => console.log(err));

    getUsers('aluno');
  }, []);

  const search = async (dado) => {
    if (change === 'aluno') {
      const response = await axios.get('http://localhost:5000/aluno');
      const search = response.data.filter(u => u.nome === dado);
      setDatas(search);
    } else if (change === 'encarregado') {
      setHidden(true);
      const response = await axios.get('http://localhost:5000/encarregado');
      const search = response.data.filter(u => u.nome === dado);
      setDatas(search);
    } else if (change === 'coordenador') {
      setHidden(true);
      const response = await axios.get('http://localhost:5000/coordenador');
      const search = response.data.filter(u => u.nome === dado);
      setDatas(search);
    }
  };

  const getUsers = async (change) => {
    if (change === 'aluno') {
      const response = await axios.get('http://localhost:5000/aluno');
      setDatas(response.data);
    } else if (change === 'encarregado') {
      setHidden(true);
      const response = await axios.get('http://localhost:5000/encarregado');
      setDatas(response.data);
    } else if (change === 'coordenador') {
      setHidden(true);
      const response = await axios.get('http://localhost:5000/coordenador');
      setDatas(response.data);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar Mensagem</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <select className="form-select" value={change} onChange={(e) => {
                setChange(e.target.value);
                getUsers(e.target.value);
              }}>
                <option value="aluno">Aluno</option>
                <option value="encarregado">Encarregado</option>
                <option value="coordenador">Coordenador</option>
              </select>
            </div>
            <div className="d-flex mb-3">
              <input
                className="form-control me-2"
                type="text"
                value={procurar}
                onChange={(e) => {
                  setProcurar(e.target.value);
                  if (e.target.value === "") getUsers(change);
                }}
                placeholder="Pesquisar usuário"
              />
              <button
                className="btn btn-primary"
                onClick={() => {
                  search(procurar);
                  if (procurar === "") getUsers(change);
                }}
              >
                Pesquisar
              </button>
            </div>

            {datas.map((item, index) => (
              <div key={index} className="list-group mb-2">
                <a
                  href="#"
                  className="list-group-item list-group-item-action d-flex gap-3 align-items-center"
                  onClick={() => {
                    localStorage.setItem('receptorDirector', item.nome);
                    localStorage.setItem('tipoDirector', item.tipo);
                    localStorage.setItem('tipoDirector2', tipo);
                    router.push('/director/mensagem');
                  }}
                >
                  <Image src={imagem} alt="user" width={32} height={32} className="rounded-circle flex-shrink-0" />
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="mb-0">{item.nome}</h6>
                        <p hidden={hidden} className="mb-0 opacity-75">Curso: {item.curso}</p>
                        <p hidden={hidden} className="mb-0 opacity-75">Classe: {item.classe}</p>
                        <p hidden={hidden} className="mb-0 opacity-75">Área de formação: {item.area}</p>
                      </div>
                      <small className="opacity-50 text-nowrap">envie a sua mensagem</small>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMessage;
