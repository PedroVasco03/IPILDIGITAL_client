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
        const value = localStorage.getItem('iddirector')
        await axios.get("http://localhost:5000/secretaria")
        .then((response)=>{
            const search = response.data.filter((data)=>data.iddirector === value)
            setItem(search)
        })       
    }

    const saveData = async ()=>{
        const data = localStorage.getItem("iddirector")
        if(name !=""){
            if(item.length == 0){
                await axios.post('http://localhost:5000/secretaria',{
                    iddirector: data,
                    nome: name  
                })
                window.location.reload()
            }
        }
    }
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Secretária</h2>
                </ModalHeader>
                <Form >
                <ModalBody>
                    <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Nome da Secretaria"></Input>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>{
                        saveData()
                        
                        
                    }}>Criar</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default ModalCreate