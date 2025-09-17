import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, Input,  Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

function  ModalConfirmation({show, closed, id, route, referencia}){
    
    async function deleteData() {
        await axios.delete(`http://localhost:5000/${route}/${id}`);
        if(route === 'rupe-gerado' ){
            await axios.get(`http://localhost:5000/solicitacao`)
            .then((res)=>{
                const dado = res.data.filter((item)=>item.referencia === referencia)
                const id = dado[0].id
                axios.delete(`http://localhost:5000/solicitacao/${id}`)              
            }).catch((err)=>{
                console.log(err)
            })
        }
        if(route === 'pedido' ){
            await axios.get(`http://localhost:5000/rupe-gerado`)
            .then((res)=>{
                const dado = res.data.filter((item)=>item.rupe === referencia)
                const id = dado[0].id
                axios.patch(`http://localhost:5000/rupe-gerado/${id}`, {
                    estado:"inactivo"
                })              
            }).catch((err)=>{
                console.log(err)
            })
            await axios.get(`http://localhost:5000/solicitacao`)
            .then((res)=>{
                const dado = res.data.filter((item)=>item.referencia === referencia)
                const id = dado[0].id
                axios.delete(`http://localhost:5000/solicitacao/${id}`)              
            }).catch((err)=>{
                console.log(err)
            })
        }
    }    
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}  centered>
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
export default ModalConfirmation