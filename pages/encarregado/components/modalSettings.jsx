import React from "react";
import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/pages/login/components/utils/regex";     
import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, Input,  Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { useRouter } from "next/router";
let allData = []
function  ModalSetting({show, closed}){
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
    const [check, setCheck] = useState(true)
    const [next , setNext] = useState('')
    const [error, setError] = useState('')
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
    useEffect(async()=>{
        getData()
    },[])
    const getData = async ()=>{
        const value = localStorage.getItem('idencarregado')
        await axios.get(`http://localhost:5000/encarregado/${value}`).then((res)=>{
            setNome(res.data.nome)
            setEmail(res.data.email)
            setNumBi(res.data.bi)
            setTelefone(res.data.telefone)
            setSenha(res.data.senha)
        }).catch((err)=>{
            console.log(err)
        })
    
        
    }
    const router = useRouter()
    const save = async ()=>{
        alert('Informações actualizadas')
        const data = localStorage.getItem('idencarregado')
    if(nome!="" && numbi !="" && telefone !="" && email !="" && senha !=""){
        await axios.patch(`http://localhost:5000/encarregado/${data}`,{
            nome: nome,
            bi: numbi,
            telefone: telefone,
            email: email,
            sexo: sexo,
            senha:senha                
        })
        window.location.reload()
    }
    }
    return(
        <div>
            <Modal isOpen={show} onClosed={closed}>
                <ModalHeader toggle={closed}>
                    <h2>Editar dados </h2>
                </ModalHeader>
                <Form >
                <ModalBody>
                <div>
            <div>
            <Input
            readOnly={check}
            className="m-2"
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

        <div>
           
            <Input
                className="m-2"
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

        <div>
            <Input
                className="m-2"
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
        <div>
            <Input
                className="m-2"
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
            <div>
               
                <Input
                className="m-2"
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

                <div className="gender-field div m-2"  onChange={(event) => setSexo (event.target.value)}>
                    <p>Sexo</p>
                    <div className="radio-field div" >
                        <label htmlFor="masculino" >Masculino</label>
                        <Input
                            disabled={check}
                            type="radio"
                            value="masculino"
                            id="masculino"
                            className="input mx-1"
                            checked={sexo === 'masculino'}
                            onChange={handleChangue}
                        />
                        <label className="mx-2" htmlFor="feminino">Feminino</label>
                        <Input
                            disabled={check}
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
                    <Button onClick={()=>{
                        save()
                    }}>Salvar</Button>
                    <Button onClick={()=>setCheck(false)}>Editar</Button>
                </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
export default ModalSetting