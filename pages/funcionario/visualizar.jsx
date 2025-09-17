import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import styleGeral from '../css/logado.module.css';

function Visualizar() {
    const router = useRouter();
    const [datas, setDatas] = useState({});
    const [pedidos, setPedidos] = useState({});
    
    // Atualiza dados do funcionário e pedido a cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            getAlunoData();
            getPedido();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getPedido = async () => {
        const nome = localStorage.getItem('view');
        try {
            const res = await fetch('http://localhost:5000/pedido');
            const data = await res.json();
            const search = data.find(item => item.nome === nome);
            if (search) {
                setPedidos({
                    id: search.id,
                    nome: search.nome,
                    encarregado: search.encarregado,
                    encarregada: search.encarregada,
                    dataNascimento: search.dataNascimento,
                    provincia: search.provincia,
                    bi: search.bi,
                    emitido: search.emitido,
                    dataEmissao: search.dataEmissao,
                    area: search.area,
                    curso: search.curso,
                    classe: search.classe,
                    turma: search.turma,
                    numero: search.numero,
                    anoLectivo: search.anoLectivo,
                    numeroprocesso: search.numeroProcesso,
                    necessidade: search.necessidade,
                    efeito: search.efeito
                });
            } else {
                setPedidos({});
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getAlunoData = async () => {
        const data = localStorage.getItem('idfuncionario');
        if (!data) {
            router.push('/login/funcionario/login');
            return;
        }
        try {
            const res = await fetch(`http://localhost:5000/funcionario/${data}`);
            const json = await res.json();
            setDatas(json);
            if (json.permissao === 'Recusar') router.push('/login/funcionario/login');
        } catch (err) {
            console.log(err);
            router.push('/login/funcionario/login');
        }
    };

    return (
        <div>
            <Head>
                <title>Funcionario | Pedido Aluno</title>
            </Head>
            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={styleGeral.content + " mt-5"}>
                    <div className="container py-3">
                        <h3 className="mb-4">Detalhes do Pedido</h3>

                        <div className="mb-3">
                            <label className="form-label">Nome:</label>
                            <input type="text" className="form-control" value={pedidos.nome || ''} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Filho de:</label>
                            <input type="text" className="form-control" value={pedidos.encarregado || ''} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">e de:</label>
                            <input type="text" className="form-control" value={pedidos.encarregada || ''} readOnly />
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Data de Nascimento:</label>
                                <input type="date" className="form-control" value={pedidos.dataNascimento || ''} readOnly />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Província:</label>
                                <input type="text" className="form-control" value={pedidos.provincia || ''} readOnly />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Portador do BI Nº:</label>
                                <input type="text" className="form-control" value={pedidos.bi || ''} readOnly />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Emitido em:</label>
                                <input type="text" className="form-control" value={pedidos.emitido || ''} readOnly />
                            </div>
                            <div className="col-md-4 mb-3">
                                <label className="form-label">Data de emissão:</label>
                                <input type="date" className="form-control" value={pedidos.dataEmissao || ''} readOnly />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Área de Formação:</label>
                            <input type="text" className="form-control" value={pedidos.area || ''} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Curso/Especialidade:</label>
                            <input type="text" className="form-control" value={pedidos.curso || ''} readOnly />
                        </div>

                        <h5 className="mt-4 mb-3">Última Frequência</h5>
                        <div className="row mb-3">
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Classe:</label>
                                <input type="text" className="form-control" value={pedidos.classe || ''} readOnly />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Turma:</label>
                                <input type="text" className="form-control" value={pedidos.turma || ''} readOnly />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Nº:</label>
                                <input type="number" className="form-control" value={pedidos.numero || ''} readOnly />
                            </div>
                            <div className="col-md-3 mb-3">
                                <label className="form-label">Ano Lectivo:</label>
                                <input type="number" className="form-control" value={pedidos.anoLectivo || ''} readOnly />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Número de Processo:</label>
                            <input type="number" className="form-control" value={pedidos.numeroprocesso || ''} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Necessidade:</label>
                            <input type="text" className="form-control" value={pedidos.necessidade || ''} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Efeitos / Motivos:</label>
                            <input type="text" className="form-control" value={pedidos.efeito || ''} readOnly />
                        </div>

                        <button className="btn btn-outline-primary mt-3" onClick={() => router.push('/funcionario/solicitacao')}>
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Visualizar;
