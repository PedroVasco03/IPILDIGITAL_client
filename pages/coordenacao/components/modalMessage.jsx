import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import imagem from '../../../public/images/profile_user.png';

function ModalMessage({ show, closed }) {
    const [hidden, setHidden] = useState(false);
    const [change, setChange] = useState('encarregado');
    const [datas, setDatas] = useState([]);
    const [newdata, setNewData] = useState([]);
    const [procurar, setProcurar] = useState('');
    const [tipo, setTipo] = useState('');
    const router = useRouter();

    const getAlunoData = async () => {
        try {
            const id = localStorage.getItem('idcoordenador');
            const res = await axios.get(`http://localhost:5000/coordenador/${id}`);
            setNewData(res.data);
            setTipo(res.data.tipo);
        } catch (err) {
            console.log(err);
        }
    };

    const getUsers = async (changeType) => {
        try {
            setHidden(changeType !== 'aluno');
            let url = 'aluno';
            if (changeType === 'encarregado') url = 'encarregado';
            else if (changeType === 'director') url = 'director';
            else if (changeType === 'funcionario') url = 'funcionario';

            const res = await axios.get(`http://localhost:5000/${url}`);
            if (changeType === 'aluno') {
                const filtered = res.data.filter(item => item.area === newdata.area);
                setDatas(filtered);
            } else {
                setDatas(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const search = async (dado) => {
        if (!dado) {
            getUsers(change);
            return;
        }
        let url = change === 'aluno' ? 'aluno' : change;
        try {
            const res = await axios.get(`http://localhost:5000/${url}`);
            const filtered = res.data.filter(item => item.nome === dado);
            setDatas(filtered);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAlunoData();
        getUsers(change);
    }, []);

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enviar Mensagem</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column mb-3">
                            <select className="form-select mb-2" value={change} onChange={(e) => { setChange(e.target.value); getUsers(e.target.value); }}>
                                <option value="encarregado">Encarregado</option>
                                <option value="funcionario">Funcionario</option>
                                <option value="director">Director</option>
                                <option value="aluno">Aluno</option>
                            </select>
                            <div className="d-flex">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={procurar}
                                    onChange={(e) => { setProcurar(e.target.value); if (!e.target.value) getUsers(change); }}
                                    placeholder="Pesquisar usuário"
                                />
                                <button className="btn btn-primary" onClick={() => search(procurar)}>Pesquisar</button>
                            </div>
                        </div>
                        {datas.map((item, idx) => (
                            <div key={idx} className="list-group mb-2">
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                    onClick={() => {
                                        localStorage.setItem('receptorCoordenador', item.nome);
                                        localStorage.setItem('tipoCoordenador', item.tipo);
                                        localStorage.setItem('tipoCoordenador2', tipo);
                                        router.push('/coordenacao/mensagem');
                                    }}
                                >
                                    <Image src={imagem} alt="Perfil" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0">{item.nome}</h6>
                                            <p hidden={hidden} className="mb-0 opacity-75">Curso: {item.curso}</p>
                                            <p hidden={hidden} className="mb-0 opacity-75">Classe: {item.classe}</p>
                                            <p hidden={hidden} className="mb-0 opacity-75">Área de formação: {item.area}</p>
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

export default ModalMessage;
