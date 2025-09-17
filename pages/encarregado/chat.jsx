import Image from "next/image"
import { useEffect, useState } from "react"
import Head from "next/head"
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
        },2000)
    },[])
    
    
    const getEnviado = async()=>{
        let box = []
        let box2 = []
        const username = localStorage.getItem('usernameEncarregado')
        await axios.get('http://localhost:5000/enviado').then((res)=>{
            
                res.data.map((item, index)=>{
                    console.log(box.indexOf(item.receptor))
                    if(item.nome === username){
                            box.push(item.receptor)
                            box2.push(item.tipoReceiver)
                }
                if(item.receptor === username){
                        box.push(item.nome)  
                        box2.push(item.tipoSender)
                    }                                   
                })
            
         })  
         setTipo(box2)
        setSend(box)
        
       }
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idencarregado')
            await axios.get(`http://localhost:5000/encarregado/${data}`)
            .then((res)=>{
                setDatas(res.data)
                if(res.data.permissao === 'Recusar')
                    router.push('/login/encarregado/login')
            }).catch((err)=>{
                console.log(err)
                router.push('/login/encarregado/login')
            })
            if(data == null){
                router.push('/login/encarregado/login')
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
                <title>Encarregado | Chat</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno></NavBarAluno>
            <div className={styleGeral.container}>
                <SideBarAluno/>
                <div className={styleGeral.content +" mt-5"}>            
                    <div className="d-flex mt-5">
                            <Button className="m-3" onClick={toggleModal} style={{float:'right'}}>Enviar mensagem</Button>                       
                            <ModalMessage show={modal} closed={modalClose}></ModalMessage>
                    </div>
                    <div>
                        {send.map((item, index)=>{    
                            return(     
                                <div class="list-group m-3">
                                <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>{
                                    localStorage.setItem('receptorEncarregado', item)
                                    localStorage.setItem('tipoEncarregado', tipo[index])
                                    router.push('/encarregado/mensagem')
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

