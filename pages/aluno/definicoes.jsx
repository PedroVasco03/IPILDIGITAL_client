import axios from "axios"
import Head from "next/head"
import { useState } from "react"
import { useEffect } from "react"
import styleGeral from '../css/logado.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import { useRouter } from "next/router"
import ModalSettings from "./components/modalSettings"
import ModalAlert from "./modalAlert"

function Settings(){
    const [dado, setDado] = useState({})
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal)
    const modalClose2 = ()=> setModal2(false)
    const router = useRouter()
    const [aluno, setAluno] = useState([])
    const [id, setId] = useState('')
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
                setAluno(res.data)
                if(res.data.permissao === 'Recusar')
                    router.push('/login/aluno/LoginAluno')
            }).catch((err)=>{
                console.log(err)
                router.push('/login/aluno/LoginAluno')
            })
            if(data  == null)
                router.push('/login/aluno/LoginAluno')
        }catch(err){
            console.log(err)
        }
    }
    try{
    return (
        <div>
            <Head>
                <title>ALUNO | Definicoes</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno/>
            <div className={styleGeral.container}>
                <SideBarAluno/>
                <div className={styleGeral.content + " mt-5"}>
            <div class="card mb-4 mt-5 bg-white m-4">
                <div class="card-body text-center">
                    <h5 class="my-3">{aluno.nome}</h5>
                    <p class="text-muted mb-1">Número de processo: {aluno.numeroprocesso}</p>
                    <p class="text-muted mb-4">Classe: {aluno.classe}</p>
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
                  <p class="text-muted mb-0">{aluno.nome}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Email</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.email}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Bilhete de Identidade</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.bi}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Telefone</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.telefone}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Turma</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.turma}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Área de formação</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.area}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Curso</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.curso}</p>
                </div>
              </div>
              <hr/>
              <div class="row">
                <div class="col-sm-3">
                  <p class="mb-0">Sexo</p>
                </div>
                <div class="col-sm-9">
                  <p class="text-muted mb-0">{aluno.sexo}</p>
                </div>
              </div>
            </div>
           
          </div>
          <div class="card mb-5 m-4" style={{borderRadius:'15px'}}>
            <div class="card-body p-4">
              <h3 class="mb-3">Senha</h3>
              <p class="small mb-0"><i class="far fa-star fa-lg"></i> <span class="mx-2">{aluno.senha}</span> </p>
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
            const idaluno = localStorage.getItem('idaluno')
            setId(idaluno)
            toggleModal2()
          }} data-mdb-ripple-color="dark" style={{zIndex:'1'}}>
                  Eliminar conta
          </button>
          <button type="button" class="btn btn-outline-primary m-2" onClick={toggleModal} data-mdb-ripple-color="dark" style={{zIndex:'1'}}>
                  Editar dados
          </button>
              <ModalSettings show={modal} close={modalClose} />
              <ModalAlert show={modal2} closed={modalClose2} id={id} route={'aluno'}/>
                </div>
            </div>
        </div>
    );}catch(err){
        console.log(err)
    }

}
export default Settings