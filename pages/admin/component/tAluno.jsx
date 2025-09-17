import Head from "next/head";
import styleGeral from "../../css/logado.module.css";
import NavBarSecretaria from "../navbar";
import SideBarAdmin from "../sidebar";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import MobileRedirect from "./mobileRedirect";
import ModalPermission from "./modal";
import ModalPermitir from "./modalPermission";

const socket = io("http://localhost:5000"); // Substitua pelo endereço do servidor Socket.IO

const TAluno = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [aluno, setAluno] = useState([]);
  const [item, setItem] = useState({});
  const [id, setId] = useState("");
  const [route, setRoute] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [alterar, setAlterar] = useState("");
  const router = useRouter();

  useEffect(() => {
    socket.on("atualizarUsuarios", (usuario) => {
      setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);
    });

    try {
      const id = localStorage.getItem("idAdmin");
      axios.get(`http://localhost:5000/admin/${id}`).catch(() => {
        router.push("/admin/login");
      });

      const interval = setInterval(() => {
        getData();
        getAluno();
      }, 1000);

      return () => {
        clearInterval(interval);
        socket.disconnect();
      };
    } catch (err) {
      console.log(err);
    }
  }, [router]);

  const getData = async () => {
    const data = await JSON.parse(localStorage.getItem("data-user"));
    setItem(data);
  };

  const getAluno = async () => {
    await axios.get("http://localhost:5000/aluno").then((response) => {
      setAluno(response.data);
    });
  };

  return (
    <div>
      <MobileRedirect />
      <Head>
        <title>Tabelas | Aluno</title>
      </Head>
      <NavBarSecretaria />
      <div className={styleGeral.container}>
        <SideBarAdmin />
        <div className={styleGeral.content}>
          <div className="setenta"></div>

          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver1">
                {/* Primeira coluna */}
                <div className="table100-firstcol shadow-table100-firstcol">
                  <table className="table table-bordered">
                    <thead>
                      <tr className="bg-dark text-white">
                        <th className="text-white">NOME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aluno.map((data) => (
                        <tr key={data.id}>
                          <td>{data.nome}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Outras colunas */}
                <div className="wrap-table100-nextcols">
                  <div className="table100-nextcols">
                    <table className="table table-striped table-hover">
                      <thead className="bg-dark text-white">
                        <tr>
                          <th>ID</th>
                          <th>BI</th>
                          <th>ÁREA DE FORMAÇÃO</th>
                          <th>CURSO</th>
                          <th>TURMA</th>
                          <th>CLASSE</th>
                          <th>Nº DE PROCESSO</th>
                          <th>TELEFONE</th>
                          <th>EMAIL</th>
                          <th>SEXO</th>
                          <th>SENHA</th>
                          <th>PERMISSÃO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aluno.map((data) => (
                          <tr key={data.id}>
                            <td>{data.id}</td>
                            <td>{data.bi}</td>
                            <td>{data.area}</td>
                            <td>{data.curso}</td>
                            <td>{data.turma}</td>
                            <td>{data.classe}</td>
                            <td>{data.numeroprocesso}</td>
                            <td>{data.telefone}</td>
                            <td>{data.email}</td>
                            <td>{data.sexo}</td>
                            <td>******</td>
                            <td>
                              <div className="d-flex flex-wrap">
                                <button
                                  className="btn btn-danger btn-sm m-1"
                                  onClick={() => {
                                    setId(data.id);
                                    setRoute("aluno");
                                    setModal(true);
                                  }}
                                >
                                  Eliminar
                                </button>
                                <button
                                  className="btn btn-success btn-sm m-1"
                                  onClick={() => {
                                    setId(data.id);
                                    setAlterar("Permitir");
                                    setModal2(true);
                                  }}
                                >
                                  Permitir
                                </button>
                                <button
                                  className="btn btn-warning btn-sm m-1"
                                  onClick={() => {
                                    setId(data.id);
                                    setAlterar("Recusar");
                                    setModal2(true);
                                  }}
                                >
                                  Recusar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Modais */}
                    <ModalPermission
                      show={modal}
                      closed={() => setModal(false)}
                      route={route}
                      id={id}
                    />
                    <ModalPermitir
                      id={id}
                      show={modal2}
                      permissao={alterar}
                      route="aluno"
                      closed={() => setModal2(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TAluno;
