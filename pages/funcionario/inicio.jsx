import Image from "next/image"
import { useEffect, useState } from "react"
import empty from '../../public/images/images-system/empty.png'
import Head from "next/head"
import styleSide from'../css/sideBar.module.css'
import styleGeral from '../css/logado.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import { useRouter } from "next/router"
import Hero from "../components/hero"
import Vantages from "../components/vantages"
import Areas from "../components/areas"
import Marcation from "../components/marcation"
import axios from "axios"

function HomeAluno({users}){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    useEffect(()=>{
        setInterval(()=>{
            getAlunoData()
        }, 1000)
    },[])
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idfuncionario')
            await axios.get(`http://localhost:5000/funcionario/${data}`)
            .then((response)=>{
                setDatas(response.data)
                if(response.data.permissao === 'Recusar')
                    router.push('/login/funcionario/login')
            }).catch((err)=>{
              router.push('/login/funcionario/login')
                console.log(err)
            })
            if(data  == null)
                router.push('/login/funcionario/login')
            
        }catch(err){
            console.log(err)
        }
    }
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal2)
    const modalClose2 = ()=> setModal2(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = ()=> setDropdownOpen((prevState)=>!prevState)
   
    return (
        <div>
            <Head>
                <title>Funcionario | Inicio</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno></NavBarAluno>
            <div className={styleGeral.container}>
                <SideBarAluno/>
                <div className={styleGeral.content}>            
                    <div className="d-flex flex-column align-items-center w-100">
                        <Hero/>
                        <Areas/>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default HomeAluno

