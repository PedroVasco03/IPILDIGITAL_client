import NavBarCoordenacao from "./navbar"
import styleGeral from '../css/logado.module.css'
import AccordionComponent from "./components/accordion"
import Head from "next/head"
import SideBarCoordenacao from "./sidebar"
import { AccordionBody, Badge, Button, Card, CardBody, Form, Input, Label, Table } from "reactstrap"
import { useEffect } from "react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import SideBarAluno from "./sidebar"
import ModalSetting from "./components/modalSettings"
import ModalAlert from "./modalAlert"
import ModalConfirmation from "./components/modalConfirmation"


function Services(){
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [gerar, setGerar] = useState('')
    const [gerado, setGerado] = useState([])
    const [dataEmissao, setEmissao] = useState('')
    const [dataExpirar, setExpirar] = useState('')
    const [modal, setModal] = useState(false)
    const [referencia, setReferencia] = useState('')
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    const [id, setId] = useState('')
    useEffect(()=>{
        setInterval(()=>{
            getGerado()
            getAlunoData()
           }, 1000)
     },[])
     const update = async(estado, id)=>{
        await axios.patch(`http://localhost:5000/rupe-gerado/${id}`,{
            estado: estado
        })
        .catch((err)=>{console.log(err)})
     }
     const saveRupe = async(e)=>{
        e.preventDefault() 
        let search
        await axios.get('http://localhost:5000/rupe-gerado')
        .then((resp)=>{
            search = resp.data.filter((item)=>item.rupe === gerar)
        })
        if(search.length == 0){  
        if(gerar!="" && dataEmissao !="" && dataExpirar!=""){
            const emissao = dataEmissao.split('/')
            const expiracao = dataExpirar.split('-')
            const expirar = expiracao[2]+"/"+expiracao[1]+"/"+expiracao[0]
            const date = new Date()
            const year = date.getFullYear()
            if(Number.parseInt(emissao[0]) < Number.parseInt(expiracao[2]) && Number.parseInt(emissao[1]) == Number.parseInt(expiracao[1]) || Number.parseInt(emissao[1]) != Number.parseInt(expiracao[1]) ){
                    if(Number.parseInt(emissao[2])>= year){
                        if(Number.parseInt(expiracao[0])>= year){
                            await axios.post('http://localhost:5000/rupe-gerado',{
                                rupe: gerar,
                                dataEmissao: dataEmissao,
                                dataExpirar: expirar,
                                estado: 'activo'
                            })
                        }else{
                            alert('Ano de Expiração é inferior ao ano actual')
                        }
                    }else{
                        alert('Ano de emissão é inferior ao ano actual')
                    }
                
                
            }else{
                alert('data de emissão precisa ser inferior que a data expiração')
            }
    }
        }
        else{
            alert('Rupe já existe')
        }
     }
     const getRupe = async ()=>{
        await axios.get(`http://localhost:5000/rupe`)
        .then((response)=>{
            setGerar(response.data.rupe)
        })
     }
     const getGerado = async()=>{
        const date = new Date()
        let dia
        let mes
        if(date.getDate() < 10)
        {
            dia = '0'+date.getDate()
            
        }else{
            dia = date.getDate()
        }
        if(date.getMonth()+1 < 10){
            mes = '0'+(date.getMonth()+1)
        }else{
            mes = date.getMonth()+1
        }
        const data = dia +"/"+mes+"/"+date.getFullYear()
        setEmissao(data)
        await axios.get(`http://localhost:5000/rupe-gerado`)
        .then((response)=>{
            response.data.map((item)=>{
                const data = item.dataExpirar.split('/')
                const numberDia = Number.parseInt(dia)
                const numberDia2 = Number.parseInt(data[0])
                if(numberDia >= numberDia2 ){
                    if(date.getFullYear() > Number.parseInt(data[2])){
                        if(mes >= (Number.parseInt(data[1]) + 1)){
                            axios.patch(`http://localhost:5000/rupe-gerado/${item.id}`,{
                                    estado:'expirado'
                            })
                        }     
                        
                    }
                         
                
                }else{
                    if(date.getFullYear() > Number.parseInt(data[2])){
                        if(mes >= (Number.parseInt(data[1]) + 1)){
                            axios.patch(`http://localhost:5000/rupe-gerado/${item.id}`,{
                                    estado:'expirado'
                            })
                        }     
                        
                    }
                }
            })
            setGerado(response.data)
        })
     }
    const getAlunoData = async ()=>{
        try{
            const data = localStorage.getItem('idfuncionario')
            await axios.get(`http://localhost:5000/funcionario/${data}`)
            .then((response)=>{
                setDatas(response.data)
                if(response.data.permissao === 'Recusar')
                router.push('/login/funcionario/login')
            }).catch((err)=>{
              router.push('/login/funcionario/login')
            })
            if(data  == null)
                router.push('/login/funcionario/login')
            
        }catch(err){
            console.log(err)
        }
    }
    
    return <div>
        <Head>
            <title>Funcionario | Serviços</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>
        <NavBarCoordenacao></NavBarCoordenacao>
        <div className={styleGeral.container} style={{paddingTop:'80px'}}>
            <SideBarAluno></SideBarAluno>
            <div className={styleGeral.content}>
               <div className="m-4">
                    <Form  onSubmit={saveRupe}>
                    <Label>Rupe:</Label>
                    <div className="d-flex">
                        <div className="w-75">
                            <Input className="" style={{fontSize:'1.2rem'}} value={gerar} onInput={(e)=>setGerar(e.target.value)} required></Input>
                        </div>
                        <Button color="outline-primary" className="mx-3" onClick={getRupe} >Gerar Rupe</Button>
                    </div>
                    <div className="d-flex my-4">
                        <div className="w-50">
                            <Label>Data de Emissão:</Label>
                            <Input  value={dataEmissao} readOnly></Input>
                        </div>
                        <div className="w-50">
                            <Label>Data de expiração</Label>
                            <Input type="date" className="mx-3" value={dataExpirar} onChange={(e)=>setExpirar(e.target.value)} required></Input>
                        </div>
                    </div>
                    <Button type="submit" color="outline-secondary">Salvar Rupe</Button>
                    <Button color="outline-primary" className="mx-3" onClick={()=>{router.push('/funcionario/solicitacao')}}>Pedidos</Button>
                    </Form>
            <div class="card shadow-2-strong my-5"  style={{backgroundColor: 'white'}}>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-bordeless table-hover mb-0">
                    <thead>
                      <tr> 
                        <th scope="col">id_Referência</th>
                        <th scope="col">Referência de pagamento</th>
                        <th scope="col">Data de Emissão</th>
                        <th scope="col">Data de Expiração</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Permissão</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                        {gerado.map((item)=>(
                            <tr style={{cursor:'pointer'}} onDoubleClick={()=>{
                                setId(item.id)
                                toggleModal()
                                setReferencia(item.rupe)
                               
                            }}>
                                <td>{item.id}</td>
                                <td>{item.rupe}</td>
                                <td>{item.dataEmissao}</td>
                                <td>{item.dataExpirar}</td>
                                <td><Badge className="bg-success">{item.estado}</Badge></td>
                                <td>
                                    <Button style={{padding:'1px 18px'}} onClick={()=>{update('pago', item.id )}} className="mx-1">Pago</Button>
                                    <Button style={{padding:'1px 18px'}} onClick={()=>{update('inactivo', item.id )}} className="mx-1" color="danger">inactivo</Button>
                                    <Button style={{padding:'1px 18px'}} onClick={()=>{update('activo', item.id )}} color="primary" className="mx-1">activo</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
               </div>
            </div>   
          </div>
          </div>
        </div>
        <ModalConfirmation show={modal} closed={modalClose} route={'rupe-gerado'} id={id} referencia={referencia}></ModalConfirmation>
    </div>;
}
export default Services