import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import imagem from '../../../public/images/profile_user.png';

function ModalMessage({ show, closed }) {
    const [hidden, setHidden] = useState(false);
    const [change, setChange] = useState('aluno');
    const [datas, setDatas] = useState([]);
    const [tipo, setTipo] = useState('');
    const [procurar, setProcurar] = useState('');
    const router = useRouter();

    useEffect(() => {
        const data = localStorage.getItem('idfuncionario');
        axios.get(`http://localhost:5000/funcionario/${data}`)
            .then(res => setTipo(res.data.tipo))
            .catch(err => console.log(err));

        getUsers('aluno');
    }, []);

    const getUsers = async (userType) => {
        let url = `http://localhost:5000/${userType}`;
        if (userType === 'encarregado' || userType === 'coordenador' || userType === 'director') setHidden(true);
        else setHidden(false);

        await axios.get(url)
            .then(res => setDatas(res.data))
            .catch(err => console.log(err));
    };

    const search = async (query) => {
        if (!query) return getUsers(change);

        let url = `http://localhost:5000/${change}`;
        if (change === 'encarregado' || change === 'coordenador' || change === 'director') setHidden(true);
        else setHidden(false);

        await axios.get(url)
            .then(res => {
                const filtered = res.data.filter(item => item.nome === query);
                setDatas(filtered);
            })
            .catch(err => console.log(err));
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enviar Mensagem</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <select className="form-select mb-2" value={change} onChange={e => { setChange(e.target.value); getUsers(e.target.value); }}>
                            <option value="aluno">Aluno</option>
                            <option value="encarregado">Encarregado</option>
                            <option value="director">Director</option>
                            <option value="coordenador">Coordenador</option>
                        </select>

                        <div className="d-flex mb-3">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Pesquisar usuário"
                                value={procurar}
                                onChange={e => { setProcurar(e.target.value); if (!e.target.value) getUsers(change); }}
                            />
                            <button className="btn btn-primary" onClick={() => search(procurar)}>Pesquisar</button>
                        </div>

                        {datas.map(item => (
                            <div className="list-group mb-2" key={item.nome}>
                                <a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3"
                                   onClick={() => {
                                       localStorage.setItem('receptorFuncionario', item.nome);
                                       localStorage.setItem('tipoFuncionario', item.tipo);
                                       localStorage.setItem('tipoFuncionario2', tipo);
                                       router.push('/funcionario/mensagem');
                                   }}>
                                    <Image src={imagem} alt="Perfil" width="32" height="32" className="rounded-circle flex-shrink-0"/>
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0">{item.nome}</h6>
                                            <p hidden={!hidden} className="mb-0 opacity-75">Curso: {item.curso}</p>
                                            <p hidden={!hidden} className="mb-0 opacity-75">Classe: {item.classe}</p>
                                            <p hidden={!hidden} className="mb-0 opacity-75">Área de formação: {item.area}</p>
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
