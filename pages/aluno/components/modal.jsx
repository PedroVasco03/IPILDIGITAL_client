import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Card, CardBody, CardFooter } from "reactstrap"
const listDay = []
const data = []
function ModalComponent({show, closed}){
    const [datas, setDatas] = useState([])
    useEffect(()=>{
        setInterval(()=>{
            getUsers()
        },1000)
     },[])
     const getUsers = async ()=>{
        await axios.get('http://localhost:5000/reclamacao')
         .then((response)=>{
           const aluno = localStorage.getItem('idaluno')
           const search = response.data.filter((data)=>data.idaluno === aluno)  
            setDatas(search)
         })
         .catch(()=>console.log('erro: solicitação negada'))
     }
     const deleteUser = async (id)=>{
            await axios.delete(`http://localhost:5000/reclamacao/${id}`)
            alert('Marcação eliminada!')
            getUsers()
            const generator = Math.floor( Math.random() * 1000)
            localStorage.setItem('status-value', generator)
     }
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Marcações agendadas</h2>
                </ModalHeader>
                <ModalBody>
                    {datas.map((item)=>{
                        return (
                            <Card className="m-3">
                                
                                <CardBody>
                                    <Label>Para: {item.para}</Label>
                                    <br/>
                                    <Label>Senha: {item.idsenha}</Label>
                                    <br/>
                                    <Label>Dia: {item.diasemana}</Label>
                                    <br/>
                                    <Label>Hora: {item.hora}</Label>
                                    <br />
                                    <Label>Mensagem: {item.mensagem}</Label>
                                </CardBody>
                                <CardFooter>
                                    <Button onClick={()=>{
                                        deleteUser(item.id)
                                    }} color="danger" className="m-2">Eliminar</Button>
                                </CardFooter>
                            </Card>
                        )
                    })

                    }
                </ModalBody> 
            </Modal>
        </div>
    )
}
export default ModalComponent