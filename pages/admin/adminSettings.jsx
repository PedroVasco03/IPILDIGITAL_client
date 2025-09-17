import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import NavBarSecretaria from "./navbar"
import SideBarSecretaria from "./sidebar"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import MobileRedirect from "./component/mobileRedirect"

function AdminSettings() {
    const [id, setId] = useState('')
    const [admin, setAdmin] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        try {
            const id = localStorage.getItem('idAdmin')
            axios.get(`http://localhost:5000/admin/${id}`)
                .then((res) => {
                    setId(res.data.id)
                    setAdmin(res.data.administrador)
                    setSenha(res.data.senha)
                }).catch(() => {
                    router.push('/admin/login')
                })
        } catch (err) {
            console.log(err)
        }
    }

    const deleteData = () => {
        const data = JSON.parse(localStorage.getItem('data-user'))
        axios.delete(`http://localhost:5000/admin/${data.id[0]}`)
        alert('Eliminado com sucesso')
        localStorage.removeItem('login')
        localStorage.removeItem('data-user')
        router.push('/admin/login')
    }

    return (
        <div>
            <MobileRedirect />
            <Head>
                <title>ADMIN | Definições</title>
            </Head>
            <NavBarSecretaria />
            <div className={styleGeral.container}>
                <SideBarSecretaria />
                <div className={styleGeral.content + " w-100 p-3"}>
                    <div className="d-flex mt-5 flex-column align-items-center w-100">
                        <div className="card mb-4 mt-5 bg-white m-4 w-100">
                            <div className="card-body text-center">
                                <h5 className="my-3">{admin}</h5>
                                <p className="text-muted mb-1">id: {id}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-5 m-4" style={{ borderRadius: '15px' }}>
                        <div className="card-body p-4">
                            <h3 className="mb-3">Senha</h3>
                            <p className="small mb-0">
                                <i className="far fa-star fa-lg"></i>
                                <span className="mx-2">{senha}</span>
                            </p>
                            <hr className="my-4" />
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="mb-0 text-uppercase">
                                    <i className="fas fa-cog me-2"></i>
                                    <span className="text-muted small"></span>
                                </p>
                                <p className="mb-0 text-uppercase">
                                    <i className="fas fa-link ms-4 me-2"></i>
                                    <span className="text-muted small"></span>
                                </p>
                                <p className="mb-0 text-uppercase">
                                    <i className="fas fa-ellipsis-h ms-4 me-2"></i>
                                    <span className="text-muted small"></span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Botão sem reactstrap */}
                    <button
                        onClick={deleteData}
                        className="btn btn-outline-danger mx-4"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminSettings
