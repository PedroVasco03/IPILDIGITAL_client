import { useEffect, useState } from "react"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import { useRouter } from "next/router"
import axios from "axios"
import Hero from "../components/hero"
import Areas from "../components/areas"
import Vantages from "../components/vantages"

function Home(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    useEffect(()=>{
       setInterval(()=>{
        getAlunoData()
       }, 1000)
    },[])
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idaluno')
            await axios.get(`http://localhost:5000/aluno/${data}`)
            .then((res)=>{
                setDatas(res.data)
                if(res.data.permissao === 'Recusar')
                    router.push('/login/aluno/LoginAluno')
            }).catch((err)=>{
                console.log(err)
                router.push('/login/aluno/LoginAluno')
            })
            if(data == null){
                router.push('/login/aluno/LoginAluno')
            }
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
                <title>ALUNO | Inicio</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno></NavBarAluno>
            <div className={styleGeral.container}>
                <SideBarAluno/>
                
                <div className={styleGeral.content}>            
                    <div className="d-flex flex-column align-items-center w-100">
                        <Hero/>
                        <Vantages/>
                        <Areas/>
                    </div>
                </div>
            </div>
            
        </div>

    );
}
export default Home

