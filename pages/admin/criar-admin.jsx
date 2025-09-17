import NavbarLogin from "./navbarLogin"
import stylelogin from '../../pages/css/navbarlogin.module.css'
import { useState } from "react"
import axios from "axios"
import Head from 'next/head'
import { useRouter } from "next/router"
import MobileRedirect from "./component/mobileRedirect"

function CriarAdmin() {
    const [admin, setAdmin] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    const saveUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/admin', {
                administrador: admin,
                senha: senha
            })
            alert('Admin salvo com sucesso')
            router.push('/admin/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <MobileRedirect />
            <Head>
                <title>Admin | Cadastro</title>
            </Head>
            <NavbarLogin />

            <form className={stylelogin.form} onSubmit={saveUser}>
                <h2 className={`text-center m-2 ${stylelogin.h2}`}>Cadastrar - Admin</h2>

                <input
                    type="text"
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                    className="form-control m-3"
                    placeholder="Administrador"
                    required
                />

                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-control m-3"
                    placeholder="Senha"
                    required
                />

                <button type="submit" className="btn btn-primary m-3">
                    Criar
                </button>
            </form>
        </div>
    )
}

export default CriarAdmin
