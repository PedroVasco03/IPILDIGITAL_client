import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
const ModalPermission = ({show, closed, id, route}) => {
    const [senha, setSenha] = useState('')
    const [data, setData] = useState('')
    const confirm = async(senhaAvaliada)=>{
        if(senha !=null && senhaAvaliada!="" || senha!="" && senhaAvaliada!=""){
            if(senha === senhaAvaliada){
                await deletar()
            }else{
                alert('Senha Inválida')
                close()
            }
        }
        
    }
    const deletar = async()=>{
        await axios.delete(`http://localhost:5000/${route}/${id}`)
        if(route ==='coordenador'){
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
        }
        if(route ==='director'){
            await axios.get('http://localhost:5000/reclamacao')
            .then((response)=>{
                    response.data.map(async(item)=>{
                        if(item.idlocal === id){
                            await axios.delete(`http://localhost:5000/reclamacao/${item.id}`)
                        }
                    })
            })
            await axios.get('http://localhost:5000/horario-secretaria')
            .then((response)=>{
                    response.data.map(async(item)=>{
                        if(item.idhorario === id){
                            await axios.delete(`http://localhost:5000/horario-secretaria/${item.id}`)
                        }
                    })
            })
        }
        if(route==='aluno'){
            await axios.get('http://localhost:5000/reclamacao')
            .then((response)=>{
                    response.data.map(async(item)=>{
                        if(item.idaluno === id){
                            await axios.delete(`http://localhost:5000/reclamacao/${item.id}`)
                        }
                    })
            })
        }
        alert('eliminado com sucesso')
        window.location.reload()
        
    }
    useEffect(()=>{
        try{
            const user =JSON.parse(localStorage.getItem('login'))
            setSenha(user.senha)
        }catch(err){
            console.log(err)
        }
    },[])
    return (
        <Modal isOpen={show} onClosed={closed} centered >
            <ModalHeader >
                <h2>Segurança</h2>
            </ModalHeader>
            <ModalBody>
                <Input value={data} onChange={(e)=>setData(e.target.value)} placeholder='digite a sua senha'/>
            </ModalBody>
            <ModalFooter>
                <Button onClick={()=>{confirm(data)}}>Confirmar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalPermission;