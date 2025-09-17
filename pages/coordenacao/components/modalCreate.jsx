import axios from "axios";
import { useEffect, useState } from "react";

function ModalCreate({ show, closed }) {
    const [name, setName] = useState('');
    const [item, setItem] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const id = localStorage.getItem('idcoordenador');
        try {
            const response = await axios.get("http://localhost:5000/coordenacao");
            const search = response.data.filter((data) => data.idcoordenador === id);
            setItem(search);
        } catch (err) {
            console.log(err);
        }
    };

    const saveData = async () => {
        const id = localStorage.getItem("idcoordenador");
        if (name !== "") {
            if (item.length === 0) {
                try {
                    await axios.post("http://localhost:5000/coordenacao", {
                        nome: name,
                        idcoordenador: id
                    });
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert('Coordenação já foi criada!');
            }
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Coordenação</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nome da coordenação"
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                saveData();
                                closed();
                            }}
                        >
                            Criar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalCreate;
