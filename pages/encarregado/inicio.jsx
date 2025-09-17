import Image from "next/image";
import { useEffect, useState } from "react";
import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import Hero from "../components/hero";
import Courses from "../components/courses";
import Areas from "../components/areas";

function Inicio() {
    const router = useRouter();
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            getAlunoData();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

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
                <title>Encarregado | Início</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png" />
            </Head>

            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={styleGeral.content}>
                    <div className="d-flex flex-column align-items-center w-100">
                        <Hero />
                        <Areas />
                        <Courses />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inicio;
