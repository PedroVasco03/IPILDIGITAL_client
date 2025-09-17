import NavBarCoordenacao from "./navbar";
import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import SideBarCoordenacao from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ModalCreate from "./components/modalCreate";
import ModalConfirmation from "./components/modalConfirmation";
import ModalTeam from "./components/modalTeam";
import Image from "next/image";
import userImg from '../../public/images/profile_user.png';

function TeamCoordenacao() {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [idIdenticator, setIdIdenticator] = useState('');
  const [coordenacao, setCoordenacao] = useState('');
  const [item, setItem] = useState([]);
  const [integrantes, setIntegrantes] = useState([]);

  const toggleModal = () => setModal(!modal);
  const modalClose = () => setModal(false);
  const toggleModal2 = () => setModal2(!modal2);
  const modalClose2 = () => setModal2(false);
  const toggleModal3 = () => setModal3(!modal3);
  const modalClose3 = () => setModal3(false);

  const getIntegrantes = async () => {
    const idcoordenador = localStorage.getItem('idcoordenador');
    const res = await axios.get('http://localhost:5000/coordenacao-integrante');
    const search = res.data.filter(d => d.idcoordenador === idcoordenador);
    setIntegrantes(search);
  };

  const getData = async () => {
    const id = localStorage.getItem('idcoordenador');
    const res = await axios.get("http://localhost:5000/coordenacao");
    const search = res.data.filter(d => d.idcoordenador === id);
    setItem(search);
  };

  const getAlunoData = async () => {
    try {
      const id = localStorage.getItem('idcoordenador');
      const res = await axios.get(`http://localhost:5000/coordenador/${id}`);
      if (!res.data || res.data.permissao === 'Recusar') router.push('/login/coordenacao/login');
      if (!id) router.push('/login/coordenacao/login');
    } catch (err) {
      console.log(err);
      router.push('/login/coordenacao/login');
    }
  };

  useEffect(() => {
    getIntegrantes();
    const interval = setInterval(() => {
      getAlunoData();
      getData();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Head>
        <title>COORDENACAO | Pessoal</title>
        <link rel="icon" type="png/ico" href="../public/images/chat.png" />
      </Head>

      <NavBarCoordenacao />
      <div className={styleGeral.container}>
        <SideBarCoordenacao />
        <div className={`${styleGeral.content} mt-5`}>
          <div style={{ float: 'right' }} className="m-4 mt-5">
            <button className="btn btn-primary" onClick={toggleModal}>
              Criar Coordenação
            </button>
          </div>

          {item.map(coord => (
            <div key={coord.id}>
              <div className="card m-3 mt-5">
                <div className="card-body">
                  <p style={{ fontSize: '2.2rem' }}><strong>{coord.nome}</strong></p>
                </div>
                <div className="card-footer bg-white">
                  <button className="btn btn-primary m-1" style={{ padding: '3px 6px' }} onClick={() => {
                    toggleModal3();
                    setCoordenacao(coord.id);
                  }}>Adicionar integrantes</button>
                  <button className="btn btn-danger m-1" style={{ padding: '3px 6px' }} onClick={() => {
                    setIdIdenticator(coord.id);
                    toggleModal2();
                  }}>Eliminar</button>
                </div>
              </div>

              <h3 className="m-4">Integrantes:</h3>
              {integrantes.map((intg, idx) => (
                <div key={idx} className="list-group mb-3 mx-5">
                  <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3 m-2" onClick={() => {
                    localStorage.setItem('receptorCoordenador', intg.nome);
                    localStorage.setItem('tipoCoordenador', intg.nome);
                    router.push('/coordenacao/mensagem');
                  }}>
                    <Image src={userImg} alt="user" width={32} height={32} className="rounded-circle flex-shrink-0" />
                    <div className="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 className="mb-0">{intg.nome}</h6>
                      </div>
                      <small className="opacity-50 text-nowrap">envie a sua mensagem</small>
                    </div>
                  </a>
                </div>
              ))}

              <ModalTeam show={modal3} closed={modalClose3} idcoordencao={coordenacao} />
            </div>
          ))}

          <ModalCreate show={modal} closed={modalClose} />
          <ModalConfirmation show={modal2} closed={modalClose2} route={'coordenacao'} id={idIdenticator} />
        </div>
      </div>
    </div>
  );
}

export default TeamCoordenacao;
