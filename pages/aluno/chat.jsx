import Image from "next/image"
import { useEffect, useState } from "react"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import { useRouter } from "next/router"
import axios from "axios"
import { Button} from "reactstrap"
import ModalMessage from "./components/modalMessage"
import imagem from '../../public/images/profile_user.png'

function Home(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [send, setSend] = useState([])
    const [turma, setTurma] = useState('')
    const [tipo, setTipo] = useState([])
    useEffect(()=>{
       setInterval(()=>{
            getAlunoData()
            getEnviado()
       }, 1000)
    
       const data = localStorage.getItem('idaluno')
       axios.get(`http://localhost:5000/aluno/${data}`)
            .then((res)=>{ 
            try{
               const curso  = res.data.curso
               const classe = res.data.classe
               const turma = res.data.turma
                setTurma('Turma '+curso+classe+turma)
            }catch(err){
                console.log(err)
            }   })
    },[])
    const getEnviado = async()=>{
        let box = []
        let box2 = []
        const username = localStorage.getItem('usernameAluno')
        await axios.get('http://localhost:5000/enviado').then((res)=>{
                res.data.map((item, index)=>{
                    if(item.receptor === username){
                            box.push(item.nome)
                            box2.push(item.tipoSender)
                    }
                    else if(item.nome === username){
                            box.push(item.receptor)
                            box2.push(item.tipoReceiver)
                    }
                })
            
         })  
        setSend(box)
        setTipo(box2)
       }
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
    return (
        <div>
            <Head>
                <title>ALUNO | Chat</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno></NavBarAluno>
            <div className={styleGeral.container}>
                <SideBarAluno/>
                <div className={styleGeral.content + " mt-5 "}>            
                    <div className=" w-100 mt-5 d-flex ">
                            <Button className="m-3" onClick={toggleModal} style={{float:'right'}}>Enviar mensagem</Button>                       
                            <ModalMessage show={modal} closed={modalClose}></ModalMessage>
                    </div>
                    {turma !='' ? <div class="list-group m-3" >
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>{
                                 localStorage.setItem('receptorTurma', turma)
                                 router.push('/aluno/mensagemTurma')
                            }}>
                            <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                <h6 class="mb-0">{turma}</h6>
                                
                                </div>
                                <small class="opacity-50 text-nowrap">envie a sua mensagem</small>
                            </div>
                            </a>
                        </div>: <p></p>}
                    <div style={{paddingTop:'20px', width:'100%'}}>
                        {send.map((item, index)=>{
                            return(
                        <div class="list-group m-3">
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>{
                                 localStorage.setItem('receptor', item)
                                 localStorage.setItem('tipo', tipo[index])
                                 router.push('/aluno/mensagem')
                            }}>
                            <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                <h6 class="mb-0">{item}</h6>
                                <p>{tipo[index]}</p>
                                </div>
                                <small class="opacity-50 text-nowrap">envie a sua mensagem</small>
                            </div>
                            </a>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Home

