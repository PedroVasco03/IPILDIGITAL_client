import axios from "axios"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Button, Form, Input,  Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

function  ModalAlert({show, closed, id, route}){
    const router = useRouter()
    async function deleteData() {
        await axios.delete(`http://localhost:5000/${route}/${id}`);
        await axios.get('http://localhost:5000/reclamacao')
        .then((response)=>{
                response.data.map(async(item)=>{
                    if(item.idlocal === id){
                        await axios.delete(`http://localhost:5000/reclamacao/${item.id}`)
                    }
                })
        })
        await axios.get('http://localhost:5000/horario-coordenacao')
        .then((response)=>{
                response.data.map(async(item)=>{
                    if(item.idcoordenador === id){
                       await axios.delete(`http://localhost:5000/horario-coordenacao/${item.id}`)
                    }
                })
        })
        router.push('/login/coordenacao/login')
        localStorage.removeItem('idcoordenador')
    }    
    return(
        <div>
            <Modal isOpen={show} onClosed={closed} centered>
                <ModalHeader toggle={closed}>
                    <h2>Confirmação</h2>
                </ModalHeader>
                <Form >
                <ModalBody>
                    <p style={{fontSize:'1.2rem'}} className=""> Tens a certeza que desejas <strong className="text-danger">eliminar</strong> isto?</p>
                </ModalBody>
                <ModalFooter>
                    <Button style={{padding:'5px 16px'}} color="outline-primary" onClick={()=>{
                        deleteData()  
                        closed()  
                    }}>Sim</Button>
                    <Button color="outline-danger" onClick={()=>{closed()}} style={{padding:'5px 16px'}}>Não</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default ModalAlert