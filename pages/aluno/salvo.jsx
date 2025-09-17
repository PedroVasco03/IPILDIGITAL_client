import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import styleGeral from '../css/logado.module.css';
import ModalConfirmation from "./components/modalConfirmation";

function CertificateRequest() {
    const router = useRouter();
    const [pedido, setPedido] = useState(null);
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    const modalClose = () => setModal(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const idAluno = localStorage.getItem('idaluno');
            if (!idAluno) return router.push('/login/aluno/LoginAluno');

            // Buscar dados do aluno
            const alunoRes = await axios.get(`http://localhost:5000/aluno/${idAluno}`);
            if (alunoRes.data.permissao === 'Recusar') return router.push('/login/aluno/LoginAluno');

            const nome = alunoRes.data.nome;

            // Buscar pedido
            const pedidoRes = await axios.get('http://localhost:5000/pedido');
            const pedidoEncontrado = pedidoRes.data.find(item => item.nome === nome);

            if (pedidoEncontrado) setPedido(pedidoEncontrado);

        } catch (err) {
            console.error(err);
            router.push('/login/aluno/LoginAluno');
        }
    };

    if (!pedido) {
        return (
            <div className="text-center mt-5">
                <p>Não há pedido registrado ainda.</p>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>Aluno | Pedido</title>
            </Head>
            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={styleGeral.content}>
                    <div className="container mt-4">
                        <h3 className="mb-4">Detalhes do Pedido</h3>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-2">
                                <label>Nome:</label>
                                <input type="text" className="form-control" value={pedido.nome} readOnly />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Filho de:</label>
                                <input type="text" className="form-control" value={pedido.encarregado} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-2">
                                <label>e de:</label>
                                <input type="text" className="form-control" value={pedido.encarregada} readOnly />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Data de Nascimento:</label>
                                <input type="date" className="form-control" value={pedido.dataNascimento} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-4 mb-2">
                                <label>Provincia:</label>
                                <input type="text" className="form-control" value={pedido.provincia} readOnly />
                            </div>
                            <div className="col-md-4 mb-2">
                                <label>BI Nº:</label>
                                <input type="text" className="form-control" value={pedido.bi} readOnly />
                            </div>
                            <div className="col-md-4 mb-2">
                                <label>Emitido em:</label>
                                <input type="text" className="form-control" value={pedido.emitido} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-4 mb-2">
                                <label>Data de Emissão:</label>
                                <input type="date" className="form-control" value={pedido.dataEmissao} readOnly />
                            </div>
                            <div className="col-md-4 mb-2">
                                <label>Área de Formação:</label>
                                <input type="text" className="form-control" value={pedido.area} readOnly />
                            </div>
                            <div className="col-md-4 mb-2">
                                <label>Curso/Especialidade:</label>
                                <input type="text" className="form-control" value={pedido.curso} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-3 mb-2">
                                <label>Classe:</label>
                                <input type="text" className="form-control" value={pedido.classe} readOnly />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Turma:</label>
                                <input type="text" className="form-control" value={pedido.turma} readOnly />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Nº:</label>
                                <input type="number" className="form-control" value={pedido.numero} readOnly />
                            </div>
                            <div className="col-md-3 mb-2">
                                <label>Ano Lectivo:</label>
                                <input type="number" className="form-control" value={pedido.anoLectivo} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-2">
                                <label>Número de Processo:</label>
                                <input type="number" className="form-control" value={pedido.numeroprocesso} readOnly />
                            </div>
                            <div className="col-md-6 mb-2">
                                <label>Necessitando de:</label>
                                <input type="text" className="form-control" value={pedido.necessidade} readOnly />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label>Efeito / Motivo:</label>
                            <input type="text" className="form-control" value={pedido.efeito} readOnly />
                        </div>

                        <div className="mt-4">
                            <button className="btn btn-danger me-2" onClick={toggleModal}>
                                Eliminar
                            </button>
                        </div>

                        {modal && <ModalConfirmation show={modal} closed={modalClose} id={pedido.id} route="pedido" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CertificateRequest;
