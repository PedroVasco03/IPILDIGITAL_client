import NavBarCoordenacao from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalComponent from "./components/modal";
import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import styleSide from'../css/sideBar.module.css';
import SideBarCoordenacao from "./sidebar";
import Condition from "./condition";
import { useRouter } from "next/router";
import Hero from "../components/hero";

function Home() {
    const [modal, setModal] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(getAlunoData, 1000);
        return () => clearInterval(interval);
    }, []);

    const getAlunoData = async () => {
        try {
            const dataId = localStorage.getItem('iddirector');
            if (!dataId) return router.push('/login/director/login');
            const res = await axios.get(`http://localhost:5000/director/${dataId}`);
            if (res.data.permissao === 'Recusar') router.push('/login/director/login');
        } catch (err) {
            console.log(err);
            router.push('/login/director/login');
        }
    };

    return (
        <div>
            <Head>
                <title>SECRETARIA | Inicio</title>
                <link rel="icon" type="image/png" href="../public/images/chat.png" />
            </Head>

            <NavBarCoordenacao />

            <div className={styleGeral.container}>
                <SideBarCoordenacao />

                <div className={styleGeral.content}>
                    <Hero />

                    {/* Dropdown usando Bootstrap puro */}
                    <div className="dropdown m-3">
                        <button 
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            Horário de Atendimento
                        </button>
                        <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                            <li>
                                <button className="dropdown-item" onClick={() => setModal(true)}>
                                    Criar Horário
                                </button>
                            </li>
                        </ul>
                    </div>

                    <ModalComponent show={modal} closed={() => setModal(false)} />
                    <Condition />
                </div>
            </div>
        </div>
    );
}

export default Home;
