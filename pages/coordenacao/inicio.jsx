import Image from "next/image";
import NavBarCoordenacao from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalComponent from "./components/modal";
import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import styleSide from '../css/sideBar.module.css';
import SideBarCoordenacao from "./sidebar";
import Condition from "./condition";
import { useRouter } from "next/router";
import Hero from "../components/hero";

function HomeCoordenacao() {
    const router = useRouter();
    const [datas, setDatas] = useState([]);
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
            if (res.data.permissao === 'Recusar') router.push('/login/coordenacao/login');
        } catch (err) {
            console.log(err);
            router.push('/login/coordenacao/login');
        }
    };

    const toggleModal = () => setModal(prev => !prev);
    const toggleDropdown = () => setDropdownOpen(prev => !prev);

    return (
        <div>
            <Head>
                <title>COORDENACAO | Inicio</title>
                <link rel="icon" type="image/png" href="../public/images/chat.png" />
            </Head>

            <NavBarCoordenacao />
            <div className={styleGeral.container}>
                <SideBarCoordenacao />
                <div className={styleGeral.content}>
                    <Hero />

                    {/* Dropdown simples usando Bootstrap */}
                    <div className="dropdown my-3">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            onClick={toggleDropdown}
                        >
                            Horário de Atendimento
                        </button>
                        <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                            <li>
                                <a className="dropdown-item" onClick={toggleModal}>Criar Horário</a>
                            </li>
                        </ul>
                    </div>

                    <ModalComponent show={modal} closed={toggleModal} />

                    <Condition />
                </div>
            </div>
        </div>
    );
}

export default HomeCoordenacao;
