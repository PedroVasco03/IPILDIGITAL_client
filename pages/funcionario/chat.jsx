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
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getAlunoData = async () => {
        try {
            const data = localStorage.getItem('idfuncionario');
            const response = await axios.get(`http://localhost:5000/funcionario/${data}`);
            setDatas(response.data);

            if (response.data.permissao === 'Recusar' || !data) {
                router.push('/login/funcionario/login');
            }
        } catch (err) {
            router.push('/login/funcionario/login');
        }
    };

    const getEnviado = async () => {
        const username = localStorage.getItem('usernameFuncionario');
        let box = [];
        let box2 = [];

        const res = await axios.get('http://localhost:5000/enviado');
        res.data.forEach(item => {
            if (item.nome === username) {
                box.push(item.receptor);
                box2.push(item.tipoReceiver);
            }
            if (item.receptor === username) {
                box.push(item.nome);
                box2.push(item.tipoSender);
            }
        });

        setTipo(box2);
        setSend(box);
    };

    return (
        <div>
            <Head>
                <title>Funcionario | Chat</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={`${styleGeral.content} mt-5`}>
                    <div className="d-flex w-100 mt-5 mb-3">
                        <button className="btn btn-primary ms-auto" onClick={toggleModal}>
                            Enviar mensagem
                        </button>
                        <ModalMessage show={modal} closed={modalClose} />
                    </div>

                    {send.map((item, index) => (
                        <div className="list-group m-3" key={index}>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                onClick={() => {
                                    localStorage.setItem('receptorFuncionario', item);
                                    localStorage.setItem('tipoFuncionario', tipo[index]);
                                    router.push('/funcionario/mensagem');
                                }}
                            >
                                <Image src={imagem} alt="perfil" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0">{item}</h6>
                                        <p className="mb-0">{tipo[index]}</p>
                                    </div>
                                    <small className="opacity-50 text-nowrap">envie a sua mensagem</small>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chat;
