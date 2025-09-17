import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, Input,  Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

function  ModalCreate({show, closed}){
    const [name, setName] = useState('')
    const [item, setItem] = useState([])
    useEffect(()=>{
        getData()
    },[])
    const getData = async ()=>{
        const id = localStorage.getItem('idcoordenador')
        await axios.get("http://localhost:5000/coordenacao")
        .then((response)=>{
            const search = response.data.filter((data)=>data.idcoordenador === id)
            setItem(search)
        })       
    }

    const saveData = async ()=>{
        const id = localStorage.getItem("idcoordenador")
        if(name !="" ){
            item.length == 0 ? await axios.post("http://localhost:5000/coordenacao",{
                nome: name,
                idcoordenador: id
            }) : alert('Coordenação já foi criada!');
        }
    }
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Coordenação</h2>
                </ModalHeader>
                <Form >
                <ModalBody>
                    <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nome da coordenação"></Input>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>{
                        saveData()
                        closed()
                    }}>Criar</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default ModalCreate