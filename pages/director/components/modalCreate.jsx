import axios from "axios";
import { useEffect, useState } from "react";

function ModalCreate({ show, closed }) {
  const [name, setName] = useState("");
  const [item, setItem] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const value = localStorage.getItem("iddirector");
    try {
      const response = await axios.get("http://localhost:5000/secretaria");
      const search = response.data.filter((data) => data.iddirector === value);
      setItem(search);
    } catch (err) {
      console.log(err);
    }
  };

  const saveData = async () => {
    const data = localStorage.getItem("iddirector");
    if (name !== "") {
      if (item.length === 0) {
        await axios.post("http://localhost:5000/secretaria", {
          iddirector: data,
          nome: name,
        });
        window.location.reload();
      }
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Secretária</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Nome da Secretária"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveData}
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
