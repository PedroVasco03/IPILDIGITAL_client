import NavBarCoordenacao from "./navbar"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import SideBarCoordenacao from "./sidebar"
import { Button, Card, CardBody, CardFooter } from "reactstrap";
import ModalCreate from "./components/modalCreate";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ModalConfirmation from "./components/modalConfirmation";
import ModalTeam from "./components/modalTeam";
import imagem from '../../public/images/profile_user.png'
import Image from "next/image";

function TeamCoordenacao(){
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal2)
    const modalClose2 = ()=> setModal2(false)
    const [coordenacao, setCoordenacao] = useState('')
    const [modal3, setModal3] = useState(false)
    const toggleModal3 = ()=> setModal3(!modal3)
    const modalClose3 = ()=> setModal3(false)
    const [idIdenticator, setIdIdenticator] = useState('')
    const [data, setData ] = useState({})
    const [team, setTeam] = useState([])
    const [dado, setDado] = useState({})
    const router = useRouter()
    const [item, setItem] = useState([])  
    const [datas, setDatas] = useState([])
    const [integrantes, setIntegrantes] = useState([])
    const getIntegrantes = async()=>{
        const idcoordenador = localStorage.getItem('idcoordenador')
        await axios.get('http://localhost:5000/coordenacao-integrante').then((response)=>{
            const search = response.data.filter((data)=>data.idcoordenador === idcoordenador)
            setIntegrantes(search)
        })
    }
    useEffect(()=>{
        getIntegrantes()
      setInterval(()=>{
        getAlunoData()
        getData()
      }, 500)
      
    },[])
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idcoordenador')
            await axios.get(`http://localhost:5000/coordenador/${data}`)
            .then((res)=>{
                if(res.data.permissao === 'Recusar')
                    router.push('/login/coordenacao/login')
            }).catch((err)=>{
                router.push('/login/coordenacao/login')
                console.log(err)
            })
            if(data == null)
                router.push('/login/coordenacao/login')
        }catch(err){
            console.log(err)
        }
    }
    const getData = async ()=>{
        const id = localStorage.getItem('idcoordenador')
        await axios.get("http://localhost:5000/coordenacao")
        .then((response)=>{
            const search = response.data.filter((data)=>data.idcoordenador === id)
            setItem(search)
        })       
    }
    
  
    return <div>
        <Head>
            <title>COORDENACAO | Pessoal</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>
        <NavBarCoordenacao/>
        <div className={styleGeral.container}>
            <SideBarCoordenacao/>
            <div className={styleGeral.content + " mt-5"}>
                    <div style={{float:'right'}} className="m-4 mt-5">
                        <Button color="primary" onClick={toggleModal}>Criar Coordenação</Button>
                    </div>
                    <div>
                        {item.map((item)=>{
                            return(
                                <div>
                                <Card className="m-3 mt-5">
                                    <CardBody>
                                        <p style={{fontSize:'2.2rem'}}><strong>{item.nome}</strong></p> 
                                    </CardBody>
                                    <CardFooter className="bg-white">
                                        <Button color="primary m-1" style={{padding:'3px 6px'}} onClick={()=>{
                                            toggleModal3()
                                            setCoordenacao(item.id)
                                            }}>adicionar integrantes</Button>
                                        <Button color="danger m-1" style={{padding:'3px 6px'}} onClick={()=>{
                                            setIdIdenticator(item.id)
                                            toggleModal2()
                                        }}>Eliminar</Button>
                                    </CardFooter>
                                </Card>
                                <h3 className="m-4">Integrantes:</h3>
                                {integrantes.map((item)=>(
                                     <div class="list-group mb-3 mx-5">
                                     <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3 m-2" aria-current="true" onClick={()=>{
                                          localStorage.setItem('receptorCoordenador', item.nome)
                                          localStorage.setItem('tipoCoordenador', item.nome)
                                          router.push('/coordenacao/mensagem')
                                     }}>
                                     <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                                     <div class="d-flex gap-2 w-100 justify-content-between">
                                         <div>
                                         <h6 class="mb-0">{item.nome}</h6>
                                         </div>
                                         <small class="opacity-50 text-nowrap">envie a sua mensagem</small>
                                     </div>
                                     </a>
                                 </div>
                                ))}
                                <ModalTeam show={modal3} closed={modalClose3} idcoordencao={coordenacao}></ModalTeam>
                            </div>
                            )
                        })}
                        
                    </div>
                    
                    <ModalCreate show={modal} closed={modalClose}></ModalCreate>
                    <ModalConfirmation show={modal2} closed={modalClose2} route={'coordenacao'} id={idIdenticator} ></ModalConfirmation>
            </div>
        </div>
    </div>;
}
export default TeamCoordenacao