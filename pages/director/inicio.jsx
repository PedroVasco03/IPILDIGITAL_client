import NavBarCoordenacao from "./navbar"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import ModalComponent from "./components/modal"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import styleSide from'../css/sideBar.module.css'
import SideBarCoordenacao from "./sidebar"
import Condition from "./condition"
import { useRouter } from "next/router"
import Hero from "../components/hero"

function Home(){
    const [dado, setDado] = useState({})
    const [datas, setDatas] = useState([])
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal2)
    const modalClose2 = ()=> setModal2(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = ()=> setDropdownOpen((prevState)=>!prevState)
    const [data, setData] = useState({})
    const router = useRouter()
    useEffect(()=>{
        setInterval(()=>{
            getAlunoData()
        }, 1000)
     },[])
     const getAlunoData = async ()=>{
         try{
             const data = localStorage.getItem('iddirector')
             await axios.get(`http://localhost:5000/director/${data}`)
             .then((res)=>{
                 
                 if(res.data.permissao === 'Recusar')
                    router.push('/login/director/login')
             }).catch((err)=>{
                router.push('/login/director/login')
                 console.log(err)
             })
             if(data == null)
                 router.push('/login/director/login')
         }catch(err){
             console.log(err)
         }
     }
     
    return <div>
        <Head>
            <title>SECRETARIA | Inicio</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>    
        <NavBarCoordenacao></NavBarCoordenacao>
        <div className={styleGeral.container}>
            <SideBarCoordenacao></SideBarCoordenacao>
            
            <div className={styleGeral.content}> 
                    <Hero />         
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
export default Home