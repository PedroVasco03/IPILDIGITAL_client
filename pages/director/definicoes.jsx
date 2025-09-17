import NavBarCoordenacao from "./navbar";
import styleGeral from '../css/logado.module.css';
import SideBarCoordenacao from "./sidebar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ModalSetting from "./components/modalSettings";
import ModalAlert from "./modalAlert";

function Settings() {
  const [data, setData] = useState({});
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const interval = setInterval(getAlunoData, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAlunoData = async () => {
    try {
      const dataId = localStorage.getItem('iddirector');
      if (!dataId) return router.push('/login/director/login');
      const res = await axios.get(`http://localhost:5000/director/${dataId}`);
      setData(res.data);
      if (res.data.permissao === 'Recusar') router.push('/login/director/login');
    } catch (err) {
      console.log(err);
      router.push('/login/director/login');
    }
  };

  return (
    <div>
      <Head>
        <title>Director | Definicoes</title>
        <link rel="icon" type="image/png" href="../public/images/chat.png" />
      </Head>

      <NavBarCoordenacao />

      <div className={styleGeral.container}>
        <SideBarCoordenacao />
        <div className={styleGeral.content}>
          <div className="w-100 p-2 mt-5">

            <div className="card mb-4 mt-5 bg-white m-4">
              <div className="card-body text-center">
                <h5 className="my-3">{data.nome}</h5>
                <div className="d-flex justify-content-center mb-2"></div>
              </div>
            </div>

            <div className="card mb-4 m-4">
              <div className="card-body bg-white">
                {["Nome", "Email", "Bilhete de Identidade", "Telefone", "Sexo"].map((label, idx) => (
                  <div key={idx} className="row mb-2">
                    <div className="col-sm-3"><p className="mb-0">{label}</p></div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {label === "Nome" ? data.nome :
                         label === "Email" ? data.email :
                         label === "Bilhete de Identidade" ? data.bi :
                         label === "Telefone" ? data.telefone :
                         label === "Sexo" ? data.sexo : ""}
                      </p>
                    </div>
                    {idx < 4 && <hr />}
                  </div>
                ))}
              </div>
            </div>

            <div className="card mb-5 m-4" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <h3 className="mb-3">Senha</h3>
                <p className="small mb-0"><i className="far fa-star fa-lg"></i> <span className="mx-2">{data.senha}</span></p>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-danger m-4"
              onClick={() => {
                const iddirector = localStorage.getItem('iddirector');
                setId(iddirector);
                setModal2(true);
              }}
            >
              Eliminar conta
            </button>

            <button
              type="button"
              className="btn btn-outline-primary m-2"
              onClick={() => setModal(true)}
            >
              Editar dados
            </button>

            <ModalSetting show={modal} closed={() => setModal(false)} />
            <ModalAlert show={modal2} closed={() => setModal2(false)} id={id} route="director" />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
