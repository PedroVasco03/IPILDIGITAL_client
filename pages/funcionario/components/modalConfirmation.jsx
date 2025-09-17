import axios from "axios";
import { useState } from "react";

function ModalConfirmation({ show, closed, id, route, referencia }) {

    const deleteData = async () => {
        await axios.delete(`http://localhost:5000/${route}/${id}`);

        if (route === 'rupe-gerado') {
            await axios.get(`http://localhost:5000/solicitacao`)
                .then(res => {
                    const dado = res.data.filter(item => item.referencia === referencia);
                    if(dado[0]){
                        axios.delete(`http://localhost:5000/solicitacao/${dado[0].id}`);
                    }             
                })
                .catch(err => console.log(err));
        }

        if (route === 'pedido') {
            await axios.get(`http://localhost:5000/rupe-gerado`)
                .then(res => {
                    const dado = res.data.filter(item => item.rupe === referencia);
                    if(dado[0]){
                        axios.patch(`http://localhost:5000/rupe-gerado/${dado[0].id}`, { estado: "inactivo" });
                    }             
                })
                .catch(err => console.log(err));

            await axios.get(`http://localhost:5000/solicitacao`)
                .then(res => {
                    const dado = res.data.filter(item => item.referencia === referencia);
                    if(dado[0]){
                        axios.delete(`http://localhost:5000/solicitacao/${dado[0].id}`);
                    }             
                })
                .catch(err => console.log(err));
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
                        <button type="button" className="btn btn-outline-primary" style={{ padding: '5px 16px' }} 
                            onClick={() => { deleteData(); closed(); }}>
                            Sim
                        </button>
                        <button type="button" className="btn btn-outline-danger" style={{ padding: '5px 16px' }} 
                            onClick={closed}>
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmation;
