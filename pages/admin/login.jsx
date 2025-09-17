import NavbarLogin from "./navbarLogin"
import stylelogin from '../../pages/css/navbarlogin.module.css'
import Link from "next/link"
import { useEffect, useState } from "react"
import axios from "axios"
import Head from "next/head"
import MobileRedirect from "./component/mobileRedirect"
import { useRouter } from "next/router"

function Login() {
    const [danger, setDanger] = useState('')
    const [next, setNext] = useState('')
    const [admin, setAdmin] = useState('')
    const [senha, setSenha] = useState('')
    const [data, setData] = useState([])
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        await axios.get('http://localhost:5000/admin')
            .then((response) => response.data)
            .then((data) => {
                setData(data)
                console.log(data)
            })
    }

    const filter = (admin, senha) => {
        const search = data.filter((d) => d.administrador === admin && d.senha === senha)

        if (search.length === 0) {
            if (senha !== '' && admin !== '') {
                setDanger('Dados não foram encontrados')
                setNext('')
            } else {
                setDanger('')
                setNext('')
            }
        } else {
            localStorage.setItem('idAdmin', search[0].id)
            localStorage.setItem('usernameAdmin', search[0].administrador)
            router.push('/admin/adminInicio')
            setDanger('')
        }
    }

    return (
        <div>
            <MobileRedirect />
            <Head>
                <title>Admin | Entrar</title>
            </Head>
            <NavbarLogin />

            <form className={stylelogin.form}>
                <h2 className={`text-center m-2 ${stylelogin.h2}`}>Login - Admin</h2>

                {/* Input administrador */}
                <input
                    type="text"
                    value={admin}
                    onChange={(e) => {
                        setAdmin(e.target.value)
                        const adminVal = e.target.value
                        const filtrarDados = data.filter((d) => d.administrador === adminVal)
                        const nome = filtrarDados.map((d) => d.administrador)
                        const pass = filtrarDados.map((d) => d.senha)
                        if (nome[0] === adminVal && pass === senha) {
                            setDanger('')
                        } else {
                            setNext('')
                        }
                    }}
                    className="form-control m-3"
                    placeholder="Administrador"
                    required
                />

                {/* Input senha */}
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => {
                        setSenha(e.target.value)
                        const password = e.target.value
                        const filtrarDados = data.filter((d) => d.senha === password && d.administrador === admin)
                        const nome = filtrarDados.map((d) => d.administrador)
                        const pass = filtrarDados.map((d) => d.senha)
                        if (nome[0] === admin && password === pass) {
                            setDanger('')
                            setNext('/admin/adminInicio')
                        } else {
                            setNext('')
                        }
                    }}
                    className="form-control m-3"
                    placeholder="Senha"
                    required
                />

                {/* Mensagem de erro */}
                {danger && <p className="text-danger m-3">{danger}</p>}

                {/* Botão entrar */}
                <button
                    type="button"
                    className="btn btn-primary m-3"
                    onClick={() => filter(admin, senha)}
                >
                    Entrar
                </button>

                <br />

                {/* Links */}
                <Link className="m-3" href={'/admin/criar-admin'}>
                    <span style={{ cursor: 'pointer' }} className="text-secondary">Criar conta</span>
                </Link>
                <Link className="text-center" href={'/admin/pesquisar'}>
                    <span style={{ cursor: 'pointer' }} className="text-danger">Esqueceu a senha?</span>
                </Link>
            </form>
        </div>
    )
}

export default Login
