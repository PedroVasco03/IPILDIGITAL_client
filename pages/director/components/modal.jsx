import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
const listDay = []
const data = []
function ModalComponent({show, closed}){
    const [inicio, setInicio] = useState('7:00')
    const [fim, setFim] = useState('7:00')
    const [limite, setLimit] = useState(0)
    const [item, setItem] = useState({})
    const [datas, setDatas] = useState([])
    useEffect(()=>{
        getUsers()
       
     },[])
     
     const getUsers = async ()=>{
         const response = await axios.get('http://localhost:5000/horario-secretaria')
         .then((response)=>{
             console.log('buscando dados no banco de dados')
             setDatas(response.data)
         })
         .catch(()=>console.log('erro: solicitação negada'))
         
         
     }
     
   const saveData = async (e)=>{
        e.preventDefault()
        try{
            if(limite > 0){
                if(listDay.length !=0){
                    const horaInicio = inicio.split(":")
                    const horaFim = fim.split(":")
                    if(Number.parseInt(horaInicio[0])< Number.parseInt(horaFim[0])){
                const id = localStorage.getItem('iddirector')
                    const search = datas.filter((data)=> data.idhorario === id)
                    await axios.get('http://localhost:5000/reclamacao')
                    .then((response)=>{
                        const dado = response.data.filter((data)=>data.para ==='Secretária')
                        response.data.map(async(item)=>{
                            if(item.idlocal === id){
                                await axios.delete(`http://localhost:5000/reclamacao/${item.id}`)
                            }
                        })
                    })
                    
                    search.map(async (item)=>{
                        
                        await axios.delete(`http://localhost:5000/horario-secretaria/${item.id}`)
                    })
                    function compararDiasDaSemana(dia1, dia2) {
                        var ordem = ["segunda", "terça", "quarta", "quinta", "sexta"];
                        return ordem.indexOf(dia1) - ordem.indexOf(dia2);
                      }
                    const newList = listDay.sort(compararDiasDaSemana)
                    newList.map(async (diasemana)=>{
                        await axios.post('http://localhost:5000/horario-secretaria',{
                        idhorario: id,
                        diasemana,
                        inicio,
                        fim,
                        limite
                    })
                })
            }  
        }
            }else{
                alert('deve ter pelo menos o limite de uma pessoa')
            }
            
        }catch(error){
            console.log(error)
        }
        localStorage.setItem('status-bar', listDay)
        window.location.reload()
    }
    const diaSemana = ['segunda','terça','quarta','quinta','sexta']
    const [check, setCheck] =useState(
        new Array(diaSemana.length).fill(false)
    )
    
    const setDay = (item, index)=>{
        if(!check[index]){
            listDay.push(item)
            
        }
        else{
            const number = listDay.indexOf(item)
            listDay.splice(number, 1)
            
        }
    }
    const handleOnChange = (position)=>{
        const updateCheck = check.map((item, index)=>{
            if(position === index){
                return !item
            }
            else{
                return item
            }
        })
        setCheck(updateCheck)
        console.log(updateCheck)
    }
    const hora = ['7:00','7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00']
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Horário de Atendimento</h2>
                </ModalHeader>
                <Form onSubmit={saveData}>
                <ModalBody>
                    <Label>Dia de atendimento:</Label>
                    {diaSemana.map((item, index)=>{
                        return(
                            <FormGroup key={index}>
                                <Label className="mx-1">{item}</Label> 
                                <Input id="diasemana" name="diasemana" value={index + 1} checked={check[index]} onChange={()=>handleOnChange(index)} onClick={()=>{setDay(item, index)}} type="checkbox" className="mx-1"></Input> 
                            </FormGroup>
                        )
                    })}
                    <Label for="hora-inicio">Hora de atendimento início:</Label>
                    <Input id="hora-inicio" type="select" name="hora-inicio" value={inicio} onChange={(e)=>setInicio(e.target.value)}>
                    {hora.map((item, index)=>{
                        return(
                            <option key={index + 1} value={item}>{item}</option>
                        )
                    })}
                    </Input>
                    <Label for="hora-fim">Hora de atendimento fim:</Label>
                    <Input id="hora-fim" type="select" name="hora-fim" value={fim} onChange={(e)=>setFim(e.target.value)}>
                    {hora.map((item, index)=>{
                        return(
                            <option key={index} value={item} onChange={()=>setFim(item)}>{item}</option>
                        )
                    })}
                    </Input>
                   <Label for="limite">Limite de Pessoas:</Label>
                   <Input id="limite" value={limite} onChange={(e)=>setLimit(e.target.value)} type="number" name="limite"/>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color='primary'>Criar</Button>
                </ModalFooter>
            </Form>
            </Modal>
        </div>
    )
}
export default ModalComponent