import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Card, CardBody, CardFooter } from "reactstrap"
const listDay = []
const data = []
function ModalRupe({show, closed, usuario}){
    const [datas, setDatas] = useState([])  
    const [rupes, setRupes] = useState([])
    const [rupe, setRupe] = useState('')
    useEffect(()=>{
       
        setInterval(()=>{
            getRupes()
        },1000)
    },[]) 
    const getRupes  = async()=>{
        await axios.get('http://localhost:5000/rupe-gerado')
        .then((res)=>{
           const search = res.data.filter((item)=>item.estado === 'activo')
            setRupes(search)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const save = async()=>{
        let referencia_id
        await axios.get('http://localhost:5000/rupe-gerado')
        .then((res)=>{
           const search = res.data.filter((item)=>item.rupe === rupe)
           referencia_id = search[0].id
        }).catch((err)=>{
            console.log(err)
        })
        let dado
            await axios.get('http://localhost:5000/solicitacao')
            .then((res)=>{
                    dado = res.data.filter((item)=>item.nomealuno === usuario)       
            }).catch((err)=>{
                console.log(err)
            })
            if(dado.length == 0){
                if(rupe != 0){
                    await axios.patch(`http://localhost:5000/rupe-gerado/${referencia_id}`,{
                        estado:'pendente'
                    })
                    await axios.post('http://localhost:5000/solicitacao',{
                        nomealuno: usuario,
                        referencia: rupe
                    })
                    alert('Rupe enviado com sucesso') 
                }
            }
            else{
                alert('já enviaste a referência para esse usuário')
            }
        window.location.reload()

    }
    return(
        <div>
            <Modal isOpen={show} onClosed={closed} centered>
                <ModalHeader toggle={closed}>
                    <h2>Referência</h2>
                </ModalHeader>  
                <ModalBody>
                    <div>
                        <Label>Referência:</Label>
                        <Input type="select" value={rupe} onChange={(e)=>setRupe(e.target.value)}>
                            <option value={0}></option>
                            {rupes.map((item)=>(
                                <option value={item.rupe}>{item.rupe}</option>
                            ))}
                        </Input>
                        <div>   
                            <Label>Aluno:</Label>
                            <Input value={usuario}></Input>
                        </div>
                    </div>
                </ModalBody> 
                <ModalFooter>
                    <Button type="submit" onClick={save}>Enviar referência</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ModalRupe