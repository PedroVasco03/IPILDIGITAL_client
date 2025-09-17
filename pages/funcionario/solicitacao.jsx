import NavBarCoordenacao from "./navbar"
import styleGeral from '../css/logado.module.css'
import AccordionComponent from "./components/accordion"
import Head from "next/head"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import SideBarAluno from "./sidebar"
import ModalSetting from "./components/modalSettings"
import ModalAlert from "./modalAlert"
import imagem from '../../public/images/profile_user.png'
import Image from "next/image"
import ModalConfirmation from "./components/modalConfirmation"
import ModalRupe from "./components/rupe"
function Services(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [usuario, setUsuario] = useState('')
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal2)
    const modalClose2 = ()=> setModal2(false)
    const [id, setId] = useState('')
    const [referencia, setReferencia]= useState('')
    useEffect(()=>{

        setInterval(()=>{
            getPedido()
            getAlunoData()
           }, 1000)
     },[])
    const getPedido = async()=>{
       await axios.get('http://localhost:5000/pedido')
       .then((res)=>{
            setPedidos(res.data)
       })
    }
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
            })
            if(data  == null)
                router.push('/login/funcionario/login')
            
        }catch(err){
            console.log(err)
        }
    }
    try{
    return <div>
        <Head>
            <title>Funcionario | Serviços</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>
        <NavBarCoordenacao></NavBarCoordenacao>
        <div className={styleGeral.container} style={{paddingTop:'80px'}}>
            <SideBarAluno></SideBarAluno>
            <div className={styleGeral.content}>
              <div className="mt-5">
                    {pedidos.map((item)=>{
                           return(
                            <div class="list-group m-3">
                                <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true" onClick={()=>{
                                    router.push('/funcionario/visualizar')
                                    localStorage.setItem('view', item.nome)
                                }}>
                                <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                    <h6 class="mb-0">{item.nome}</h6>
                                    <p class=" my-2 opacity-50 text-nowrap">Pedido: {item.necessidade}</p>
                                    </div>
                                    <div>
                                        <small className="m-2 opacity-50 text-nowrap">ver pedido</small>
                                    </div>
                                </div>
                                </a>
                                <div>
                                    <Button color="danger" className="m-2" style={{padding:'3px 10px'}} onClick={()=>{
                                        setId(item.id)
                                        toggleModal()
                                        axios.get(`http://localhost:5000/solicitacao`)
                                        .then((res)=>{
                                        const dado= res.data.filter((dado)=>dado.nomealuno === item.nome)
                                        const id = dado[0].referencia 
                                        setReferencia(id)        
                                    }).catch((err)=>{
                                console.log(err)
                                 })
                                    }}>eliminar pedido</Button>
                                    <Button color="primary" style={{padding:'3px 10px'}} onClick={()=>{
                                        localStorage.setItem('receptorFuncionario', item.nome)
                                        localStorage.setItem('tipoFuncionario', item.tipo)
                                        router.push('/funcionario/mensagem')
                                    }}>enviar mensagem</Button>
                                    <Button className="m-2" color="secondary" style={{padding:'3px 10px'}} onClick={()=>{
                                        setUsuario(item.nome)
                                        toggleModal2()
                                    }}>enviar referência</Button>
                                    <ModalConfirmation show={modal} closed={modalClose} id={id} referencia={referencia} route={'pedido'}></ModalConfirmation>
                                    <ModalRupe show={modal2} closed={modalClose2} usuario={usuario}></ModalRupe>
                                </div>
                            </div>   
                           )
                    })}
              </div>
          </div>
        </div>
              
    </div>;
    }catch(err){
        console.log(err)    
    }
}
export default Services