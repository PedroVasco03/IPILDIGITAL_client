import NavbarLogin from "./navbarLogin";
import stylelogin from '../../pages/css/navbarlogin.module.css';
import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import MobileRedirect from "./component/mobileRedirect";

function Pesquisar() {
    const [name, setName] = useState('');
    const [senha, setSenha] = useState('');

    const getUser = async (username) => {
        try {
            const response = await axios.get('http://localhost:5000/admin');
            const search = response.data.filter((data) => data.administrador === username);
            setSenha(search.length > 0 ? search[0].senha : 'Não encontrado');
        } catch (err) {
            console.error(err);
            setSenha('Erro ao buscar');
        }
    }

    return (
        <div>
            <Head>
                <title>ADMIN | Pesquisa</title>
            </Head>

            <MobileRedirect />
            <NavbarLogin />

            <div className={`${stylelogin.form} container mt-5 p-4 border rounded`}>
                <h2 className={`text-center mb-4 ${stylelogin.h2}`}>Filtrar - Admin</h2>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Administrador"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <p>Senha: <strong>{senha}</strong></p>

                <button
                    className="btn btn-primary"
                    onClick={() => getUser(name)}
                >
                    Filtrar Dados
                </button>
            </div>
        </div>
    );
}

export default Pesquisar;
