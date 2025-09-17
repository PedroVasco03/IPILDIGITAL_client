import React, { useEffect, useState } from "react";
import axios from "axios";

function ModalRupe({ show, closed, usuario }) {
    const [rupes, setRupes] = useState([]);
    const [rupe, setRupe] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            getRupes();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getRupes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/rupe-gerado');
            const search = res.data.filter(item => item.estado === 'activo');
            setRupes(search);
        } catch (err) {
            console.log(err);
        }
    };

    const save = async () => {
        try {
            const resRupe = await axios.get('http://localhost:5000/rupe-gerado');
            const searchRupe = resRupe.data.filter(item => item.rupe === rupe);
            const referencia_id = searchRupe[0]?.id;

            const resSolicitacao = await axios.get('http://localhost:5000/solicitacao');
            const dado = resSolicitacao.data.filter(item => item.nomealuno === usuario);

            if (dado.length === 0) {
                if (rupe !== 0 && referencia_id) {
                    await axios.patch(`http://localhost:5000/rupe-gerado/${referencia_id}`, {
                        estado: 'pendente'
                    });
                    await axios.post('http://localhost:5000/solicitacao', {
                        nomealuno: usuario,
                        referencia: rupe
                    });
                    alert('Rupe enviado com sucesso');
                }
            } else {
                alert('Já enviaste a referência para esse usuário');
            }
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Referência</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Referência:</label>
                            <select className="form-select" value={rupe} onChange={e => setRupe(e.target.value)}>
                                <option value={0}></option>
                                {rupes.map(item => (
                                    <option key={item.id} value={item.rupe}>{item.rupe}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Aluno:</label>
                            <input className="form-control" value={usuario} readOnly />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={save}>Enviar referência</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRupe;
