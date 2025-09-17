import axios from "axios";
import { useEffect, useState } from "react";

function ModalReferencia({ show, closed }) {
    const [rupe, setRupe] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('usernameAluno');
        const interval = setInterval(() => {
            axios.get('http://localhost:5000/solicitacao')
                .then((response) => {
                    const search = response.data.filter(item => item.nomealuno === username);
                    setRupe(search[0]?.referencia || "");
                })
                .catch((err) => {
                    setRupe("");
                    console.log(err);
                });
        }, 1000);

        return () => clearInterval(interval); // limpa o interval ao desmontar
    }, []);

    if (!show) return null; // não renderiza se show for falso

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Referência</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <h3>Referência: {rupe}</h3>
                        <p className="text-muted my-3">Utilizado para fins de pagamento</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closed}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalReferencia;
