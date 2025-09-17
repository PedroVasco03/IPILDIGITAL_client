import Head from "next/head";
import SideBarAluno from "./sidebar";
import NavBarAluno from "./navbar";
import styleGeral from '../css/logado.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ModalReferencia from "./components/referencia";

function CertificateRequest() {
    const router = useRouter();
    const [datas, setDatas] = useState({});
    const [nascimento, setNascimento] = useState('');
    const [emissao, setEmissao] = useState('');
    const [numero, setNumero] = useState('');
    const [encarregado, setEncarregado] = useState('');
    const [encarregada, setEncarregada] = useState('');
    const [provincia, setProvincia] = useState('Luanda');
    const [emitido, setEmitido] = useState('Luanda');
    const [ano, setAno] = useState('');
    const [necessitar, setNecessitar] = useState('Certificado');
    const [efeito, setEfeito] = useState('');
    const [modal, setModal] = useState(false);

    const toggleModal = () => setModal(!modal);
    const modalClose = () => setModal(false);

    useEffect(() => {
        const interval = setInterval(() => {
            getAlunoData();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getAlunoData = async () => {
        try {
            const data = localStorage.getItem('idaluno');
            if (!data) return router.push('/login/aluno/LoginAluno');

            const res = await axios.get(`http://localhost:5000/aluno/${data}`);
            setDatas(res.data);
            if (res.data.permissao === 'Recusar') router.push('/login/aluno/LoginAluno');
        } catch (err) {
            console.log(err);
            router.push('/login/aluno/LoginAluno');
        }
    };

    const savePedido = async (e) => {
        e.preventDefault();
        const date = new Date();
        const year = date.getFullYear();
        const dataNascimento = nascimento.split('-');
        const nascer = year - dataNascimento[0];
        const dataEmitir = emissao.split('-');
        const emitir = dataEmitir[0];

        let search;
        const res = await axios.get('http://localhost:5000/pedido');
        search = res.data.filter((item) => item.nome === datas.nome);

        if (search.length === 0) {
            if (ano <= year && nascer >= 15 && emitir <= year && ano >= 1900 && ano <= year) {
                await axios.post('http://localhost:5000/pedido', {
                    nome: datas.nome,
                    encarregado,
                    encarregada,
                    dataNascimento: nascimento,
                    provincia,
                    bi: datas.bi,
                    emitido,
                    dataEmissao: emissao,
                    area: datas.area,
                    curso: datas.curso,
                    classe: datas.classe,
                    turma: datas.turma,
                    numero,
                    anoLectivo: ano,
                    numeroProcesso: datas.numeroprocesso,
                    necessidade: necessitar,
                    efeito,
                    tipo: 'aluno'
                });
                alert('Salvo com sucesso');
            } else {
                alert('Verifique os dados preenchidos (idade, ano lectivo ou emissão)');
            }
        } else {
            alert('O pedido já foi feito');
        }
    };

    return (
        <div>
            <Head>
                <title>Aluno | Pedido </title>
            </Head>
            <NavBarAluno />
            <div className={styleGeral.container}>
                <SideBarAluno />
                <div className={styleGeral.content}>
                    <form className="d-flex flex-column m-3 mt-5" onSubmit={savePedido}>
                        <div className="mb-3">
                            <label className="form-label">Nome:</label>
                            <input type="text" value={datas.nome || ''} readOnly className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Filho de:</label>
                            <input type="text" value={encarregado} onChange={(e) => setEncarregado(e.target.value)} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">e de:</label>
                            <input type="text" value={encarregada} onChange={(e) => setEncarregada(e.target.value)} className="form-control" required />
                        </div>

                        <div className="d-flex flex-wrap mb-3">
                            <div className="me-2 mb-2">
                                <label className="form-label">Data de Nascimento:</label>
                                <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} className="form-control" required />
                            </div>
                            <div className="me-2 mb-2">
                                <label className="form-label">Provincia de:</label>
                                <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="form-select" required>
                                    <option disabled>Provincia</option>
                                    <option value="Luanda">Luanda</option>
                                    <option value="Bengo">Bengo</option>
                                    <option value="Benguela">Benguela</option>
                                    <option value="Bié">Bié</option>
                                    <option value="Cabinda">Cabinda</option>
                                    <option value="Cuando Cubango">Cuando Cubango</option>
                                    <option value="Cuanza Norte">Cuanza Norte</option>
                                    <option value="Cuanza Sul">Cuanza Sul</option>
                                    <option value="Cunene">Cunene</option>
                                    <option value="Huambo">Huambo</option>
                                    <option value="Huíla">Huíla</option>
                                    <option value="Lunda Norte">Lunda Norte</option>
                                    <option value="Lunda Sul">Lunda Sul</option>
                                    <option value="Malanje">Malanje</option>
                                    <option value="Moxico">Moxico</option>
                                    <option value="Namibe">Namibe</option>
                                    <option value="Uíge">Uíge</option>
                                    <option value="Zaíre">Zaíre</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap mb-3">
                            <div className="me-2 mb-2">
                                <label className="form-label">Portador do BI Nº:</label>
                                <input type="text" value={datas.bi || ''} readOnly className="form-control" required />
                            </div>

                            <div className="me-2 mb-2">
                                <label className="form-label">Emitido em:</label>
                                <select value={emitido} onChange={(e) => setEmitido(e.target.value)} className="form-select">
                                    <option disabled>Provincia</option>
                                    <option value="Luanda">Luanda</option>
                                    <option value="Bengo">Bengo</option>
                                    <option value="Benguela">Benguela</option>
                                    <option value="Bié">Bié</option>
                                    <option value="Cabinda">Cabinda</option>
                                    <option value="Cuando Cubango">Cuando Cubango</option>
                                    <option value="Cuanza Norte">Cuanza Norte</option>
                                    <option value="Cuanza Sul">Cuanza Sul</option>
                                    <option value="Cunene">Cunene</option>
                                    <option value="Huambo">Huambo</option>
                                    <option value="Huíla">Huíla</option>
                                    <option value="Lunda Norte">Lunda Norte</option>
                                    <option value="Lunda Sul">Lunda Sul</option>
                                    <option value="Malanje">Malanje</option>
                                    <option value="Moxico">Moxico</option>
                                    <option value="Namibe">Namibe</option>
                                    <option value="Uíge">Uíge</option>
                                    <option value="Zaíre">Zaíre</option>
                                </select>
                            </div>

                            <div className="me-2 mb-2">
                                <label className="form-label">Aos (data de emissão):</label>
                                <input type="date" value={emissao} onChange={(e) => setEmissao(e.target.value)} className="form-control" required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Matriculado na Área de Formação:</label>
                            <input type="text" value={datas.area || ''} readOnly className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Curso Especialidade:</label>
                            <input type="text" value={datas.curso || ''} readOnly className="form-control" required />
                        </div>

                        <div className="d-flex flex-wrap mb-3">
                            <div className="me-2 mb-2">
                                <label className="form-label">Classe:</label>
                                <input type="text" value={datas.classe || ''} readOnly className="form-control" required />
                            </div>
                            <div className="me-2 mb-2">
                                <label className="form-label">Turma:</label>
                                <input type="text" value={datas.turma || ''} readOnly className="form-control" required />
                            </div>
                            <div className="me-2 mb-2">
                                <label className="form-label">Nº:</label>
                                <input type="number" value={numero} onChange={(e) => setNumero(e.target.value)} className="form-control" required />
                            </div>
                            <div className="me-2 mb-2">
                                <label className="form-label">Ano Lectivo:</label>
                                <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} className="form-control" required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Número de Processo:</label>
                            <input type="number" value={datas.numeroprocesso || ''} readOnly className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Necessitando de:</label>
                            <select value={necessitar} onChange={(e) => setNecessitar(e.target.value)} className="form-select" required>
                                <option value="certificado">Certificado</option>
                                <option value="declaração" disabled>Declaração</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Efeitos ou por motivos de:</label>
                            <input type="text" value={efeito} onChange={(e) => setEfeito(e.target.value)} className="form-control" required />
                        </div>

                        <div className="mb-3 d-flex flex-wrap">
                            <button type="submit" className="btn btn-outline-secondary me-2 mb-2">Fazer pedido</button>
                            <button type="button" className="btn btn-outline-primary me-2 mb-2" onClick={() => router.push('/aluno/salvo')}>Ver pedido</button>
                            <button type="button" className="btn btn-primary mb-2" onClick={toggleModal}>Referência</button>
                        </div>

                        <ModalReferencia show={modal} closed={modalClose} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CertificateRequest;
