import axios from "axios"
import { useRouter } from "next/router"
import { useState , useEffect} from "react"
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
function ModalPermitir({show,id,closed,route, permissao}){
    const router = useRouter()
    const [senha, setSenha] = useState('')
    const [data, setData] = useState('')
    const confirm = async(senhaAvaliada)=>{
        if(senha !=null && senhaAvaliada!="" || senha!="" && senhaAvaliada!=""){
            if(senha === senhaAvaliada){
                await update()
            }else{
                alert('Senha Inválida')
                close()
            }
        }
        
    }
    const update = async()=>{
        if(permissao ==='Permitir'){
            await axios.patch(`http://localhost:5000/${route}/${id}`,{
            permissao: 'Permitir' 
        })
         alert('O usuário tem acesso Permitido')
        }
        else if(permissao ==='Recusar'){
            await axios.patch(`http://localhost:5000/${route}/${id}`,{
                permissao: 'Recusar' 
            })
            alert('O usuário tem acesso Negado')
        }
        
        window.location.reload()
        
    }
    useEffect(()=>{
        try{
            const id = localStorage.getItem('idAdmin')
            axios.get(`http://localhost:5000/admin/${id}`).then((res)=>{
                setSenha(res.data.senha)
            }).catch((err)=>{
                router.push('/admin/login')
            })
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
}
export default ModalPermitir