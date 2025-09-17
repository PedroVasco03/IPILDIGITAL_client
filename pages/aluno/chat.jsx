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

function Home() {
    const router = useRouter();
    const [datas, setDatas] = useState([]);
    const [send, setSend] = useState([]);
    const [turma, setTurma] = useState('');
    const [tipo, setTipo] = useState([]);
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    const modalClose = () => setModal(false);

    useEffect(() => {
        const interval = setInterval(() => {
            getAlunoData();
            getEnviado();
        }, 1000);

        const data = localStorage.getItem('idaluno');
        if (data) {
            axios.get(`http://localhost:5000/aluno/${data}`)
                .then((res) => {
                    try {
                        const curso = res.data.curso;
                        const classe = res.data.classe;
                        const turma = res.data.turma;
                        setTurma(`Turma ${curso}${classe}${turma}`);
                    } catch (err) {
                        console.log(err);
                    }
                });
        }

        return () => clearInterval(interval);
    }, []);

    const getEnviado = async () => {
        const box = [];
        const box2 = [];
        const username = localStorage.getItem('usernameAluno');
        try {
            const res = await axios.get('http://localhost:5000/enviado');
            res.data.forEach((item) => {
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
            console.log(err);
        }
    };

    const getAlunoData = async () => {
        try {
            const data = localStorage.getItem('idaluno');
            if (!data) return router.push('/login/aluno/LoginAluno');

            const res = await axios.get(`http://localhost:5000/aluno/${data}`);
            setDatas(res.data);

            if (res.data.permissao === 'Recusar') {
                router.push('/login/aluno/LoginAluno');
            }
        } catch {
            router.push('/login/aluno/LoginAluno');
        }
    };

    return (
        <div>
            <Head>
                <title>ALUNO | Chat</title>
                <link rel="icon" type="image/png" href="../public/images/chat.png" />
            </Head>

            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={`${styleGeral.content} mt-5`}>

                    <div className="w-100 mt-5 d-flex">
                        <button className="btn btn-primary m-3 ms-auto" onClick={toggleModal}>
                            Enviar mensagem
                        </button>
                        <ModalMessage show={modal} closed={modalClose} />
                    </div>

                    {turma && (
                        <div className="list-group m-3">
                            <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" onClick={() => {
                                localStorage.setItem('receptorTurma', turma);
                                router.push('/aluno/mensagemTurma');
                            }}>
                                <Image src={imagem} alt="Perfil" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                <div className="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                        <h6 className="mb-0">{turma}</h6>
                                    </div>
                                    <small className="opacity-50 text-nowrap">envie a sua mensagem</small>
                                </div>
                            </a>
                        </div>
                    )}

                    <div style={{ paddingTop: '20px', width: '100%' }}>
                        {send.map((item, index) => (
                            <div key={index} className="list-group m-3">
                                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" onClick={() => {
                                    localStorage.setItem('receptor', item);
                                    localStorage.setItem('tipo', tipo[index]);
                                    router.push('/aluno/mensagem');
                                }}>
                                    <Image src={imagem} alt="Perfil" width={32} height={32} className="rounded-circle flex-shrink-0" />
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

export default Home;
