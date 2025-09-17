import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Card, CardBody, CardFooter } from "reactstrap"
const listDay = []
const data = []
function ModalReferencia({show, closed}){
    const [rupe, setRupe] = useState('')
    useEffect(()=>{
        const username = localStorage.getItem('usernameAluno')
        setInterval(()=>{    
            axios.get('http://localhost:5000/solicitacao')
            .then((response)=>{
                const search = response.data.filter((item)=>item.nomealuno === username)
                setRupe(search[0].referencia)
            }).catch((err)=>{
                setRupe("")
                console.log(err)
            })
        }, 1000)
    },[])
    const [datas, setDatas] = useState([])   
    return(
        <div>
            <Modal isOpen={show} onClosed={closed} centered>
                <ModalHeader toggle={closed}>
                    <h2>Referência</h2>
                </ModalHeader>  
                    
                <ModalBody>
                    <h3>Referência: {rupe}</h3>
                    <p className=" my-3 text-muted">Utilizado para fins de pagamento</p>
                </ModalBody> 
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    )
}
export default ModalReferencia