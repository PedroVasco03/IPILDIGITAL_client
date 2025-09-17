import Head from "next/head"
import { Button, Table } from "reactstrap"
import styleGeral from '../../css/logado.module.css'
import NavBarSecretaria from "../navbar"
import axios from 'axios'
import { useRouter } from "next/router"
import ModalPermission from "./modal"
import React, { useEffect, useState } from 'react';
import SideBarAdmin from "../sidebar"
import io from 'socket.io-client';
import MobileRedirect from "./mobileRedirect"
import ModalPermitir from "./modalPermission"
const socket = io('http://localhost:5000'); // Substitua pelo endereço do servidor Socket.IO
const tDirector = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    socket.on('atualizarUsuarios', (usuario) => {
      setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);
    });
  }, []);
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
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal2)
    const modalClose2 = ()=> setModal2(false)
    const [alterar, setAlterar] = useState('')  
    
    useEffect(()=>{
        // Escuta eventos de dados recebido
            
        try{
            const id = localStorage.getItem('idAdmin')
                axios.get(`http://localhost:5000/admin/${id}`).catch((err)=>{
                    router.push('/admin/login')
                })
            setInterval(()=>{
                getData()
                getDirector()
            }, 1000)
                
        
        
    }catch(err){
        console.log(err)
    }
    return () => {
        socket.disconnect();
      };
    },[])
    const getData = async ()=>{
        const data = await JSON.parse(localStorage.getItem('data-user')) 
        setItem(data)
    }
    const getDirector = async ()=>{
        await axios.get('http://localhost:5000/director')
        .then((response)=>{
            setDirector(response.data)
        })
    }

  return (
    
    <div>
        <MobileRedirect></MobileRedirect>
    <Head>
        <title>Tabelas | Director</title>
    </Head>
    <NavBarSecretaria></NavBarSecretaria>
    <div className={styleGeral.container}>
        <SideBarAdmin/>
        <div className={styleGeral.content}>
        <div className="setenta"></div>    
<div class="container-table100">
<div class="wrap-table100">
<div class="table100 ver1">
<div class="table100-firstcol shadow-table100-firstcol">
    
<table>
<thead>
<tr class="row100 head">
<th class="cell100 column1 text-white">NOME</th>
</tr>
</thead>
<tbody>
        {director.map((data)=>{
                            return(
                                    <tr class="row100 body">
                                        <td class="cell100 column1">{data.nome}</td>
                                    </tr>
                            )
        })}
</tbody>
</table>
</div>
<div class="wrap-table100-nextcols ">
<div class="table100-nextcols">
<table >
<thead>
                            <tr class="row100 head">
                                <th class="cell100 column2 text-white" >ID</th>
                                <th class="cell100 column3 text-white" >BI</th>
                                <th class="cell100 column9 text-white" >TELEFONE</th>
                                <th class="cell100 column10 text-white">EMAIL</th>
                                <th class="cell100 column11 text-white">SEXO</th>
                                <th class="cell100 column12 text-white">SENHA</th>
                                <th class="cell100 column13 text-white">PERMISSÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {director.map((data)=>{
                                return(
                                    <tr class="row100 body">
                                        <td class="cell100 column2 dois" >{data.id}</td>
                                        <td class="cell100 column3 dois" >{data.bi}</td>
                                        <td class="cell100 column9 dois" >{data.telefone}</td>
                                        <td class="cell100 column10 dois">{data.email}</td>
                                        <td class="cell100 column11 dois">{data.sexo}</td>
                                        <td class="cell100 column12 dois">******</td>
                                        <td class="cell100 column13 dois">
                                            <Button  style={{
                                                padding:"3px 5px"
                                            }} className="m-1" color="danger" onClick={()=>{
                                                setId(data.id)
                                                setRoute('director')
                                                toggleModal()                                                            
                                            }}>Eliminar</Button>
                                            <Button  style={{
                                                padding:"3px 5px"
                                            }} className="m-1" color="success" onClick={()=>{
                                                setId(data.id)
                                                setAlterar('Permitir')
                                                toggleModal2() 
                                                
                                            }}>Permitir</Button>
                                            <Button  style={{
                                                padding:"3px 5px"
                                            }} className="m-1" color="warning" onClick={()=>{
                                                setId(data.id)
                                                setAlterar('Recusar')
                                                toggleModal2() 
                                            }}>Recusar</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
</table>
        <ModalPermission show={modal} closed={modalClose} route={route} id={id}></ModalPermission>
        <ModalPermitir id={id} show={modal2} permissao={alterar} route={'director'}/>
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

export default tDirector;
