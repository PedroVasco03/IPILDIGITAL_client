import NavbarLogin from "./navbarLogin"
import stylelogin from '../../pages/css/navbarlogin.module.css'
import { Button, Input, Label } from "reactstrap"
import Head from "next/head"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import MobileRedirect from "./component/mobileRedirect"

function Pesquisar(){
    const [name, setName] = useState('')
    const [senha, setSenha] = useState('')
    useEffect(()=>{
        
    },[])
    const getUser = async (username)=>{
      try{  
        const response = await axios.get('http://localhost:5000/admin')
            .then((res)=>{
                console.log(username)
                const search = res.data.filter((data)=>data.administrador === username)
                setSenha(search[0].senha)
            }).catch((err)=>{
                console.log(err)
            })       
            
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div>
        <Head>
            <title>ADMIN | Pesquisa</title>
        </Head>
            <MobileRedirect></MobileRedirect>
            <NavbarLogin></NavbarLogin>
            
                <div className={stylelogin.form}>
                    <h2 className={`text-center m-2 ${stylelogin.h2}`}>Filtrar - Admin</h2>
                    <Input className="m-3" placeholder="Admininistrador" value={name} onChange={(e)=>setName(e.target.value)}></Input>
                    <p>Senha : {senha}</p>
                    <Button color="primary" className="m-3" onClick={()=>{getUser(name)}}>Filtrar Dados</Button>
                   <br/>
                </div>
        </div>
    )
}
export default Pesquisar