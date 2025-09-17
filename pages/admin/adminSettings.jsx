import Head from "next/head"
import { Button, Card, CardBody, CardFooter, Label } from "reactstrap"
import styleGeral from '../css/logado.module.css'
import NavBarSecretaria from "./navbar"
import SideBarSecretaria from "./sidebar"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useRouter } from "next/router"
import MobileRedirect from "./component/mobileRedirect"
function AdminSettings(){
    const [id, setId] = useState('')
    const [admin, setAdmin] = useState('')
    const [senha, setSenha] = useState('')
    const [data, setData] = useState({})
    const router = useRouter()
    useEffect(()=>{
        getData()
    }, [])
    const getData = ()=>{
        try{
            const id = localStorage.getItem('idAdmin')
            axios.get(`http://localhost:5000/admin/${id}`)
            .then((res)=>{
                setId(res.data.id)
                setAdmin(res.data.administrador)
                setSenha(res.data.senha)
            }).catch((err)=>{
                router.push('/admin/login')
            })
           
    }catch(err){
        console.log(err)
    }

       
    }
    const deleteData = ()=>{
        const data = JSON.parse(localStorage.getItem('data-user'))
        axios.delete(`http://localhost:5000/admin/${data.id[0]}`)
        alert('Eliminado com sucesso')
        localStorage.removeItem('login')
        localStorage.removeItem('data-user')
        router.push('/admin/login')
        
    }
    return (
         <div>
            <MobileRedirect></MobileRedirect>
            <Head>
                <title>ADMIN | Definições</title>
            </Head>
            <NavBarSecretaria></NavBarSecretaria>
            <div className={styleGeral.container}>
                <SideBarSecretaria/>
                <div className={styleGeral.content + " w-100 p-3"}>            
                    <div className="d-flex mt-5 flex-column align-items-center w-100">
                    <div class="card mb-4 mt-5 bg-white m-4 w-100">
                    <div class="card-body text-center">
                        <h5 class="my-3">{admin}</h5>
                        <p class="text-muted mb-1">id: {id}</p>
                        
                        </div>
                        
                    </div>
                    
                </div>
                <div class="card mb-5 m-4" style={{borderRadius:'15px'}}>
            <div class="card-body p-4">
              <h3 class="mb-3">Senha</h3>
              <p class="small mb-0"><i class="far fa-star fa-lg"></i> <span class="mx-2">{senha}</span> </p>
              <hr class="my-4"/>
              <div class="d-flex justify-content-start align-items-center">
                <p class="mb-0 text-uppercase"><i class="fas fa-cog me-2"></i> <span class="text-muted small"></span></p>
                <p class="mb-0 text-uppercase"><i class="fas fa-link ms-4 me-2"></i> <span class="text-muted small"></span></p>
                <p class="mb-0 text-uppercase"><i class="fas fa-ellipsis-h ms-4 me-2"></i> <span class="text-muted small"></span></p>
                <a href="#!">
                </a>
              </div>
            </div>
            </div>
                    <Button onClick={deleteData} color="outline-danger" className="mx-4">Eliminar</Button>          
                    </div>
                    <div>
                    </div>
                </div>
            
        </div>
    );
}
export default AdminSettings