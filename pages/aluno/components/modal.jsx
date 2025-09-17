import axios from "axios";
import { useEffect, useState } from "react";

function ModalComponent({ show, closed }) {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        if (show) {
            getUsers();
        }
    }, [show]);

    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/reclamacao');
            const aluno = localStorage.getItem('idaluno');
            const search = res.data.filter((data) => data.idaluno === aluno);
            setDatas(search);
        } catch {
            console.log('Erro: solicitação negada');
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/reclamacao/${id}`);
            alert('Marcação eliminada!');
            getUsers();
            const generator = Math.floor(Math.random() * 1000);
            localStorage.setItem('status-value', generator);
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
                        <h5 className="modal-title">Marcações agendadas</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        {datas.length === 0 && <p>Nenhuma marcação encontrada.</p>}
                        {datas.map((item) => (
                            <div key={item.id} className="card m-3">
                                <div className="card-body">
                                    <p><strong>Para:</strong> {item.para}</p>
                                    <p><strong>Senha:</strong> {item.idsenha}</p>
                                    <p><strong>Dia:</strong> {item.diasemana}</p>
                                    <p><strong>Hora:</strong> {item.hora}</p>
                                    <p><strong>Mensagem:</strong> {item.mensagem}</p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteUser(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closed}>
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalComponent;
