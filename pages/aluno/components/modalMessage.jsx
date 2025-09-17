import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Card, CardBody, CardFooter } from "reactstrap"
import i1 from "../../../public/images/logotipo.png"
import i2 from "../../../public/images/student.jpg"
import Image from "next/image"
import imagem from '../../../public/images/profile_user.png'
const listDay = []
const data = []
function ModalMessage({show, closed}){
    const router = useRouter()
    const [change, setChange] = useState('aluno')
    const [datas, setDatas] = useState([])
    const [item, setItem] = useState([])
    const [area, setArea] = useState('')
    const [tipo, setTipo] = useState('')
    useEffect(()=>{
        const data = localStorage.getItem('idaluno')
        axios.get(`http://localhost:5000/aluno/${data}`)
        .then((res)=>{
            setTipo(res.data.tipo)    
        }).catch((err)=>{
            console.log(err)
        })
        getUsers('aluno')
        axios.get('http://localhost:5000/aluno')
         .then((response)=>{
            try{
            const idaluno = localStorage.getItem('idaluno')
            const aluno = response.data.filter((data)=>data.id == idaluno)
            setArea(aluno[0].area)
            }catch(err){
                console.log(err)
            }
         })
     },[])
    const search = async (dado)=>{
        if(change==='aluno'){
        await axios.get('http://localhost:5000/aluno')
         .then((response)=>{
            const search = response.data.filter((data)=>data.nome === dado)
            setDatas(search) 
         })    
        }
        else{
            await axios.get('http://localhost:5000/encarregado')
            .then((response)=>{
               const search = response.data.filter((data)=>data.nome === dado)
               setDatas(search) 
            })    
        }
    }
     const getUsers = async (change)=>{
        
        if(change === 'aluno'){
        await axios.get('http://localhost:5000/aluno')
         .then((response)=>{
            console.log(datas)
            const idaluno = localStorage.getItem('idaluno')
            const aluno = response.data.filter((data)=>data.id == idaluno)
            const search = response.data.filter((data)=>data.id != idaluno && data.area === aluno[0].area)
            setDatas(search)   
         })
         .catch((err)=>console.log(err))
         
        }else if(change === 'coordenador'){
         await axios.get('http://localhost:5000/coordenador')
         .then((response)=>{
                const search = response.data.filter((item)=> item.area === area)
                setDatas(search)
         })
         .catch((err)=>console.log(err))
         
        }
        
     }
     const [procurar, setProcurar] = useState('')
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Enviar Mensagem</h2>
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex flex-column">
                        <Input type="select" value={change} onChange={(e)=>{
                            setChange(e.target.value)
                            getUsers(e.target.value)                       
                        }}>
                            <option value={'aluno'}>Aluno</option>
                            <option value={'coordenador'}>Coordenador</option>
                        </Input>
                        <div className="d-flex m-2">
                            <Input className="m-1" type="text" value={procurar} onChange={(e)=>{
                                setProcurar(e.target.value)
                                if(e.target.value == ""){
                                    getUsers(change)
                                }
                                
                            }} placeholder="Pesquisar usuário"/>
                            <Button className="m-1" onClick={()=>{
                                search(procurar)
                                if(procurar == ""){
                                    getUsers(change)
                                }
                                }}>Pesquisar</Button>
                        </div>
                        {change == 'aluno' && datas.length != 0 ? datas.map((item)=>(
                            <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3 m-2" aria-current="true" onClick={()=>{
                                 localStorage.setItem('receptor', item.nome)
                                 localStorage.setItem('tipo', item.tipo)
                                 localStorage.setItem('tipo2', tipo)
                                 router.push('/aluno/mensagem')
                            }}>
                            <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 class="mb-0">{item.nome}</h6>
                                    <p  class="mb-0 opacity-75">Curso: {item.curso}</p>
                                    <p  class="mb-0 opacity-75">classe: {item.classe}</p>
                                    <p  class="mb-0 opacity-75">Área de formação: {item.area}</p>
                                </div>
                                <small class="opacity-50 text-nowrap">envie a sua mensagem</small>
                            </div>
                            </a>
                        </div>
                           
                        )

                        ) : datas.map((item)=>(
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3 m-2" aria-current="true" onClick={()=>{
                                 localStorage.setItem('receptor', item.nome)
                                 localStorage.setItem('tipo', item.tipo)
                                 localStorage.setItem('tipo2', tipo)
                                 router.push('/aluno/mensagem')
                            }}>
                            <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 class="mb-0">{item.nome}</h6>
                                    <p  class="mb-0 opacity-75">Area de formação: {item.area}</p>
                                </div>
                                <small class="opacity-50 text-nowrap">envie a sua mensagem</small>
                            </div>
                            </a>
                        </div>
                            )) }
                    </div>
                    
                    
                    
                </ModalBody> 
            </Modal>
        </div>
    )
}
export default ModalMessage