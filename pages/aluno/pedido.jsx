import Head from "next/head"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import SideBarAluno from "./sidebar"
import NavBarAluno from "./navbar"
import styleGeral from '../css/logado.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import ModalReferencia from "./components/referencia"
function certificaterequest() {
    const router = useRouter()
    const [datas, setDatas] = useState([])
    const [nascimento, setNascimento] = useState()
    const [emissao, setEmissao] = useState()
    const [numero, setNumero] = useState()
    const [encarregado, setEncarregado] = useState()
    const [encarregada, setEncarregada] = useState()
    const [provincia, setProvincia] = useState('Luanda')
    const [emitido, setEmitido] = useState('Luanda')
    const [ano, setAno] = useState()
    const [necessitar, setNecessitar] = useState('Certificado')
    const [efeito, setEfeito] = useState()
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    useEffect(()=>{
       setInterval(()=>{
        getAlunoData()
       }, 1000)
    },[])
    
    const getAlunoData = async ()=>{
        
        try{
            const data = localStorage.getItem('idaluno')
            await axios.get(`http://localhost:5000/aluno/${data}`)
            .then((res)=>{
                 setDatas(res.data)
                if(res.data.permissao === 'Recusar')
                    router.push('/login/aluno/LoginAluno')
            }).catch((err)=>{
                console.log(err)
                router.push('/login/aluno/LoginAluno')
            })
            if(data == null){
                router.push('/login/aluno/LoginAluno')
            }
        }catch(err){
            console.log(err)
        }
    }
    const savePedido = async(e)=>{
        e.preventDefault()
        const date = new Date()
        const year = date.getFullYear()
        const dataNascimento = nascimento.split('-')
        const nascer = year - dataNascimento[0]
        const dataEmitir = emissao.split('-')
        const emitir = dataEmitir[0]
        let search
        await axios.get('http://localhost:5000/pedido')
        .then((res)=>{
            search = res.data.filter((item)=>item.nome === datas.nome)
        })
        if(search == 0){    
            if(ano <= year){
                if(nascer >= 15){
                    if( emitir <= year){
                        if(ano >=1900)
                        {
                            if(ano<= year){
                                await axios.post('http://localhost:5000/pedido', {
                                    nome: datas.nome,
                                    encarregado: encarregado,
                                    encarregada: encarregada,
                                    dataNascimento: nascimento,
                                    provincia: provincia,
                                    bi: datas.bi,
                                    emitido: emitido,
                                    dataEmissao: emissao,
                                    area: datas.area,
                                    curso: datas.curso,
                                    classe: datas.classe,
                                    turma: datas.turma,
                                    numero: numero,
                                    anoLectivo: ano,
                                    numeroProcesso: datas.numeroprocesso,
                                    necessidade: necessitar,
                                    efeito: efeito,
                                    tipo:'aluno'
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }else{
                                alert('O ano lectivo deve ser inferior ou igual ao ano actual')
                            }
                        }else{
                            alert('ano lectivo Inválido')
                        }
                        
                    }else{
                        alert('o ano de emissão tem de ser inferior ou igual ao ano actual')
                    }
                alert('Salvo com sucesso') 
            }else{
                    alert('a idade deve ser superior ou igual a 15')
            }
            }else{
                alert('O ano deve ser inferior ou igual ao ano actual')
            }
            
        }else{
            alert('O pedido já foi feito')
        }
    }
    return(
        <div>
            <Head>
                <title>Aluno | Pedido </title>
            </Head>
            <NavBarAluno/>
            
            <div className={styleGeral.container}>
            <SideBarAluno/>
            <div className={styleGeral.content}>
            <Form className=" d-flex flex-column m-3 mt-5" onSubmit={savePedido}>
                <FormGroup className="mt-5">
                    <Label>Nome:</Label>
                    <Input value={datas.nome} readOnly required/>
                </FormGroup>
                <FormGroup>
                    <Label>Filho de:</Label>
                    <Input value={encarregado} onChange={(e)=>setEncarregado(e.target.value)} required/>
                </FormGroup>
                <FormGroup>
                    <Label>e de:</Label> 
                    <Input value={encarregada} onChange={(e)=>setEncarregada(e.target.value)} required/>
                </FormGroup>
                <FormGroup className="d-flex flex-wrap">
                    <FormGroup className="m-2">
                        <Label>Data de Nascimento:</Label>
                        <Input value={nascimento} onChange={(e)=>setNascimento(e.target.value)} type="date" required></Input>
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label>Provincia de: </Label>
                        <Input type="select" value={provincia} onChange={(e)=>setProvincia(e.target.value)} required>
                            <option disabled>Provincia</option>
                            <option value="luanda">Luanda</option>
                            <option value="bengo">Bengo</option>
                            <option value="benguela">Benguela</option>
                            <option value="bie">Bié</option>
                            <option value="cabinda">Cabinda</option>
                            <option value="cuando cubango">Cuando Cubango</option>
                            <option value="cuanza norte">Cuanza Norte</option>
                            <option value="cuanza sul">Cuanza Sul</option>
                            <option value="cunene">Cunene</option>
                            <option value="Huambo">Huambo</option>
                            <option value="huila">Huíla</option>
                            <option value="lunda norte">Lunda Norte</option>
                            <option value="lunda sul">Lunda Sul</option>
                            <option value="malanje">Malanje</option>
                            <option value="moxico">Moxico</option>
                            <option value="namibe">Namibe</option>
                            <option value="uige">Uíge</option>
                            <option value="zaire">Zaíre</option>
                        </Input>
                    </FormGroup>
                </FormGroup>
                <FormGroup className="d-flex flex-wrap ">
                    <FormGroup className="m-2">
                        <Label>Portador do BI Nº:</Label>
                        <Input value={datas.bi} readOnly required/>
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label>Emitido em</Label>
                        <Input type="select" value={emitido} onChange={(e)=>setEmitido(e.target.value)}>
                            <option disabled>Provincia</option>
                            <option value="luanda">Luanda</option>
                            <option value="bengo">Bengo</option>
                            <option value="benguela">Benguela</option>
                            <option value="bie">Bié</option>
                            <option value="cabinda">Cabinda</option>
                            <option value="cuando cubango">Cuando Cubango</option>
                            <option value="cuanza norte">Cuanza Norte</option>
                            <option value="cuanza sul">Cuanza Sul</option>
                            <option value="cunene">Cunene</option>
                            <option value="Huambo">Huambo</option>
                            <option value="huila">Huíla</option>
                            <option value="lunda norte">Lunda Norte</option>
                            <option value="lunda sul">Lunda Sul</option>
                            <option value="malanje">Malanje</option>
                            <option value="moxico">Moxico</option>
                            <option value="namibe">Namibe</option>
                            <option value="uige">Uíge</option>
                            <option value="zaire">Zaíre</option>
                        </Input>
                    </FormGroup>
                <FormGroup className="m-2">
                        <Label>aos:(data de emissão)</Label>
                        <Input value={emissao} onChange={(e)=>setEmissao(e.target.value)} type="date" required/>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label>Matriculado na Área de Formação: </Label>
                    <Input value={datas.area} readOnly required></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Curso Especialidade:</Label>
                    <Input value={datas.curso} readOnly required></Input>
                </FormGroup>
                <Label>Dados da Última Frequência:</Label>
                <FormGroup className="d-flex flex-wrap">
                    <FormGroup className="m-2">
                        <Label>Classe:</Label>
                        <Input value={datas.classe} readOnly required></Input>
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label>Turma:</Label>
                        <Input value={datas.turma} readOnly required></Input>
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label>Nº:</Label>
                        <Input value={numero} onChange={(e)=>setNumero(e.target.value)} type="number" required/>
                    </FormGroup>
                    <FormGroup className="m-2">
                        <Label>Ano Lectivo:</Label>
                        <Input value={ano} onChange={(e)=>setAno(e.target.value)} type="number" required></Input>
                    </FormGroup>
                </FormGroup>
                
                <FormGroup>
                    <Label>Número de Processo:</Label>
                    <Input value={datas.numeroprocesso} type="number" readOnly required></Input>
                </FormGroup>
                <FormGroup>
                    <Label>Necessitando de</Label>
                    <Input type="select" value={necessitar} onChange={(e)=>setNecessitar(e.target.value)} required>
                        <option value="certificado">Certificado</option>
                        <option value="declaração" disabled>Declaração</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Efeitos ou por motivos de:</Label>
                    <Input value={efeito} onChange={(e)=>setEfeito(e.target.value)} required></Input>
                </FormGroup>
                <div>
                    <Button color="outline-secondary" className="m-2" type="submit">Fazer pedido</Button>
                    <Button color="outline-primary" className="m-2" onClick={()=>{
                        router.push('/aluno/salvo')
                    }}>Ver pedido</Button>
                    <Button onClick={()=>{toggleModal()}}>Referência</Button>
                    <ModalReferencia show={modal} closed={modalClose}></ModalReferencia>
                </div>
            </Form>  
            </div>
            </div>
        </div>
    )
    
}

export default certificaterequest