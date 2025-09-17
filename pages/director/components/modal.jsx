import { useState, useEffect } from "react";
import axios from "axios";

function ModalComponent({ show, closed }) {
  const [inicio, setInicio] = useState("7:00");
  const [fim, setFim] = useState("7:00");
  const [limite, setLimit] = useState(0);
  const [datas, setDatas] = useState([]);
  const [check, setCheck] = useState(new Array(5).fill(false));
  const [listDay, setListDay] = useState([]);

  const diaSemana = ["segunda", "terça", "quarta", "quinta", "sexta"];
  const hora = [
    "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00",
    "14:30", "15:00",
  ];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/horario-secretaria");
      setDatas(response.data);
    } catch (err) {
      console.log("Erro ao buscar dados:", err);
    }
  };

  const handleOnChange = (index) => {
    const updatedCheck = [...check];
    updatedCheck[index] = !updatedCheck[index];
    setCheck(updatedCheck);

    const day = diaSemana[index];
    if (updatedCheck[index]) {
      setListDay([...listDay, day]);
    } else {
      setListDay(listDay.filter((d) => d !== day));
    }
  };

  const saveData = async (e) => {
    e.preventDefault();

    if (limite <= 0) {
      alert("Deve ter pelo menos o limite de uma pessoa");
      return;
    }

    if (listDay.length === 0) {
      alert("Selecione pelo menos um dia");
      return;
    }

    const horaInicio = inicio.split(":").map(Number);
    const horaFim = fim.split(":").map(Number);
    if (horaInicio[0] > horaFim[0] || (horaInicio[0] === horaFim[0] && horaInicio[1] >= horaFim[1])) {
      alert("Hora de início deve ser menor que hora de fim");
      return;
    }

    const id = localStorage.getItem("iddirector");
    const newList = [...listDay];

    for (let diasemana of newList) {
      await axios.post("http://localhost:5000/horario-secretaria", {
        idhorario: id,
        diasemana,
        inicio,
        fim,
        limite,
      });
    }

    closed(); // fecha o modal
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={saveData}>
            <div className="modal-header">
              <h5 className="modal-title">Horário de Atendimento</h5>
              <button type="button" className="btn-close" onClick={closed}></button>
            </div>
            <div className="modal-body">
              <label className="form-label">Dia de atendimento:</label>
              {diaSemana.map((item, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={check[index]}
                    onChange={() => handleOnChange(index)}
                    id={`dia-${index}`}
                  />
                  <label className="form-check-label" htmlFor={`dia-${index}`}>
                    {item}
                  </label>
                </div>
              ))}

              <label className="form-label mt-3">Hora de início:</label>
              <select className="form-select" value={inicio} onChange={(e) => setInicio(e.target.value)}>
                {hora.map((h, i) => (
                  <option key={i} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <label className="form-label mt-3">Hora de fim:</label>
              <select className="form-select" value={fim} onChange={(e) => setFim(e.target.value)}>
                {hora.map((h, i) => (
                  <option key={i} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <label className="form-label mt-3">Limite de Pessoas:</label>
              <input
                type="number"
                className="form-control"
                value={limite}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Criar
              </button>
              <button type="button" className="btn btn-secondary" onClick={closed}>
                Fechar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
