import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import NavBarSecretaria from "./navbar"
import axios from 'axios'
import { useRouter } from "next/router"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import SideBarAdmin from "./sidebar"
import MobileRedirect from "./component/mobileRedirect"
import Introdution from "../components/admIntrodution"
const socket = io('http://localhost:5000'); // Substitua pelo endereço do servidor Socket.IO
const AdminInicio = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    socket.on('atualizarUsuarios', (usuario) => {
      setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);
    });
  }, []);
  const [aluno, setAluno] = useState([])
    const [coordenador, setCoordenador] = useState([])
    const [director, setDirector] = useState([])
    const [encarregado, setEncarregado] = useState([])
    const [funcionario, setFuncionario] = useState([])
    const [item, setItem] = useState({})
    const [id, setId] = useState('')
    const [route, setRoute] = useState('')
    const router = useRouter()
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    
    useEffect(()=>{
        // Escuta eventos de dados recebido
            
       
        
            try{
                const id = localStorage.getItem('idAdmin')
                const username = localStorage.getItem('usernameAdmin')
                if(!username){
                  router.push('/admin/login')
                }
                axios.get(`http://localhost:5000/admin/${id}`).catch((err)=>{
                    router.push('/admin/login')
                })
            }catch(err){
              
            }
    
    },[])
   
  return (
    
    <div>
        <MobileRedirect></MobileRedirect>
        <Head>
            <title>ADMIN | Inicio</title>
        </Head>
        <NavBarSecretaria></NavBarSecretaria>
        <div className={styleGeral.container}>
            <SideBarAdmin/>
            <div className={styleGeral.content}>
                <Introdution/>
            </div> 
        </div>
    </div>
  );
};

export default AdminInicio;
 