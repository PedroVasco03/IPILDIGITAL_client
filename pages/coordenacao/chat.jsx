import Image from "next/image"
import { useEffect, useState } from "react"
import empty from '../../public/images/images-system/empty.png'
import Head from "next/head"
import styleSide from'../css/sideBar.module.css'
import styleGeral from '../css/logado.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import { useRouter } from "next/router"
import axios from "axios"
import ModalMessage from "./components/modalMessage"
import { Button, Card, CardBody } from "reactstrap"
import imagem from '../../public/images/profile_user.png'
function Chat(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [send, setSend] = useState([])
    const [tipo, setTipo] = useState([])
    useEffect(()=>{
        setInterval(()=>{
            getAlunoData()
            getEnviado()
        }, 2000)
    },[])
    
    const getEnviado = async()=>{
        let box = []
        let box2 = []
        const username = localStorage.getItem('usernameCoordenador')
        await axios.get('http://localhost:5000/enviado').then((res)=>{
                console.log(res.data)
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
        setTipo(box2)
        setSend(box)
        console.log(box)
       }
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idcoordenador')
            await axios.get(`http://localhost:5000/coordenador/${data}`)
            .then((res)=>{
                setDatas(res.data)
                if(res.data.permissao === 'Recusar')
                    router.push('/login/coordenacao/login')
            }).catch((err)=>{
                router.push('/login/coordenacao/login')
                console.log(err)
            })
            if(data == null){
                router.push('/login/coordenacao/login')
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
                <title>Coordenador | Chat</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno></NavBarAluno>
            <div className={styleGeral.container}>
                <SideBarAluno/>
                <div className={styleGeral.content}>            
                    <div className="d-flex w-100 mt-5">
                            <Button className="m-3 mt-5" onClick={toggleModal} style={{float:'right'}}>Enviar mensagem</Button>                       
                            <ModalMessage show={modal} closed={modalClose}></ModalMessage>
                    </div>
                    <div style={{paddingTop:'20px', width:'100%'  }}>
                        {send.map((item, index)=>{
                            console.log(item)
                            return(
                        <div class="list-group m-3">
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>{
                                 localStorage.setItem('receptorCoordenador', item)
                                 localStorage.setItem('tipoCoordenador', tipo[index])
                                 router.push('/coordenacao/mensagem')
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
export default Chat

