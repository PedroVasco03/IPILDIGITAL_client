import { Button, FormGroup, Input, Label } from "reactstrap"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import NavBarAluno from "./navbar"
import SideBarAluno from "./sidebar"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import ModalComponent from "./components/modal"
import { useRouter } from "next/router"
import Marcation from "../components/marcation"
function Agend(){
    const [datas, setDatas] = useState([])
    const router = useRouter()
    let statusBar
    try {
        if(localStorage.getItem('status-bar')){
            statusBar = localStorage.getItem('status-bar')
        }
    } catch (error) {
        
    }
    useEffect(()=>{
        getHorario('Coordenação')
        getHorario('Secretária')
    },[statusBar])
    useEffect(()=>{
        
        setInterval(()=>{
            getAlunoData()
                      
        }, 1000)
        const generator = Math.floor( Math.random() * 1000000)
        setSenha(generator)
        getUsers()

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
            if(data == null)
                router.push('/login/aluno/LoginAluno')
              
        }catch(err){
            console.log(err)
        }
    }
    const [hora, setHora] = useState([])
    const [aluno, setAluno] = useState([])
    const [horario, setHorario] = useState([])
    const[coordenador, setCoordenador] = useState('')
    const [para, setPara] = useState('Coordenação')
    const [senha, setSenha] = useState(0)
    const [dia, setDia] = useState('segunda')
    const [hour, setHour] = useState('7:00')
    const [mensagem, setMensagem] = useState('')
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const diaSemana = ["7:00","7:30","8:00","8:30","9:00","9:30",
                        "10:00","10:30","11:00","11:30","12:00",
                        "12:30","13:00","13:30","14:00","14:30",
                        "15:00","15:30"
                        ]
    
    const getUsers = async ()=>{
        await axios.get('http://localhost:5000/reclamacao')
        .then((response)=>{
            setAluno(response.data)
        })
        .catch((err)=>console.log(err))

    }
    
    const getHorario =  async (route)=>{
        try{
        if(route == 'Coordenação'){
                    try{
                        let area
                        let idcoordenador
                        const data = localStorage.getItem('idaluno')
                        await axios.get(`http://localhost:5000/aluno/${data}`)
                        .then((res)=>{
                            area = res.data.area
                        }).catch((err)=>{
                            console.log(err)
                        })
                        await axios.get(`http://localhost:5000/coordenador`)
                        .then((res)=>{
                            const search = res.data.filter((item)=>item.area === area)
                            idcoordenador = search[0].id
                            
                        }).catch((err)=>{
                            console.log(err)
                        })
                        await axios.get('http://localhost:5000/horario-coordenacao')
                        .then((response)=>{
                            const dado = response.data.filter((dado)=>dado.idcoordenador === idcoordenador)
                            if(dado.length == 0){
                                alert('Provalvemente ainda não foi cadastrado um horário pelo coordenador, verifique se existem dias de semanas válidos na Coordenação')
                            }
                            setHorario(dado)
                            const inicio = dado[0].inicio 
                            const fim = dado[0].fim
                            const indexInicio = diaSemana.indexOf(inicio)
                            const indexFim = diaSemana.indexOf(fim)
                            const filtrarSemana = diaSemana.filter((item, index)=> index >= indexInicio && index <= indexFim)
                            setHora(filtrarSemana)
                        })  
                           

                    }catch(err){
                        console.log(err)
                    }
            
        }
        else if(route == 'Secretária'){
            await axios.get(`http://localhost:5000/horario-secretaria`)
             .then((response)=>{
                    let box = []
                     const dado = response.data.filter((item)=>item.idhorario)
                     if(dado.length == 0){
                        alert('Provalvemente ainda não foi cadastrado um horário pelo director, verifique se existem dias de semanas válidos na Secretária')
                    }
                     setHorario(dado)
                     const inicio = dado[0].inicio 
                     const fim = dado[0].fim
                     const indexInicio = diaSemana.indexOf(inicio)
                     const indexFim = diaSemana.indexOf(fim)
                     const filtrarSemana = diaSemana.filter((item, index)=> index >= indexInicio && index <= indexFim)
                     setHora(filtrarSemana)   
             })
         }  }catch(err){
            console.log(err)
         }
    }
    
    const save = async ()=>{
        try{
            if( mensagem !="")
            {   
                let data
                let limite
                const aluno = localStorage.getItem('idaluno')
                await axios.get('http://localhost:5000/reclamacao')
                .then(async (res)=>{
                    if(para=='Coordenação'){
                        let area
                        let idcoordenador
                        const dado = localStorage.getItem('idaluno')
                        await axios.get(`http://localhost:5000/aluno/${dado}`)
                        .then((res)=>{
                            area = res.data.area
                        }).catch((err)=>{
                            console.log(err)
                        })
                        await axios.get(`http://localhost:5000/coordenador`)
                        .then((res)=>{
                            const search = res.data.filter((item)=>item.area === area)
                            idcoordenador = search[0].id
                        }).catch((err)=>{
                            console.log(err)
                        })
                        const search = res.data.filter((item)=>item.idlocal === idcoordenador && item.diasemana === dia)
                        data = res.data.filter((data)=> data.idaluno === aluno && data.para == para)
                        await axios.get('http://localhost:5000/horario-coordenacao')
                        .then((res)=>{
                            const objecto = res.data.filter((item)=>item.idcoordenador === idcoordenador)
                            limite = objecto[0].limite
                        }).catch((err)=>{console.log(err)})
                        if(search.length < limite){           
                            if(data.length == 0){    
                                  const result = res.data.filter((item)=> item.hora === hour)
                                if(result.length == 0){
                                    alert('salvo com sucesso!')
                                    await axios.post('http://localhost:5000/reclamacao',{
                                        para: para,
                                        idsenha: senha,
                                        idaluno: aluno,
                                        diasemana: dia,
                                        hora: hour,
                                        mensagem: mensagem,
                                        idlocal: idcoordenador
                                    })
                                    window.location.reload()
                                }else{
                                    alert('Está hora já foi agendada')
                                }
                            }
                            else{
                                alert('Já fizeste o teu agendamento')
                            }
                        }
                        else{
                            alert('Já não pode agendar')
                        }
                    }
                    if(para=='Secretária'){
                        let objecto
                         let iddirector
                        await axios.get('http://localhost:5000/director')
                        .then((res)=>{
                            iddirector = res.data[0].id
                        })
                        const search = res.data.filter((dado)=>dado.idlocal === iddirector && dado.diasemana === dia)
                        data = res.data.filter((data)=> data.idaluno === aluno && data.para == para)
                        await axios.get('http://localhost:5000/horario-secretaria')
                        .then((res)=>{
                            objecto = res.data.filter((item)=>item.idhorario)
                            limite = objecto[0].limite
                        })
                        if(search.length < limite){
                            if(data.length == 0){
                                const result = search.filter((item)=> item.hora === hour)
                                if(result.length == 0){    
                                    alert('salvo com sucesso!')
                                    await axios.post('http://localhost:5000/reclamacao',{
                                        para: para,
                                        idsenha: senha,
                                        idaluno: aluno,
                                        diasemana: dia,
                                        hora: hour,
                                        mensagem: mensagem,
                                        idlocal: iddirector
                                    })
                                    window.location.reload()
                                }
                                else{
                                alert('Está hora já foi agendada')
                                }
                            }
                            else{
                                alert('Já fizeste o teu agendamento')
                            }
                        }else{
                            alert('Já não pode agendar')
                        }
                        
                    }
                    
                })
            
            
        
            }
            else{
                alert('Preencha todos os campos')
            }
            
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <Head>
                <title>ALUNO | Agenda</title>
                <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
            </Head>
            <NavBarAluno></NavBarAluno>
        <div className={styleGeral.container}>
            <SideBarAluno/>
            <div className={styleGeral.content +" mt-4"}> 
                <Marcation/>   
                <div className="p-3 m-3">
                <form method="post m-3">
                    <FormGroup>
                        <Label>Reclamação para:</Label>
                        <Input type="select" value={para} onChange={(e)=>{
                            setPara(e.target.value)
                            getHorario(e.target.value)
                        }}>
                            <option value={'Coordenação'}>Coordenação</option>
                            <option value={'Secretária'}>Secretária</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <label>Senha:</label>
                        <Input value={senha} readOnly></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="attend">Dia de Semana:</Label>
                        <Input id="attend" type="select" value={dia} onChange={(e)=>setDia(e.target.value)}>
                                {horario.map((item, index)=>{
                                        return(
                                            <option key={index} value={item.diasemana}>{item.diasemana}</option>
                                            )
                                })}
                        </Input> 
                    </FormGroup>
                    <FormGroup>
                        <Label for="attend">Hora de Atendimento:</Label>
                        <Input id="attend" type="select" value={hour} onChange={(e)=>setHour(e.target.value)}>
                            {hora.map((item, index)=>{
                                
                                return(
                                    <option>{item}</option>
                                )
                            })
                            }
                        </Input> 
                    </FormGroup>
                    <FormGroup>
                            <Label>Informação:</Label>
                            <Input value={mensagem} type='textarea' style={{}} onChange={(e)=>setMensagem(e.target.value)}></Input>
                    </FormGroup>
                    <FormGroup>
                            <Button color="primary" className="m-2" onClick={save}>Agendar</Button>
                            <Button color="primary" className="m-2" onClick={toggleModal}>Ver Agendados</Button>
                            <ModalComponent show={modal} closed={modalClose}/>
                    </FormGroup>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
export default Agend