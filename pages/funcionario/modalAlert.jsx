import axios from "axios";
import { useRouter } from "next/router";

function ModalAlert({ show, closed, id, route }) {
    const router = useRouter();

    const deleteData = async () => {
        try {
            await axios.delete(`http://localhost:5000/${route}/${id}`);
            localStorage.removeItem('idfuncionario');
            router.push('/login/funcionario/login');
        } catch (err) {
            console.error(err);
        }
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmação</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <p style={{ fontSize: '1.2rem' }}>
                            Tens a certeza que desejas <strong className="text-danger">eliminar</strong> isto?
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline-primary" style={{ padding: '5px 16px' }} onClick={() => { deleteData(); closed(); }}>
                            Sim
                        </button>
                        <button className="btn btn-outline-danger" style={{ padding: '5px 16px' }} onClick={closed}>
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAlert;
