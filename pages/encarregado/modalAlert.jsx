import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ModalAlert({ show, closed, id, route }) {
    const router = useRouter();

    async function deleteData() {
        await axios.delete(`http://localhost:5000/${route}/${id}`);
        localStorage.removeItem('idencarregado');
        router.push('/login/encarregado/login');
    }

    if (!show) return null; // Não renderiza se não estiver visível

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmação</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <p style={{ fontSize: '1.2rem' }}>
                            Tens a certeza que desejas <strong className="text-danger">eliminar</strong> isto?
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn btn-outline-primary" 
                            style={{ padding: '5px 16px' }} 
                            onClick={() => { deleteData(); closed(); }}
                        >
                            Sim
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline-danger" 
                            style={{ padding: '5px 16px' }} 
                            onClick={closed}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAlert;
