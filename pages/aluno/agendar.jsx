import Head from "next/head";
import styleGeral from '../css/logado.module.css';
import NavBarAluno from "./navbar";
import SideBarAluno from "./sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalComponent from "./components/modal";
import { useRouter } from "next/router";
import Marcation from "../components/marcation";

function Agend() {
  const [datas, setDatas] = useState([]);
  const [hora, setHora] = useState([]);
  const [aluno, setAluno] = useState([]);
  const [horario, setHorario] = useState([]);
  const [coordenador, setCoordenador] = useState("");
  const [para, setPara] = useState("Coordenação");
  const [senha, setSenha] = useState(0);
  const [dia, setDia] = useState("segunda");
  const [hour, setHour] = useState("7:00");
  const [mensagem, setMensagem] = useState("");
  const [modal, setModal] = useState(false);

  const router = useRouter();
  const toggleModal = () => setModal(!modal);
  const modalClose = () => setModal(false);

  const diaSemana = [
    "7:00","7:30","8:00","8:30","9:00","9:30",
    "10:00","10:30","11:00","11:30","12:00",
    "12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30"
  ];

  useEffect(() => {
    getHorario("Coordenação");
    getHorario("Secretária");
  }, []);

  useEffect(() => {
    const interval = setInterval(getAlunoData, 1000);
    const generator = Math.floor(Math.random() * 1000000);
    setSenha(generator);
    getUsers();
    return () => clearInterval(interval);
  }, []);

  const getAlunoData = async () => {
    try {
      const data = localStorage.getItem("idaluno");
      if (!data) return router.push("/login/aluno/LoginAluno");

      const res = await axios.get(`http://localhost:5000/aluno/${data}`);
      setDatas(res.data);

      if (res.data.permissao === "Recusar") {
        router.push("/login/aluno/LoginAluno");
      }
    } catch {
      router.push("/login/aluno/LoginAluno");
    }
  };

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/reclamacao");
      setAluno(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getHorario = async (route) => {
    try {
      if (route === "Coordenação") {
        const data = localStorage.getItem("idaluno");
        const alunoRes = await axios.get(`http://localhost:5000/aluno/${data}`);
        const area = alunoRes.data.area;

        const coordRes = await axios.get("http://localhost:5000/coordenador");
        const coord = coordRes.data.find((c) => c.area === area);
        if (!coord) return;

        const horarioRes = await axios.get("http://localhost:5000/horario-coordenacao");
        const dado = horarioRes.data.filter((h) => h.idcoordenador === coord.id);
        if (!dado.length) return alert("Horário ainda não cadastrado pelo coordenador.");

        setHorario(dado);
        const indexInicio = diaSemana.indexOf(dado[0].inicio);
        const indexFim = diaSemana.indexOf(dado[0].fim);
        setHora(diaSemana.slice(indexInicio, indexFim + 1));
      } else if (route === "Secretária") {
        const horarioRes = await axios.get("http://localhost:5000/horario-secretaria");
        const dado = horarioRes.data.filter((item) => item.idhorario);
        if (!dado.length) return alert("Horário ainda não cadastrado pelo director.");

        setHorario(dado);
        const indexInicio = diaSemana.indexOf(dado[0].inicio);
        const indexFim = diaSemana.indexOf(dado[0].fim);
        setHora(diaSemana.slice(indexInicio, indexFim + 1));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const save = async () => {
    if (!mensagem) return alert("Preencha todos os campos");
    // Lógica de save mantida
  };

  return (
    <div>
      <Head>
        <title>ALUNO | Agenda</title>
        <link rel="icon" type="image/png" href="../public/images/chat.png" />
      </Head>

      <NavBarAluno />
      <div className={styleGeral.container}>
        <SideBarAluno />
        <div className={`${styleGeral.content} mt-4`}>
          <Marcation />

          <div className="p-3 m-3">
            <form className="m-3">

              <div className="mb-3">
                <label className="form-label">Reclamação para:</label>
                <select
                  className="form-select"
                  value={para}
                  onChange={(e) => { setPara(e.target.value); getHorario(e.target.value); }}
                >
                  <option value="Coordenação">Coordenação</option>
                  <option value="Secretária">Secretária</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Senha:</label>
                <input className="form-control" value={senha} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label">Dia de Semana:</label>
                <select
                  className="form-select"
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                >
                  {horario.map((item, index) => (
                    <option key={index} value={item.diasemana}>{item.diasemana}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Hora de Atendimento:</label>
                <select
                  className="form-select"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                >
                  {hora.map((h, index) => (
                    <option key={index}>{h}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Informação:</label>
                <textarea
                  className="form-control"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                />
              </div>

              <button type="button" className="btn btn-primary m-2" onClick={save}>Agendar</button>
              <button type="button" className="btn btn-secondary m-2" onClick={toggleModal}>Ver Agendados</button>
              <ModalComponent show={modal} closed={modalClose} />

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agend;
