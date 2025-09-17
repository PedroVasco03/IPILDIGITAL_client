import { useEffect, useState, } from "react"
import { Button, Form, Input,  Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import React from "react";
import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/pages/login/components/utils/regex";
import axios from "axios";
import { useRouter } from "next/router";

function  ModalSettings({show, close}){
    const [desabilitado, setDesabilitado] = useState(false)
    const [nome, setNome] = React.useState('');
    const [nomeErr, setNomeErr] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState(false);
    const [telefone, setTelefone] = React.useState('');
    const [telefoneErr, setTelefoneErr] = React.useState('');
    const [numbi, setNumBi] = React.useState('');
    const [biErr, setBiErr] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [senhaErr, setSenhaErr] = React.useState(false);
    const [sexo, setSexo] = React.useState('masculino');
    const [curso, setCurso] = React.useState('');
    const [area, setArea] = React.useState('');
    const [classe, setClasse] = React.useState('');
    const [turma, setTurma] = React.useState('');
    const [numprocesso, setNumProcesso] = React.useState('');
    const [check, setCheck] = useState(true)
    const [update, setUpdate] = useState([])
    const [upadate, setUpadate] = useState([])
    const filterArea = (dado)=>{
        if(dado === 'construcao_civil'){
            const areaFormacao =['Selecione o curso','Desenhador Projetista', 'Técnico de Obras']
            const course = ['','CP','CC']
            setUpdate(areaFormacao)
            setUpadate(course)  
        }
        if(dado === 'eletricidade'){
            const areaFormacao =['Selecione o curso','Energia e Instalações Elétricas', 'Electrónica e Automação', 'Electrónica e Telecomunicações','Energias Renováveis']
            const course = ['','EI','EA', 'ET', 'ER']
            setUpdate(areaFormacao)
            setUpadate(course)
    

        }
        if(dado === 'informatica'){
            const areaFormacao =['Selecione o curso','Técnico de Informática', 'Técnico de Gestão de Informática']
            const course = ['','II','IG']
            setUpdate(areaFormacao)
            setUpadate(course)

        }if(dado === 'mecanica'){
            const areaFormacao =['Selecione o curso','Mecatrónica', 'Frio e Climatização', 'Electromecânica', 'Máquinas e Motores', 'Mecatrónica Autómovel', 'Metalomecânica']
            const course = ['','MC','MF', 'ME', 'MM', 'MV','MT']
            setUpdate(areaFormacao)
            setUpadate(course)
        }if(dado === 'quimica'){
            const areaFormacao=['Selecione o curso','Ambiente e Controle de Dados', 'Química Industrial', 'Petroquímica','Bioquímica','Técnico de Técnicas de Laboratório']
            const course = ['Selecione o curso','QA','QI', 'QP', 'QB', 'QT']
            setUpdate(areaFormacao)
            setUpadate(course)
        }
    }
    function handleChangue({target}){
        setSexo(target.value);
    }
    
    function deteta (e){
        const Code = (e.charCode ? e.charCode : e.wich);
        if(Code > 40 && Code <=62){
            e.preventDefault()
        }
    }
    function detetaNum (e){
        const Code = (e.charCode ? e.charCode : e.wich);
        if(Code < 40 || Code > 58){
            e.preventDefault()
        }
    }
    const validate = () => {
        if(!validateName.test(nome)){
            setNomeErr(true)
            setDesabilitado(true)
        }else{
            setNomeErr(false)
            setDesabilitado(false)
        }
        if(!validateEmail.test(email)){
            setEmailErr(true)
            setDesabilitado(true)
        }else{
            setEmailErr(false)
            setDesabilitado(false)
        }
        if(!validateTelefone.test(telefone)){
            setTelefoneErr(true)
            setDesabilitado(true)
        }else{
            setTelefoneErr(false)
            setDesabilitado(false)
        }
        if(!validateBi.test(numbi)){
            setBiErr(true)
            setDesabilitado(true)
        }else{
            setBiErr(false)
            setDesabilitado(false)
        }
        if(!validatePassword.test(senha)){
            setSenhaErr(true)
            setDesabilitado(true)
        }else{
            setSenhaErr(false)
            setDesabilitado(false)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    const router =useRouter()
    const getData = async ()=>{
        const value = localStorage.getItem('idaluno') 
        await axios.get(`http://localhost:5000/aluno/${value}`).then((res)=>{ 
            console.log(res.data)
            setNome(res.data.nome)
            setEmail(res.data.email)
            setNumBi(res.data.bi)
            setTelefone(res.data.telefone)
            setSenha(res.data.senha)
            setSexo(res.data.sexo)
            setNumProcesso(res.data.numeroprocesso)
    }).catch((err)=>{
        console.log(err)
    })
    }
    const save = async ()=>{
        
        const data = localStorage.getItem('idaluno')
    if(nome !="" && numbi!=""&& classe!="" && curso!="" && area!="" && telefone !="" && senha!="" && turma !="" && numprocesso !=""){
        
        alert('informações actualizadas com sucesso')
        await axios.patch(`http://localhost:5000/aluno/${data}`,{
            nome: nome,
            bi: numbi,
            classe: classe,
            curso: curso,
            area: area,
            sexo: sexo,
            telefone: telefone,
            senha: senha, 
            turma: turma,
            numprocesso: numprocesso,                
        })
        
        localStorage.removeItem('idaluno')
        router.push('/login/aluno/LoginAluno')
    }
    }
    return(
        <div>
            <Modal isOpen={show} onClosed={close}>
                <ModalHeader toggle={close}>
                    <h2>Editar dados </h2>
                </ModalHeader>
                <Form >
                <ModalBody>
                <div>
            <div>
           
            <Input
                className="m-2"
                readOnly={check}
                type="text"
                name="usernew"
                placeholder="Nome"
                value={nome}
                id="nome"
                onKeyPress={deteta}
                onChange={
                    (event) => {
                    const nome = event.target.value
                    setNome (event.target.value)
                    setNomeErr(false)
                    setDesabilitado(false)
                    if(validateName.test(nome) && validateTelefone.test(telefone) && validateEmail.test(email) && validateBi.test(numbi)&& validatePassword.test(senha)){
                        const fetchData = allData.filter((data)=> data.nome == nome || data.bi ==numbi || data.email == email || data.telefone == telefone)
                        if(fetchData.length == 0){
                            setError('')
                            setNext('/login/aluno/ProsseguirAluno')
                        }
                        else{
                            setNext('')
                            setError('Dados digitados já existem')
                        }

                    }
                    else{
                        setNext('')
                    }
                }

                }
            onBlur={validate}
            required={true}
            />
        </div>
        {nomeErr && <p>Por favor digite nome válido</p>}

        <div className="m-2">
           
            <Input
                readOnly={check}
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) =>{
                    const mail = event.target.value
                    setEmail(event.target.value)
                    setEmailErr(false)
                    setDesabilitado(false)
                    if(validateName.test(nome) && validateTelefone.test(telefone) && validateEmail.test(mail) && validateBi.test(numbi)&& validatePassword.test(senha)){
                        const fetchData = allData.filter((data)=> data.nome == nome || data.bi ==numbi || data.email == email || data.telefone == telefone)
                        if(fetchData.length == 0){
                            setError('')
                            setNext('/login/aluno/ProsseguirAluno')

                        }
                        else{
                            setNext('')
                            setError('Dados digitados já existem')
                        }
                    }
                    else{
                        setNext('')
                    }
                }}
                onBlur={validate}
                required={true}
            />
        </div>
        {emailErr && <small>Por favor  digite um email válido</small>}

        <div className="m-2">
            
            <Input
                readOnly={check}
                type="text"
                name="mailnew"
                placeholder="Telefone"
                maxLength={11}
                minLength={9}
                value={telefone}
                onKeyPress={detetaNum}
                onChange={
                    (event) => {
                    const cellphone = event.target.value
                    setTelefone (event.target.value)
                    setTelefoneErr(false)
                    setDesabilitado(false)

                    if(validateName.test(nome) && validateTelefone.test(cellphone) && validateEmail.test(email) && validateBi.test(numbi)&& validatePassword.test(senha)){
                        const fetchData = allData.filter((data)=> data.nome == nome || data.bi ==numbi || data.email == email || data.telefone == telefone)
                        if(fetchData.length == 0){
                            setError('')
                            setNext('/login/aluno/ProsseguirAluno')
                        }
                        else{
                            setError('Dados digitados já existem')
                            setNext('')
                        }
                    }
                    else{
                        setNext('')
                    }
                    }
                }
                onBlur={validate}
                required={true}
            />
        </div>
        {telefoneErr && <small>Por favor digite número válido EX: "999-999-999"</small>}
       
    </div>
    <div>
        <div className="m-2">
            <Input
                readOnly={check}
                type="text"
                name="binew"
                placeholder="Bilhete de identidade"
                maxLength={14}
                value={numbi}
                onChange={
                    (event) => {
                    const bi = event.target.value
                    setNumBi (event.target.value)
                    setBiErr(false)
                    setDesabilitado(false)
                    if(validateName.test(nome) && validateTelefone.test(telefone) && validateEmail.test(email) && validateBi.test(bi)&& validatePassword.test(senha)){
                        const fetchData = allData.filter((data)=> data.nome == nome || data.bi ==numbi || data.email == email || data.telefone == telefone)
                        if(fetchData.length == 0){
                            setError('')
                            setNext('/login/aluno/ProsseguirAluno')
                        }
                        else{
                            setError('Dados digitados já existem')
                            setNext('')
                        }
                    }
                    else{
                        setNext('')
                    }
                }
                }
                onBlur={validate}
                required={true}
                />
            </div>
            {biErr && <small>Por favor digite numero do bilhete válido</small>}
            <div className="m-2">
                    <Input
                        
                        readOnly={check}
                        type="number" 
                        name="processnumber" 
                        placeholder="Número de Processo" 
                        value={numprocesso}
                        required={true}
                        onKeyPress={deteta}
                        onChange={(event) => {
                            console.log(numprocesso)
                            setNumProcesso(event.target.value)}}
                    />
                </div>
                <div>
                <Input 
                    type="select"
                    className="m-2"
                    readOnly={check}
                    value={area} 
                    onChange={({target}) => {
                        setArea (target.value)
                        filterArea(target.value)
                    }} 
                    id="area"
                >
                    <option disabled value="">Selecione a área</option>
                    <option value="construcao_civil">Construção Civil</option>
                    <option value="eletricidade">Eletricidade</option>
                    <option value="informatica">Informática</option>
                    <option value="mecanica">Mecanica</option>
                    <option value="quimica">Química</option>
                    required={true}
                </Input>
                </div>
        
    </div>
    <div>
        <div className="m-2">
           
            <Input type='select' name="curso" value={curso} onChange={(event) => setCurso (event.target.value)} readOnly={check}>
                    {update.map((item, index)=>(
                        <option value={upadate[index]}>{item}</option>
                    ))}
                required={true}
            </Input>
        </div>
        <div className="m-2">
            
            <Input type="select" name="classe"  value={classe} onChange={(event) => setClasse (event.target.value)} readOnly={check}>
                <option disabled value="">Selecione a classe</option>
                <option value="10">10ª classe</option>
                <option value="11">11ª classe</option>
                <option value="12">12ª classe</option>
                <option value="13">13ª classe</option>
                required={true}
            </Input>
        </div>
        <div className="m-2">
        <Input name="turma" type="select"  value={turma} onChange={(event) => setTurma (event.target.value)}>
                            <option disabled value="">Selecione a turma</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="C">D</option>         
        </Input>
        </div>
    </div>
    <div>
        <div className="m-2">
               
                <Input
                    readOnly={check}
                    type="password"
                    name="password"
                    placeholder="Senha"
                    maxLength={8}
                    value={senha}
                    onChange={
                            (event) => {
                                const password = event.target.value
                            setSenha (event.target.value)
                            setSenhaErr(false)
                            setDesabilitado(false)
                            if(validateName.test(nome) && validateTelefone.test(telefone) && validateEmail.test(email) && validateBi.test(numbi)&& validatePassword.test(password)){
                                const fetchData = allData.filter((data)=> data.nome == nome || data.bi ==numbi || data.email == email || data.telefone == telefone)
                                if(fetchData.length == 0){
                                    setError('')
                                    setNext('/login/aluno/ProsseguirAluno')
                                }
                                else{
                                    setError('Dados digitados já existem')
                                    setNext('')
                                }
                            }
                            else{
                                setNext('')
                            }
                        }

                    }
                    onBlur={validate}
                    required={true}
                />
            </div>
            {senhaErr &&
                <small>
                    A senha deve incluir: 8 dígitos , incluíndo uma letra maiúscula e um número
                </small>
            }

                <div className="m-2"  onChange={(event) => setSexo (event.target.value)}>
                    <p>Sexo</p>
                    <div className="radio-field div" >
                        <label htmlFor="masculino" >Masculino</label>
                        <Input
                            readOnly={check}
                            type="radio"
                            value="masculino"
                            id="masculino"
                            className="input mx-1"
                            checked={sexo === 'masculino'}
                            onChange={handleChangue}
                        />
                        <label className="mx-2" htmlFor="feminino">Feminino</label>
                        <Input
                            readOnly={check}
                            type="radio"
                            id="feminino"
                            value="feminino"
                            className="input mx-1"
                            checked={sexo==='feminino'}
                            onChange={handleChangue}
                        />
                    </div>
                </div>
               </div> 
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" onClick={()=>{
                        save() 
                    }}>Salvar</Button>
                    <Button onClick={()=>setCheck(false)}>Editar</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default ModalSettings