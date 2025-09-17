import NavBarCoordenacao from "./navbar";
import styleGeral from '../css/logado.module.css';
import SideBarCoordenacao from "./sidebar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ModalSetting from "./components/modalSettings";
import ModalAlert from "./modalAlert";

function SettingsCoordenacao() {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [dado, setDado] = useState({});
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            getData();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getData = async () => {
        try {
            const dataId = localStorage.getItem('idcoordenador');
            if (!dataId) return router.push('/login/coordenacao/login');

            const res = await axios.get(`http://localhost:5000/coordenador/${dataId}`);
            setData(res.data);

            if (res.data.permissao === 'Recusar') router.push('/login/coordenacao/login');
        } catch (err) {
            console.log(err);
            router.push('/login/coordenacao/login');
        }
    };

    return (
        <div>
            <Head>
                <title>COORDENACAO | Definicoes</title>
                <link rel="icon" type="image/png" href="../public/images/chat.png" />
            </Head>

            <NavBarCoordenacao />
            <div className={styleGeral.container}>
                <SideBarCoordenacao />

                <div className={`${styleGeral.content} mt-5`}>
                    <div className="card mb-4 mt-5 bg-white m-4">
                        <div className="card-body text-center">
                            <h5 className="my-3">{data.nome}</h5>
                        </div>
                    </div>

                    <div className="card mb-4 m-4">
                        <div className="card-body bg-white">
                            {['Nome', 'Email', 'Bilhete de Identidade', 'Telefone', 'Área de formação', 'Sexo'].map((label, idx) => (
                                <div key={idx}>
                                    <div className="row">
                                        <div className="col-sm-3"><p className="mb-0">{label}</p></div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">
                                                {label === 'Nome' && data.nome}
                                                {label === 'Email' && data.email}
                                                {label === 'Bilhete de Identidade' && data.bi}
                                                {label === 'Telefone' && data.telefone}
                                                {label === 'Área de formação' && data.area}
                                                {label === 'Sexo' && data.sexo}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card mb-5 m-4" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4">
                            <h3 className="mb-3">Senha</h3>
                            <p className="small mb-0"><span className="mx-2">{data.senha}</span></p>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap">
                        <button
                            type="button"
                            className="btn btn-outline-danger m-4"
                            onClick={() => { setId(localStorage.getItem('idcoordenador')); setModal2(true); }}
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
                    </div>

                    <ModalSetting show={modal} closed={() => setModal(false)} />
                    <ModalAlert show={modal2} closed={() => setModal2(false)} id={id} route="coordenador" />
                </div>
            </div>
        </div>
    );
}

export default SettingsCoordenacao;
