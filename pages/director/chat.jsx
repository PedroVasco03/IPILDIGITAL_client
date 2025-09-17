import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import ModalMessage from "./components/modalMessage";
import userImg from '../../public/images/profile_user.png';

function Chat() {
    const router = useRouter();
    const [datas, setDatas] = useState([]);
    const [send, setSend] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    const modalClose = () => setModal(false);

    const getEnviado = async () => {
        const box = [];
        const box2 = [];
        const username = localStorage.getItem('usernameDirector');

        const res = await axios.get('http://localhost:5000/enviado');
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
    };

    const getAlunoData = async () => {
        try {
            const id = localStorage.getItem('iddirector');
            const res = await axios.get(`http://localhost:5000/director/${id}`);
            setDatas(res.data);

            if (!res.data || res.data.permissao === 'Recusar') {
                router.push('/login/director/login');
            }

            if (!id) router.push('/login/director/login');
        } catch (err) {
            console.log(err);
            router.push('/login/director/login');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            getAlunoData();
            getEnviado();
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <Head>
                <title>Director | Chat</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png" />
            </Head>

            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />

                <div className={styleGeral.content}>
                    <div className="d-flex w-100 mt-5">
                        <button className="btn btn-primary m-3 mt-5" onClick={toggleModal} style={{ float: 'right' }}>
                            Enviar mensagem
                        </button>
                        <ModalMessage show={modal} closed={modalClose} />
                    </div>

                    <div style={{ paddingTop: '20px', width: '100%' }}>
                        {send.map((item, index) => (
                            <div key={index} className="list-group m-3">
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                    onClick={() => {
                                        localStorage.setItem('receptorDirector', item);
                                        localStorage.setItem('tipoDirector', tipo[index]);
                                        router.push('/director/mensagem');
                                    }}
                                >
                                    <Image
                                        src={userImg}
                                        alt="user"
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
