import Head from "next/head"
import styleGeral from "../../css/logado.module.css"
import NavBarSecretaria from "../navbar"
import axios from "axios"
import { useRouter } from "next/router"
import ModalPermission from "./modal"
import React, { useEffect, useState } from "react"
import SideBarAdmin from "../sidebar"
import io from "socket.io-client"
import MobileRedirect from "./mobileRedirect"
import ModalPermitir from "./modalPermission"

const socket = io("http://localhost:5000") // endereço do servidor Socket.IO

const tDirector = () => {
  const [usuarios, setUsuarios] = useState([])
  const [director, setDirector] = useState([])
  const [item, setItem] = useState({})
  const [id, setId] = useState("")
  const [route, setRoute] = useState("")
  const router = useRouter()
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)
  const modalClose = () => setModal(false)
  const [modal2, setModal2] = useState(false)
  const toggleModal2 = () => setModal2(!modal2)
  const modalClose2 = () => setModal2(false)
  const [alterar, setAlterar] = useState("")

  useEffect(() => {
    socket.on("atualizarUsuarios", (usuario) => {
      setUsuarios((prevUsuarios) => [...prevUsuarios, usuario])
    })
  }, [])

  useEffect(() => {
    try {
      const id = localStorage.getItem("idAdmin")
      axios.get(`http://localhost:5000/admin/${id}`).catch(() => {
        router.push("/admin/login")
      })

      const interval = setInterval(() => {
        getData()
        getDirector()
      }, 1000)

      return () => {
        clearInterval(interval)
        socket.disconnect()
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const getData = async () => {
    const data = await JSON.parse(localStorage.getItem("data-user"))
    setItem(data)
  }

  const getDirector = async () => {
    await axios.get("http://localhost:5000/director").then((response) => {
      setDirector(response.data)
    })
  }

  return (
    <div>
      <MobileRedirect />
      <Head>
        <title>Tabelas | Director</title>
      </Head>
      <NavBarSecretaria />
      <div className={styleGeral.container}>
        <SideBarAdmin />
        <div className={styleGeral.content}>
          <div className="setenta"></div>
          <div className="container-table100">
            <div className="wrap-table100">
              <div className="table100 ver1">
                <div className="table100-firstcol shadow-table100-firstcol">
                  <table>
                    <thead>
                      <tr className="row100 head">
                        <th className="cell100 column1 text-white">NOME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {director.map((data) => {
                        return (
                          <tr key={data.id} className="row100 body">
                            <td className="cell100 column1">{data.nome}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="wrap-table100-nextcols ">
                  <div className="table100-nextcols">
                    <table>
                      <thead>
                        <tr className="row100 head">
                          <th className="cell100 column2 text-white">ID</th>
                          <th className="cell100 column3 text-white">BI</th>
                          <th className="cell100 column9 text-white">TELEFONE</th>
                          <th className="cell100 column10 text-white">EMAIL</th>
                          <th className="cell100 column11 text-white">SEXO</th>
                          <th className="cell100 column12 text-white">SENHA</th>
                          <th className="cell100 column13 text-white">PERMISSÃO</th>
                        </tr>
                      </thead>
                      <tbody>
                        {director.map((data) => {
                          return (
                            <tr key={data.id} className="row100 body">
                              <td className="cell100 column2 dois">{data.id}</td>
                              <td className="cell100 column3 dois">{data.bi}</td>
                              <td className="cell100 column9 dois">{data.telefone}</td>
                              <td className="cell100 column10 dois">{data.email}</td>
                              <td className="cell100 column11 dois">{data.sexo}</td>
                              <td className="cell100 column12 dois">******</td>
                              <td className="cell100 column13 dois d-flex">
                                <button
                                  className="btn btn-danger m-1"
                                  style={{ padding: "3px 5px" }}
                                  onClick={() => {
                                    setId(data.id)
                                    setRoute("director")
                                    toggleModal()
                                  }}
                                >
                                  Eliminar
                                </button>
                                <button
                                  className="btn btn-success m-1"
                                  style={{ padding: "3px 5px" }}
                                  onClick={() => {
                                    setId(data.id)
                                    setAlterar("Permitir")
                                    toggleModal2()
                                  }}
                                >
                                  Permitir
                                </button>
                                <button
                                  className="btn btn-warning m-1"
                                  style={{ padding: "3px 5px" }}
                                  onClick={() => {
                                    setId(data.id)
                                    setAlterar("Recusar")
                                    toggleModal2()
                                  }}
                                >
                                  Recusar
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>

                    {/* Modais */}
                    <ModalPermission
                      show={modal}
                      closed={modalClose}
                      route={route}
                      id={id}
                    />
                    <ModalPermitir
                      id={id}
                      show={modal2}
                      closed={modalClose2}
                      permissao={alterar}
                      route={"director"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default tDirector
