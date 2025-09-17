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
import ModalSetting from "./components/modalSettings"
import ModalAlert from "./modalAlert"

function SettingsCoordenacao(){
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal)
    const modalClose2 = ()=> setModal2(false)
    const  [dado, setDado]= useState({})
    const router = useRouter()
    const [data, setData] = useState([])
    const [id, setId] = useState('')
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
                setData(res.data)
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
    
    try{
    return  <div>
        <Head>
            <title>COORDENACAO | Definicoes</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>
        <NavBarCoordenacao/>
        <div className={styleGeral.container}>
            <SideBarCoordenacao/>
            <div className={styleGeral.content + " mt-5"}>
            <div class="card mb-4 mt-5 bg-white m-4">
                <div class="card-body text-center">
                    <h5 class="my-3">{data.nome}</h5>
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
                  <p class="text-muted mb-0">{data.nome}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{data.email}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Bilhete de Identidade</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{data.bi}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Telefone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{data.telefone}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Área de formação</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{data.area}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Sexo</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{data.sexo}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-5 m-4" style={{borderRadius:'15px'}}>
            <div class="card-body p-4">
              <h3 class="mb-3">Senha</h3>
              <p class="small mb-0"><i class="far fa-star fa-lg"></i> <span class="mx-2">{data.senha}</span> </p>
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
              const id = localStorage.getItem('idcoordenador')
              setId(id)
              toggleModal2()
              
            }} data-mdb-ripple-color="dark" style={{zIndex:'1'}}>
                  Eliminar conta
          </button>
          <button type="button" class="btn btn-outline-primary m-2" onClick={toggleModal} data-mdb-ripple-color="dark" style={{zIndex:'1'}}>
                  Editar dados
          </button>
            <ModalSetting show={modal} closed={modalClose}></ModalSetting>
            <ModalAlert  show={modal2} closed={modalClose2} id={id} route={'coordenador'}/>
        </div>    
        </div>
    </div>;
    }catch(err){
        console.log(err)
    }
}
export default SettingsCoordenacao