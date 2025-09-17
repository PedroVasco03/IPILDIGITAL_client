import Head from "next/head"
import { Button, Table } from "reactstrap"
import styleGeral from '../../css/logado.module.css'
import NavBarSecretaria from "../navbar"
import SideBarAdmin from "../sidebar"
import axios from 'axios'
import { useRouter } from "next/router"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MobileRedirect from "./mobileRedirect"
import ModalPermission from "./modal"
import ModalPermitir from "./modalPermission"
const socket = io('http://localhost:5000'); // Substitua pelo endereço do servidor Socket.IO
const tAluno = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    socket.on('atualizarUsuarios', (usuario) => {
      setUsuarios((prevUsuarios) => [...prevUsuarios, usuario]);
    });
  }, []);
    const [aluno, setAluno] = useState([])
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
                getAluno()
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
    const getAluno = async ()=>{
        
        await axios.get('http://localhost:5000/aluno')
        .then((response)=>{
            setAluno(response.data)
        })
    }

  return (
    
    <div>
        <MobileRedirect></MobileRedirect>
    <Head>
        <title>Tabelas | Aluno</title>
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
        {aluno.map((data)=>{
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
                                <th class="cell100 column4 text-white" >ÁREA DE FORMAÇÃO</th>
                                <th class="cell100 column5 text-white" >CURSO</th>
                                <th class="cell100 column6 text-white" >TURMA</th>
                                <th class="cell100 column7 text-white" >CLASSE</th>
                                <th class="cell100 column8 text-white" >Nº DE PROCESSO</th>
                                <th class="cell100 column9 text-white" >TELEFONE</th>
                                <th class="cell100 column10 text-white">EMAIL</th>
                                <th class="cell100 column11 text-white">SEXO</th>
                                <th class="cell100 column12 text-white">SENHA</th>
                                <th class="cell100 column13 text-white">PERMISSÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {aluno.map((data)=>{
                                return(
                                    <tr class="row100 body">
                                        <td class="cell100 column2 dois" >{data.id}</td>
                                        <td class="cell100 column3 dois" >{data.bi}</td>
                                        <td class="cell100 column4 dois" >{data.area}</td>
                                        <td class="cell100 column5 dois" >{data.curso}</td>
                                        <td class="cell100 column6 dois" >{data.turma}</td>
                                        <td class="cell100 column7 dois" >{data.classe}</td>
                                        <td class="cell100 column8 dois" >{data.numeroprocesso}</td>
                                        <td class="cell100 column9 dois" >{data.telefone}</td>
                                        <td class="cell100 column10 dois">{data.email}</td>
                                        <td class="cell100 column11 dois">{data.sexo}</td>
                                        <td class="cell100 column12 dois">******</td>
                                        <td class="cell100 column13 dois d-flex">
                                            <Button className="m-1" color="danger" style={{
                                                padding:"3px 5px"
                                            }} onClick={()=>{
                                                setId(data.id)
                                                setRoute('aluno')
                                                toggleModal()               
                                            }}>Eliminar</Button>
                                            
                                            <Button className="m-1" color="success" style={{
                                                padding:"3px 5px"
                                            }} onClick={()=>{
                                                setId(data.id)
                                               setAlterar('Permitir')
                                               toggleModal2() 
                                            }}>Permitir</Button>
                                            <Button className="m-1" color="warning" style={{
                                                padding:"3px 5px"
                                            }}  onClick={()=>{
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
                            <ModalPermitir id={id} show={modal2} permissao={alterar} route={'aluno'}/>
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

export default tAluno;


