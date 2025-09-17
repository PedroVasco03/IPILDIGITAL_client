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
function ModalTeam({show, closed , idcoordencao}){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [item, setItem] = useState([])
    const [area, setArea] = useState('')
    const getUsers = async ()=>{
        let area
        axios.get('http://localhost:5000/coordenador')
        .then((response)=>{
           const idaluno = localStorage.getItem('idcoordenador')
           const aluno = response.data.filter((data)=>data.id == idaluno)
           area = aluno[0].area
        })
        await axios.get('http://localhost:5000/aluno')
         .then((response)=>{
            const search = response.data.filter((data)=>data.area === area) 
            setDatas(search)
         })
         .catch((err)=>console.log(err)) 
     }
    useEffect(()=>{
        getUsers()
     
     },[])
     const addUser = async(nome )=>{
        const idcoordenador = localStorage.getItem('idcoordenador')
        await axios.post('http://localhost:5000/coordenacao-integrante', {
            idcoordenador,
            nome
        })
        window.location.reload()
     }
    const search = async (dado)=>{
        await axios.get('http://localhost:5000/aluno')
         .then((response)=>{
            const search = response.data.filter((data)=>data.nome === dado)
            setDatas(search) 
         })
    }
    
     const [procurar, setProcurar] = useState('')
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Adicionar Integrantes</h2>
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex flex-column">
                        <h3>Alunos</h3>
                        <div className="d-flex m-2">
                            <Input className="m-1" type="text" value={procurar} onChange={(e)=>{
                                setProcurar(e.target.value)
                                if(e.target.value == ""){
                                    getUsers()
                                }
                                
                            }} placeholder="Pesquisar usuário"/>
                            <Button className="m-1" onClick={()=>{
                                search(procurar)
                                if(procurar == ""){
                                    getUsers()
                                }
                                }}>Pesquisar</Button>
                        </div>
                        {datas.map((item)=>(
                            <div class="list-group">
                            <a class="list-group-item list-group-item-action d-flex gap-3 py-3 m-2" aria-current="true" onClick={()=>{
                            }}>
                            <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                            <div class="d-flex gap-2 w-100 justify-content-between">
                                <div>
                                    <h6 class="mb-0">{item.nome}</h6>
                                    <p  class="mb-0 opacity-75">Curso: {item.curso}</p>
                                    <p  class="mb-0 opacity-75">classe: {item.classe}</p>
                                    <p  class="mb-0 opacity-75">Área de formação: {item.area}</p>
                                </div>
                                <small class="opacity-50 text-nowrap" onClick={()=>{addUser(item.nome)}} style={{cursor:'pointer'}}>adicionar</small>
                            </div>
                            </a>
                        </div>
                           
                        )

                        )
                    }
                    </div>
                    
                    
                    
                </ModalBody> 
            </Modal>
        </div>
    )
}
export default ModalTeam