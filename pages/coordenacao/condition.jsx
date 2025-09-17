import { Button, Card, CardBody, Input, Label } from "reactstrap"
import empty from '../../public/images/images-system/empty.png'
import Image from 'next/image'
import styleSide from'../css/sideBar.module.css'
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import ModalView from "./components/modalVisualizar"
import ModalMessage from "./components/modalMessage"
import { useRouter } from "next/router"
import ModalConfirmation from "./components/modalConfirmation"
function Condition(){
    let statusBar
    const router = useRouter()
    const [data, setData] = useState([])
    const [incio, setInicio] = useState('')
    const [reclamacao, setReclamacao] = useState([])
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [modal2, setModal2] = useState(false)
    const toggleModal2 = ()=> setModal2(!modal2)
    const modalClose2 = ()=> setModal2(false)
    const [message, setMessage] = useState([])
    const [senha, setSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [dia, setDia] = useState('')
    const [filter, setFilter] = useState([])
    const [id, setId] = useState('')
    const [dias, setDias] = useState([])
    const[alterar, setAlterar] = useState('')
    const [local, setLocal] = useState()
    useEffect(()=>{  
        getUsers()
        filtrarDias()
        getReclamacao()
            
        }, [])
    const filtrarDias = async()=>{
        let option = []
        option.push('Verifique o dia de atendimento')
        await axios.get('http://localhost:5000/horario-coordenacao')
        .then((response)=>{
            const idcoordenador = localStorage.getItem('idcoordenador') 
            const all = response.data.filter((data)=> data.idcoordenador === idcoordenador)
            all.map((item)=>{
                option.push(item.diasemana)
            })
            setDias(option)
            
        }).catch((err)=>{console.log(err)})
    }
     const getReclamacao = async ()=>{
        
        await axios.get('http://localhost:5000/reclamacao')
        .then((response)=>{
            const idcoordenador = localStorage.getItem('idcoordenador') 
            const all = response.data.filter((data)=> data.idlocal === idcoordenador && data.diasemana === alterar)
            setFilter(all)

        }).catch((err)=>{console.log(err)})
     }
     const filtrarReclamacao = async (change)=>{
        
        await axios.get('http://localhost:5000/reclamacao')
        .then((response)=>{
            const idcoordenador = localStorage.getItem('idcoordenador') 
            const all = response.data.filter((data)=> data.idlocal === idcoordenador && data.diasemana === change)
            setFilter(all)
        }).catch((err)=>{console.log(err)})
     }
    const getUsers = async ()=>{
        const response = await axios.get('http://localhost:5000/horario-coordenacao')
        .then((response)=>{
        const pedido = response.data
        const dado = localStorage.getItem('idcoordenador')
        const search = pedido.filter((data)=> data.idcoordenador === dado)
        console.log('buscando dados no banco de dados')
        setData(search)
        })
        .catch(()=>console.log('erro: solicitação negada'))
        
        
    }
    if(data.length == 0){
        return(
            <div className="d-flex flex-column align-items-center w-100">
                <Image  className={styleSide.home_img} src={empty} />
                <p>Nenhuma actividade.</p>
            </div>
        )
    }
    else{
        return(
          <div className="m-5">
            <Card className="p-4">
                <div className="d-flex flex-wrap">
                <Label className="m-1" style={{fontSize:'1.5rem'}}>Dias de Atendimento:</Label>
                    {data.map((item)=>{
                        return(
                            <Label className="m-1" style={{fontSize:'1.5rem'}}>{item.diasemana}</Label>
                        )
                    })}
                </div>
                <Label className="bold m-2" style={{fontSize:'1.5rem'}}>Atendimento das {data[0].inicio}h ás {data[0].fim}h</Label>
                <Label className="m-2" style={{fontSize:'1.5rem'}}>Limite de pessoas para atendendimento: {data[0].limite}</Label>
        </Card>
        <div>
        <div className="mt-3">
            <div className="d-flex">
                <Input type="select" value={alterar} onChange={(e)=>{
                    setAlterar(e.target.value)
                    filtrarReclamacao(e.target.value)
                }} className=" mb-5 m-2" style={{width:'300px'}}>
                        
                        {dias.map((item)=>(
                            <option value={item}>{item}</option>
                        ))}
                </Input>
                <div className="m-2">
                    <button type="button" onClick={()=>{getReclamacao()}} class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="actualize alguns dados podem estar desactualizados">
                        Actualizar dados
                    </button>
                </div>
            </div>
<h5>Agendados:</h5>
<div class="col-md-12">
    <div class="table-wrap">
            <table class="table">
            <thead class="thead-primary">
                <tr>
                    <th>#</th>
                    <th>Senha</th>
                    <th>Dia de semana</th>
                    <th>Hora</th>
                    <th>Permissão</th>
                </tr>
            </thead>
            <tbody>
                    {filter.map((item)=>{
                        return(
                            <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.idsenha}</td>
                                <td>{item.diasemana}</td>
                                <td>{item.hora}</td>
                                <td className="d-flex no-wrap">
                                    <Button title="eliminar" color="danger" className="m-1" style={{padding:'1px 6px'}} onClick={()=>{
                                         setId(item.id)
                                         toggleModal2()
                                    }}>Eliminar</Button>
                                    <Button title="visualizar" color="primary" className="m-1" style={{padding:'1px 6px'}} onClick={()=>{
                                        setDia(item.diasemana)
                                        setSenha(item.idsenha)
                                        setMensagem(item.mensagem)
                                        toggleModal()
                                    }}>Visualizar</Button>
                                    <Button title="enviar mensagem" color="secondary" className="m-1" style={{padding:'1px 6px'}} onClick={()=>{  
                                            axios.get(`http://localhost:5000/aluno/${item.idaluno}`).then((res)=>{
                                                localStorage.setItem('receptorCoordenador', res.data.nome)
                                                router.push('/coordenacao/mensagem')
                                            })
                                    }}>Enviar mensagem</Button>                   
                                </td>
                            </tr>
                        )

                    })}
                    
                
            </tbody>
            </table>
        </div>
</div>
        </div>      
                    
                    <ModalView show={modal} closed={modalClose} senha={senha} mensagem={mensagem} dia={dia} />
                    <ModalConfirmation show={modal2} closed={modalClose2} id={id} route={'reclamacao'}/>
                </div>
          </div>
        )
    }
}
export default Condition