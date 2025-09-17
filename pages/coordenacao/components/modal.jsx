import { useState, useEffect } from "react";
import axios from "axios";

const listDay = [];

function ModalComponent({ show, closed }) {
    const [inicio, setInicio] = useState("7:00");
    const [fim, setFim] = useState("7:00");
    const [limite, setLimit] = useState(0);
    const [datas, setDatas] = useState([]);
    const [check, setCheck] = useState(new Array(5).fill(false));

    const diaSemana = ["segunda", "terça", "quarta", "quinta", "sexta"];
    const hora = [
        "7:00","7:30","8:00","8:30","9:00","9:30",
        "10:00","10:30","11:00","11:30","12:00","12:30",
        "13:00","13:30","14:00","14:30","15:00"
    ];

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/horario-coordenacao");
            console.log("buscando dados no banco de dados");
            setDatas(response.data);
        } catch (err) {
            console.log("erro: solicitação negada");
        }
    };

    const handleOnChange = (position) => {
        const updateCheck = check.map((item, index) =>
            position === index ? !item : item
        );
        setCheck(updateCheck);
        setDay(diaSemana[position], position);
    };

    const setDay = (item, index) => {
        if (!check[index]) {
            listDay.push(item);
        } else {
            const number = listDay.indexOf(item);
            listDay.splice(number, 1);
        }
    };

    const saveData = async (e) => {
        e.preventDefault();
        try {
            if (limite <= 0) {
                alert("Deve ter pelo menos o limite de uma pessoa");
                return;
            }

            if (listDay.length === 0) return;

            const horaInicio = inicio.split(":");
            const horaFim = fim.split(":");

            if (Number(horaInicio[0]) >= Number(horaFim[0])) {
                alert("A hora de início deve ser menor que a hora de fim");
                return;
            }

            const id = localStorage.getItem("idcoordenador");

            // Deletar horários e reclamações existentes
            const search = datas.filter((data) => data.idcoordenador === id);
            await Promise.all(
                search.map((item) =>
                    axios.delete(`http://localhost:5000/horario-coordenacao/${item.id}`)
                )
            );

            const reclamacoes = await axios.get("http://localhost:5000/reclamacao");
            await Promise.all(
                reclamacoes.data
                    .filter((r) => r.idlocal === id)
                    .map((r) => axios.delete(`http://localhost:5000/reclamacao/${r.id}`))
            );

            // Criar novos horários
            function compararDiasDaSemana(dia1, dia2) {
                const ordem = ["segunda", "terça", "quarta", "quinta", "sexta"];
                return ordem.indexOf(dia1) - ordem.indexOf(dia2);
            }

            const newList = listDay.sort(compararDiasDaSemana);

            await Promise.all(
                newList.map((diasemana) =>
                    axios.post("http://localhost:5000/horario-coordenacao", {
                        idcoordenador: id,
                        diasemana,
                        inicio,
                        fim,
                        limite,
                    })
                )
            );

            localStorage.setItem("status-bar", listDay);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Horário de Atendimento</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <form onSubmit={saveData}>
                        <div className="modal-body">
                            <label className="form-label">Dia de atendimento:</label>
                            {diaSemana.map((item, index) => (
                                <div className="form-check" key={index}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`dia-${index}`}
                                        checked={check[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label className="form-check-label" htmlFor={`dia-${index}`}>
                                        {item}
                                    </label>
                                </div>
                            ))}

                            <label htmlFor="hora-inicio" className="form-label mt-3">
                                Hora de atendimento início:
                            </label>
                            <select
                                id="hora-inicio"
                                className="form-select"
                                value={inicio}
                                onChange={(e) => setInicio(e.target.value)}
                            >
                                {hora.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>

                            <label htmlFor="hora-fim" className="form-label mt-3">
                                Hora de atendimento fim:
                            </label>
                            <select
                                id="hora-fim"
                                className="form-select"
                                value={fim}
                                onChange={(e) => setFim(e.target.value)}
                            >
                                {hora.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>

                            <label htmlFor="limite" className="form-label mt-3">
                                Limite de Pessoas:
                            </label>
                            <input
                                type="number"
                                id="limite"
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
