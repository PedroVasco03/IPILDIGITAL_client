import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import empty from '../../public/images/images-system/empty.png';
import ModalView from "./components/modalVisualizar";
import ModalConfirmation from "./components/modalConfirmation";
import { useRouter } from "next/router";

function Condition() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [reclamacao, setReclamacao] = useState([]);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [message, setMessage] = useState([]);
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [dia, setDia] = useState('');
    const [filter, setFilter] = useState([]);
    const [id, setId] = useState('');
    const [dias, setDias] = useState([]);
    const [alterar, setAlterar] = useState('');

    useEffect(() => {
        getUsers();
        filtrarDias();
        getReclamacao();
    }, []);

    const filtrarDias = async () => {
        let option = ['Verifique o dia de atendimento'];
        await axios.get('http://localhost:5000/horario-coordenacao')
            .then((response) => {
                const idcoordenador = localStorage.getItem('idcoordenador');
                const all = response.data.filter((data) => data.idcoordenador === idcoordenador);
                all.forEach((item) => option.push(item.diasemana));
                setDias(option);
            }).catch(console.log);
    };

    const getReclamacao = async () => {
        await axios.get('http://localhost:5000/reclamacao')
            .then((response) => {
                const idcoordenador = localStorage.getItem('idcoordenador');
                const all = response.data.filter((data) => data.idlocal === idcoordenador && data.diasemana === alterar);
                setFilter(all);
            }).catch(console.log);
    };

    const filtrarReclamacao = async (change) => {
        await axios.get('http://localhost:5000/reclamacao')
            .then((response) => {
                const idcoordenador = localStorage.getItem('idcoordenador');
                const all = response.data.filter((data) => data.idlocal === idcoordenador && data.diasemana === change);
                setFilter(all);
            }).catch(console.log);
    };

    const getUsers = async () => {
        await axios.get('http://localhost:5000/horario-coordenacao')
            .then((response) => {
                const dado = localStorage.getItem('idcoordenador');
                const search = response.data.filter((data) => data.idcoordenador === dado);
                setData(search);
            }).catch(() => console.log('erro: solicitação negada'));
    };

    if (data.length === 0) {
        return (
            <div className="d-flex flex-column align-items-center w-100">
                <Image className="img-fluid" src={empty} alt="Nenhuma actividade" />
                <p>Nenhuma actividade.</p>
            </div>
        );
    }

    return (
        <div className="m-5">
            <div className="card p-4 mb-3">
                <div className="d-flex flex-wrap">
                    <label className="m-1 fs-5">Dias de Atendimento:</label>
                    {data.map((item) => (
                        <label key={item.id} className="m-1 fs-5">{item.diasemana}</label>
                    ))}
                </div>
                <label className="fw-bold m-2 fs-5">
                    Atendimento das {data[0].inicio}h às {data[0].fim}h
                </label>
                <label className="m-2 fs-5">
                    Limite de pessoas para atendimento: {data[0].limite}
                </label>
            </div>

            <div className="mt-3">
                <div className="d-flex mb-3 align-items-center">
                    <select
                        className="form-select m-2"
                        style={{ width: '300px' }}
                        value={alterar}
                        onChange={(e) => {
                            setAlterar(e.target.value);
                            filtrarReclamacao(e.target.value);
                        }}
                    >
                        {dias.map((item, idx) => (
                            <option key={idx} value={item}>{item}</option>
                        ))}
                    </select>
                    <button
                        type="button"
                        className="btn btn-secondary m-2"
                        title="Actualize alguns dados podem estar desactualizados"
                        onClick={getReclamacao}
                    >
                        Actualizar dados
                    </button>
                </div>

                <h5>Agendados:</h5>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Senha</th>
                                <th>Dia de semana</th>
                                <th>Hora</th>
                                <th>Permissão</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filter.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.idsenha}</td>
                                    <td>{item.diasemana}</td>
                                    <td>{item.hora}</td>
                                    <td className="d-flex flex-wrap gap-1">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => { setId(item.id); setModal2(true); }}
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => { setDia(item.diasemana); setSenha(item.idsenha); setMensagem(item.mensagem); setModal(true); }}
                                        >
                                            Visualizar
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => {
                                                axios.get(`http://localhost:5000/aluno/${item.idaluno}`).then((res) => {
                                                    localStorage.setItem('receptorCoordenador', res.data.nome);
                                                    router.push('/coordenacao/mensagem');
                                                });
                                            }}
                                        >
                                            Enviar mensagem
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <ModalView show={modal} closed={() => setModal(false)} senha={senha} mensagem={mensagem} dia={dia} />
            <ModalConfirmation show={modal2} closed={() => setModal2(false)} id={id} route="reclamacao" />
        </div>
    );
}

export default Condition;
