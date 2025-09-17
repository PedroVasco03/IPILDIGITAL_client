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

    const getAlunoData = async () => {
        try {
            const data = localStorage.getItem('idcoordenador');
            if (!data) return router.push('/login/coordenacao/login');

            const res = await axios.get(`http://localhost:5000/coordenador/${data}`);
            setDatas(res.data);

            if (res.data.permissao === 'Recusar') {
                router.push('/login/coordenacao/login');
            }
        } catch (err) {
            console.error(err);
            router.push('/login/coordenacao/login');
        }
    };

    const getEnviado = async () => {
        try {
            const username = localStorage.getItem('usernameCoordenador');
            const res = await axios.get('http://localhost:5000/enviado');

            const box = [];
            const box2 = [];

            res.data.forEach(item => {
                if (item.receptor === username) {
                    box.push(item.nome);
                    box2.push(item.tipoSender);
                } else if (item.nome === username) {
                    box.push(item.receptor);
                    box2.push(item.tipoReceiver);
                }
            });

            setSend(box);
            setTipo(box2);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Head>
                <title>Coordenador | Chat</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={styleGeral.content}>
                    <div className="d-flex justify-content-end mt-5 mb-3">
                        <button className="btn btn-primary" onClick={toggleModal}>
                            Enviar mensagem
                        </button>
                        {modal && <ModalMessage show={modal} closed={modalClose} />}
                    </div>

                    <div className="list-group">
                        {send.length === 0 && (
                            <p className="text-center mt-4">Nenhuma mensagem encontrada.</p>
                        )}
                        {send.map((item, index) => (
                            <button
                                key={index}
                                className="list-group-item list-group-item-action d-flex gap-3 align-items-center"
                                onClick={() => {
                                    localStorage.setItem('receptorCoordenador', item);
                                    localStorage.setItem('tipoCoordenador', tipo[index]);
                                    router.push('/coordenacao/mensagem');
                                }}
                            >
                                <Image 
                                    src={imagem} 
                                    alt="Perfil" 
                                    width={40} 
                                    height={40} 
                                    className="rounded-circle flex-shrink-0"
                                />
                                <div className="d-flex flex-column w-100">
                                    <div className="d-flex justify-content-between">
                                        <h6 className="mb-0">{item}</h6>
                                        <small className="text-muted">Envie a sua mensagem</small>
                                    </div>
                                    <p className="mb-0 text-muted">{tipo[index]}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
