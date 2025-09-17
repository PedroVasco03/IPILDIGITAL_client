import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import imagem from '../../../public/images/profile_user.png';

function ModalMessage({ show, closed }) {
    const router = useRouter();
    const [change, setChange] = useState('aluno');
    const [datas, setDatas] = useState([]);
    const [area, setArea] = useState('');
    const [tipo, setTipo] = useState('');
    const [procurar, setProcurar] = useState('');

    useEffect(() => {
        const idaluno = localStorage.getItem('idaluno');
        if (idaluno) {
            axios.get(`http://localhost:5000/aluno/${idaluno}`)
                .then(res => setTipo(res.data.tipo))
                .catch(err => console.log(err));

            axios.get('http://localhost:5000/aluno')
                .then(res => {
                    const aluno = res.data.find(a => a.id == idaluno);
                    if (aluno) setArea(aluno.area);
                });
        }
        getUsers('aluno');
    }, []);

    const search = async (dado) => {
        if (!dado) return getUsers(change);

        if (change === 'aluno') {
            const res = await axios.get('http://localhost:5000/aluno');
            const search = res.data.filter(d => d.nome === dado);
            setDatas(search);
        } else {
            const res = await axios.get('http://localhost:5000/encarregado');
            const search = res.data.filter(d => d.nome === dado);
            setDatas(search);
        }
    };

    const getUsers = async (tipoUser) => {
        try {
            if (tipoUser === 'aluno') {
                const res = await axios.get('http://localhost:5000/aluno');
                const idaluno = localStorage.getItem('idaluno');
                const aluno = res.data.find(d => d.id == idaluno);
                const search = res.data.filter(d => d.id != idaluno && d.area === aluno.area);
                setDatas(search);
            } else if (tipoUser === 'coordenador') {
                const res = await axios.get('http://localhost:5000/coordenador');
                const search = res.data.filter(item => item.area === area);
                setDatas(search);
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enviar Mensagem</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body d-flex flex-column">
                        <select className="form-select mb-2" value={change} onChange={(e) => {
                            setChange(e.target.value);
                            getUsers(e.target.value);
                        }}>
                            <option value="aluno">Aluno</option>
                            <option value="coordenador">Coordenador</option>
                        </select>

                        <div className="d-flex mb-3">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Pesquisar usuário"
                                value={procurar}
                                onChange={(e) => {
                                    setProcurar(e.target.value);
                                    if (!e.target.value) getUsers(change);
                                }}
                            />
                            <button className="btn btn-primary" onClick={() => search(procurar)}>Pesquisar</button>
                        </div>

                        {datas.length === 0 && <p>Nenhum usuário encontrado.</p>}

                        {datas.map((item) => (
                            <div key={item.id} className="list-group mb-2">
                                <a
                                    href="#"
                                    className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                    onClick={() => {
                                        localStorage.setItem('receptor', item.nome);
                                        localStorage.setItem('tipo', item.tipo);
                                        localStorage.setItem('tipo2', tipo);
                                        router.push('/aluno/mensagem');
                                    }}
                                >
                                    <Image src={imagem} alt="Perfil" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0">{item.nome}</h6>
                                            {change === 'aluno' && (
                                                <>
                                                    <p className="mb-0 opacity-75">Curso: {item.curso}</p>
                                                    <p className="mb-0 opacity-75">Classe: {item.classe}</p>
                                                </>
                                            )}
                                            <p className="mb-0 opacity-75">Área de formação: {item.area}</p>
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
