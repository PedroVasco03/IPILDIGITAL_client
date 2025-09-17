import NavBarCoordenacao from "./navbar";
import styleGeral from '../css/logado.module.css';
import Head from "next/head";
import SideBarAluno from "./sidebar";
import ModalSetting from "./components/modalSettings";
import ModalAlert from "./modalAlert";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

function Settings() {
  const router = useRouter();
  const [datas, setDatas] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [id, setId] = useState('');

  const toggleModal = () => setModal(!modal);
  const modalClose = () => setModal(false);
  const modalClose2 = () => setModal2(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getAlunoData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getAlunoData = async () => {
    try {
      const data = localStorage.getItem('idencarregado');
      if (!data) return router.push('/login/encarregado/login');

      const res = await axios.get(`http://localhost:5000/encarregado/${data}`);
      setDatas(res.data);
      if (res.data.permissao === 'Recusar') router.push('/login/encarregado/login');
    } catch (err) {
      console.log(err);
      router.push('/login/encarregado/login');
    }
  };

  return (
    <div>
      <Head>
        <title>Encarregado | Definições</title>
        <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
      </Head>
      <NavBarCoordenacao />
      <div className={styleGeral.container} style={{ paddingTop: '80px' }}>
        <SideBarAluno />
        <div className={styleGeral.content}>
          <div className="w-100 p-2 mt-5">
            {/* Perfil */}
            <div className="card mb-4 bg-white m-4">
              <div className="card-body text-center">
                <h5 className="my-3">{datas.nome}</h5>
              </div>
            </div>

            {/* Dados Pessoais */}
            <div className="card mb-4 m-4">
              <div className="card-body bg-white">
                {[
                  { label: "Nome", value: datas.nome },
                  { label: "Email", value: datas.email },
                  { label: "Bilhete de Identidade", value: datas.bi },
                  { label: "Telefone", value: datas.telefone },
                  { label: "Sexo", value: datas.sexo },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">{item.label}</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{item.value}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>

            {/* Senha */}
            <div className="card mb-5 m-4" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <h3 className="mb-3">Senha</h3>
                <p className="small mb-0"><i className="far fa-star fa-lg"></i> <span className="mx-2">{datas.senha}</span></p>
              </div>
            </div>

            {/* Botões */}
            <div className="d-flex flex-wrap m-4">
              <button
                type="button"
                className="btn btn-outline-danger me-2 mb-2"
                onClick={() => {
                  const idencarregado = localStorage.getItem('idencarregado');
                  setId(idencarregado);
                  setModal2(true);
                }}
              >
                Eliminar conta
              </button>

              <button
                type="button"
                className="btn btn-outline-primary mb-2"
                onClick={toggleModal}
              >
                Editar dados
              </button>
            </div>
          </div>

          {/* Modais */}
          <ModalSetting show={modal} closed={modalClose} />
          <ModalAlert show={modal2} closed={modalClose2} id={id} route="encarregado" />
        </div>
      </div>
    </div>
  );
}

export default Settings;
