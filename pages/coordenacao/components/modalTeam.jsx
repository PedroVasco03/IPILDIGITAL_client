import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import imagem from '../../../public/images/profile_user.png';

function ModalTeam({ show, closed, idcoordencao }) {
    const router = useRouter();
    const [datas, setDatas] = useState([]);
    const [procurar, setProcurar] = useState('');

    const getUsers = async () => {
        try {
            // Obter área do coordenador
            const idaluno = localStorage.getItem('idcoordenador');
            const coordRes = await axios.get('http://localhost:5000/coordenador');
            const aluno = coordRes.data.find(d => d.id === idaluno);
            const area = aluno?.area;

            // Filtrar alunos da mesma área
            const alunoRes = await axios.get('http://localhost:5000/aluno');
            const search = alunoRes.data.filter(d => d.area === area);
            setDatas(search);
        } catch (err) {
            console.log(err);
        }
    };

    const searchUser = async (dado) => {
        if (!dado) return getUsers();
        const res = await axios.get('http://localhost:5000/aluno');
        const search = res.data.filter(d => d.nome === dado);
        setDatas(search);
    };

    const addUser = async (nome) => {
        const idcoordenador = localStorage.getItem('idcoordenador');
        await axios.post('http://localhost:5000/coordenacao-integrante', { idcoordenador, nome });
        window.location.reload();
    };

    useEffect(() => {
        if (show) getUsers();
    }, [show]);

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Adicionar Integrantes</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <h3>Alunos</h3>
                            <div className="d-flex mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Pesquisar usuário"
                                    value={procurar}
                                    onChange={e => setProcurar(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={() => searchUser(procurar)}
                                >
                                    Pesquisar
                                </button>
                            </div>

                            {datas.map(item => (
                                <div className="list-group mb-2" key={item.id}>
                                    <div className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <div className="d-flex gap-3 align-items-center">
                                            <Image src={imagem} alt="perfil" width={32} height={32} className="rounded-circle" />
                                            <div>
                                                <h6 className="mb-0">{item.nome}</h6>
                                                <p className="mb-0 opacity-75">Curso: {item.curso}</p>
                                                <p className="mb-0 opacity-75">Classe: {item.classe}</p>
                                                <p className="mb-0 opacity-75">Área de formação: {item.area}</p>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => addUser(item.nome)}
                                        >
                                            Adicionar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTeam;
