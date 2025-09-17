import NavBarCoordenacao from "./navbar"
import styleGeral from '../css/logado.module.css'
import AccordionComponent from "./components/accordion"
import Head from "next/head"
import SideBarCoordenacao from "./sidebar"
import { AccordionBody, Button, Card, CardBody, Label } from "reactstrap"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import SideBarAluno from "./sidebar"
import ModalSetting from "./components/modalSettings"
import ModalAlert from "./modalAlert"

function Settings(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal)
    const modalClose2 = ()=> setModal2(false)
    
    const [id, setId] = useState('')
    useEffect(()=>{
        
      update()
           
     },[])
     const update = async ()=>{
        setInterval(async()=>{
            await getAlunoData()
        }, 2000)
     }
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idencarregado')
            await axios.get(`http://localhost:5000/encarregado/${data}`)
            .then((response)=>{
                setDatas(response.data)
                
                if(response.data.permissao === 'Recusar')
                router.push('/login/encarregado/login')
            }).catch((err)=>{
              router.push('/login/encarregado/login')
            })
            if(data  == null)
                router.push('/login/encarregado/login')
            
        }catch(err){
            console.log(err)
        }
    }
    const [data, setData ] = useState({})
    try{
    return <div>
        <Head>
            <title>Encarregado | Definicoes</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>
        <NavBarCoordenacao></NavBarCoordenacao>
        <div className={styleGeral.container} style={{paddingTop:'80px'}}>
            <SideBarAluno></SideBarAluno>
            <div className={styleGeral.content}>
                <div className="w-100 p-2">
                <div className="w-100 p-2 mt-5">
                <div class="card mb-4 mt-5 bg-white m-4">
                <div class="card-body text-center">
                    <h5 class="my-3">{datas.nome}</h5>
                    <p class="text-muted mb-1"></p>
                    <p class="text-muted mb-4"></p>
                    <div class="d-flex justify-content-center mb-2">
                    </div>
                    </div>
                </div>
                <div class="card mb-4 m-4">
            <div class="card-body bg-white">
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Nome</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{datas.nome}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{datas.email}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Bilhete de Identidade</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{datas.bi}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Telefone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{datas.telefone}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Sexo</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{datas.sexo}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-5 m-4" style={{borderRadius:'15px'}}>
            <div class="card-body p-4">
              <h3 class="mb-3">Senha</h3>
              <p class="small mb-0"><i class="far fa-star fa-lg"></i> <span class="mx-2">{datas.senha}</span> </p>
              <hr class="my-4"/>
              <div class="d-flex justify-content-start align-items-center">
                <p class="mb-0 text-uppercase"><i class="fas fa-cog me-2"></i> <span class="text-muted small"></span></p>
                <p class="mb-0 text-uppercase"><i class="fas fa-link ms-4 me-2"></i> <span class="text-muted small"></span></p>
                <p class="mb-0 text-uppercase"><i class="fas fa-ellipsis-h ms-4 me-2"></i> <span class="text-muted small"></span></p>
                <a href="#!">
                  
                </a>
              </div>
            </div>
          </div>
          <button type="button" class="btn btn-outline-danger m-4" onClick={()=>{
              const idencarregado = localStorage.getItem('idencarregado')
              setId(idencarregado)
              
          }} data-mdb-ripple-color="dark" style={{zIndex:'1'}}>
                  Eliminar conta
          </button>
          <button type="button" class="btn btn-outline-primary m-2" onClick={toggleModal} data-mdb-ripple-color="dark" style={{zIndex:'1'}}>
                  Editar dados
          </button>
          </div>
                  <ModalSetting show={modal} closed={modalClose}></ModalSetting> 
                  <ModalAlert show={modal2} closed={modalClose2} id={id} route={'encarregado'}/>
                </div>
                
                </div>    
        </div>
    </div>;
    }catch(err){
        console.log(err)    
    }
}
export default Settings