import Head from "next/head"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import SideBarAluno from "./sidebar"
import NavBarAluno from "./navbar"
import styleGeral from '../css/logado.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import empty from '../../public/images/images-system/empty.png'
import axios from "axios"
import Image from "next/image"
import styleSide from'../css/sideBar.module.css'
import ModalConfirmation from "./components/modalConfirmation"
function certificaterequest() {
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [pedidos, setPedidos] = useState({})
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [id, setId] = useState('')
    useEffect(()=>{
       setInterval(()=>{
        getAlunoData()
       
       }, 1000)
    },[])
    useEffect(()=>{
        setInterval(()=>{
            getPedido()
        }, 1000)
    },[])
    const getPedido = async()=>{
        const data = localStorage.getItem('idaluno')
        let nome
        await axios.get(`http://localhost:5000/aluno/${data}`)
        .then((res)=>{
            nome = res.data.nome
        })
        await axios.get('http://localhost:5000/pedido')
        .then((res)=>{            
            const search = res.data.filter((item)=>item.nome === nome)
            const obj = {
                    id: search[0].id,
                    nome: search[0].nome,
                    encarregado: search[0].encarregado,
                    encarregada: search[0].encarregada,
                    dataNascimento: search[0].dataNascimento,
                    provincia: search[0].provincia,
                    bi: search[0].bi,
                    emitido: search[0].emitido,
                    dataEmissao: search[0].dataEmissao,
                    area: search[0].area,
                    curso: search[0].curso,
                    classe: search[0].classe,
                    turma: search[0].turma,
                    numero: search[0].numero,
                    anoLectivo: search[0].anoLectivo,
                    numeroprocesso: search[0].numeroProcesso,
                    necessidade: search[0].necessidade,
                    efeito: search[0].efeito
            }
            setPedidos(obj)
        }).catch((err)=>{
            console.log(err)
        })
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
    return(
        <div>
            <Head>
                <title>Aluno | Pedido </title>
            </Head>
            <NavBarAluno/>
            
            <div className={styleGeral.container}>
            <SideBarAluno/>
            <div className={styleGeral.content}>
                <div className=" d-flex flex-column m-3 mt-5">
                        <FormGroup className="mt-5">
                        
                            <Label>Nome:</Label>
                            <Input value={pedidos.nome} readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Filho de:</Label>
                            <Input value={pedidos.encarregado} readOnly/>
                        </FormGroup>
                        <FormGroup>
                            <Label>e de:</Label> 
                            <Input value={pedidos.encarregada} readOnly/>
                        </FormGroup>
                        <FormGroup className="d-flex flex-wrap">
                        <FormGroup className="m-2">
                            <Label>Data de Nascimento:</Label>
                            <Input type="date" value={pedidos.dataNascimento} readOnly></Input>
                        </FormGroup>
                        <FormGroup className="m-2">
                            <Label>Provincia de: </Label>
                            <Input value={pedidos.provincia} readOnly></Input>
                        </FormGroup>
                        </FormGroup>
                        <FormGroup className="d-flex flex-wrap ">
                        <FormGroup className="m-2">
                            <Label>Portador do BI Nº:</Label>
                            <Input  value={pedidos.bi} readOnly/>
                        </FormGroup>
                        <FormGroup className="m-2">
                            <Label>Emitido em</Label>
                            <Input value={pedidos.emitido} readOnly></Input>
                        </FormGroup>
                        <FormGroup className="m-2">
                                <Label>aos:(data de emissão)</Label>
                                <Input value={pedidos.dataEmissao} type="date" readOnly/>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>Matriculado na Área de Formação: </Label>
                            <Input value={pedidos.area} readOnly></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Curso Especialidade:</Label>
                            <Input value={pedidos.curso} readOnly></Input>
                        </FormGroup>
                        <Label>Dados da Última Frequência:</Label>
                        <FormGroup className="d-flex flex-wrap">
                            <FormGroup className="m-2">
                                <Label>Classe:</Label>
                                <Input value={pedidos.classe}  readOnly></Input>
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Turma:</Label>
                                <Input value={pedidos.turma}  readOnly></Input>
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Nº:</Label>
                                <Input value={pedidos.numero} type="number" readOnly/>
                            </FormGroup>
                            <FormGroup className="m-2">
                                <Label>Ano Lectivo:</Label>
                                <Input value={pedidos.anoLectivo}  type="number" readOnly></Input>
                            </FormGroup>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label>Número de Processo:</Label>
                            <Input  value={pedidos.numeroprocesso} type="number" readOnly></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Necessitando de</Label>
                            <Input value={pedidos.necessidade} readOnly>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Efeitos ou por motivos de:</Label>
                            <Input value={pedidos.efeito} readOnly></Input>
                        </FormGroup>
                    
                    </div>  
            <div>
                <Button color="outline-danger" className="mx-3 mb-2" type="submit" onClick={()=>{toggleModal()}}>Eliminar</Button>
                <ModalConfirmation  show={modal} closed={modalClose} id={pedidos.id} route={'pedido'}/>
            </div>
            </div>
            </div>
        </div>
    )
    
}

export default certificaterequest