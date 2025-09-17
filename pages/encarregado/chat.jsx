import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import ModalMessage from "./components/modalMessage";
import imagem from '../../public/images/profile_user.png';

function Chat() {
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [send, setSend] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const modalClose = () => setModal(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getAlunoData();
      getEnviado();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getEnviado = async () => {
    let box = [];
    let box2 = [];
    const username = localStorage.getItem('usernameEncarregado');
    try {
      const res = await axios.get('http://localhost:5000/enviado');
      res.data.forEach((item) => {
        if (item.nome === username) {
          box.push(item.receptor);
          box2.push(item.tipoReceiver);
        } else if (item.receptor === username) {
          box.push(item.nome);
          box2.push(item.tipoSender);
        }
      });
      setTipo(box2);
      setSend(box);
    } catch (err) {
      console.log(err);
    }
  };

  const getAlunoData = async () => {
    try {
      const data = localStorage.getItem('idencarregado');
      if (!data) return router.push('/login/encarregado/login');

      const res = await axios.get(`http://localhost:5000/encarregado/${data}`);
      setDatas(res.data);
      if (res.data.permissao === 'Recusar') {
        router.push('/login/encarregado/login');
      }
    } catch (err) {
      console.log(err);
      router.push('/login/encarregado/login');
    }
  };

  return (
    <div>
      <Head>
        <title>Encarregado | Chat</title>
        <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
      </Head>
      <NavBarAluno />
      <div className={styleGeral.container}>
        <SideBarAluno />
        <div className={styleGeral.content + " mt-5"}>
          <div className="d-flex mt-5 mb-3">
            <button 
              className="btn btn-primary ms-auto"
              onClick={toggleModal}
            >
              Enviar mensagem
            </button>
            <ModalMessage show={modal} closed={modalClose} />
          </div>

          <div>
            {send.map((item, index) => (
              <div className="list-group m-3" key={index}>
                <a 
                  href="#"
                  className="list-group-item list-group-item-action d-flex gap-3 py-3"
                  onClick={() => {
                    localStorage.setItem('receptorEncarregado', item);
                    localStorage.setItem('tipoEncarregado', tipo[index]);
                    router.push('/encarregado/mensagem');
                  }}
                >
                  <Image 
                    src={imagem} 
                    alt="Profile" 
                    width={32} 
                    height={32} 
                    className="rounded-circle flex-shrink-0"
                  />
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 className="mb-0">{item}</h6>
                      <p>{tipo[index]}</p>
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

export default Chat;
