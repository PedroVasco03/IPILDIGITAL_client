import Image from "next/image"
import NavBarCoordenacao from "./navbar"
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import ModalComponent from "./components/modal"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import styleSide from'../css/sideBar.module.css'
import SideBarCoordenacao from "./sidebar"
import Condition from "./condition"
import { useRouter } from "next/router"
import Hero from "../components/hero"

function HomeCoordenacao(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    useEffect(()=>{
       setInterval(()=>{
        getData()
       }, 1000)
    },[])
    
    const getData = async ()=>{
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
            if(data  == null)
                router.push('/login/coordenacao/login')
        }catch(err){
            console.log(err)
        }
    }   
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = ()=> setDropdownOpen((prevState)=>!prevState)
    return <div>
        <Head>
            <title>COORDENACAO | Inicio</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>    
        <NavBarCoordenacao></NavBarCoordenacao>
        <div className={styleGeral.container} >
            <SideBarCoordenacao></SideBarCoordenacao>
            <div className={styleGeral.content}>
                    <Hero/>          
                    <div>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className={styleSide.btn}>Horário de Atendimento</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={toggleModal}>Criar Horário</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                       <ModalComponent show={modal} closed={modalClose}/>
                    </div>
                    <Condition></Condition>  
                   
                     
                </div>
            </div>
        </div>;
    }

export default HomeCoordenacao

