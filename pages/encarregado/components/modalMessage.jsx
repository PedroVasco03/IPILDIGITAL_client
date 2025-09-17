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
    const data = localStorage.getItem('idencarregado');
    axios.get(`http://localhost:5000/encarregado/${data}`)
      .then(res => setTipo(res.data.tipo))
      .catch(err => console.log(err));
    getUsers('director');
  }, []);

  const search = async (dado) => {
    let url = '';
    if (change === 'director') url = 'director';
    else if (change === 'coordenador') url = 'coordenador';
    else if (change === 'funcionario') url = 'funcionario';
    
    setHidden(change !== 'coordenador');

    if (url) {
      const response = await axios.get(`http://localhost:5000/${url}`);
      const searchResult = response.data.filter(u => u.nome === dado);
      setDatas(searchResult);
    }
  };

  const getUsers = async (change) => {
    let url = '';
    if (change === 'director') url = 'director';
    else if (change === 'coordenador') url = 'coordenador';
    else if (change === 'funcionario') url = 'funcionario';

    setHidden(change !== 'coordenador');

    if (url) {
      const response = await axios.get(`http://localhost:5000/${url}`);
      setDatas(response.data);
    }
  };

  if (!show) return null; // Não renderiza modal se show=false

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar Mensagem</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <select
                className="form-select"
                value={change}
                onChange={(e) => { setChange(e.target.value); getUsers(e.target.value); }}
              >
                <option value="director">Director</option>
                <option value="funcionario">Funcionario</option>
                <option value="coordenador">Coordenador</option>
              </select>
            </div>
            <div className="d-flex mb-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Pesquisar usuário"
                value={procurar}
                onChange={(e) => {
                  setProcurar(e.target.value);
                  if (e.target.value === "") getUsers(change);
                }}
              />
              <button className="btn btn-primary" onClick={() => search(procurar)}>Pesquisar</button>
            </div>

            {datas.map((item) => (
              <div key={item.nome} className="list-group mb-2">
                <a
                  href="#"
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                  onClick={() => {
                    localStorage.setItem('receptorEncarregado', item.nome);
                    localStorage.setItem('tipoEncarregado', item.tipo);
                    localStorage.setItem('tipoEncarregado2', tipo);
                    router.push('/encarregado/mensagem');
                  }}
                >
                  <Image src={imagem} alt="profile" width={32} height={32} className="rounded-circle flex-shrink-0"/>
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 className="mb-0">{item.nome}</h6>
                      {!hidden && (
                        <>
                          <p className="mb-0 opacity-75">Curso: {item.curso}</p>
                          <p className="mb-0 opacity-75">Classe: {item.classe}</p>
                          <p className="mb-0 opacity-75">Área de formação: {item.area}</p>
                        </>
                      )}
                    </div>
                    <small className="opacity-50 text-nowrap">envie a sua mensagem</small>
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
