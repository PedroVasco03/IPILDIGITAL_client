import React from "react";
import ButtonConfirm from "../../components/ButtonConfirm";
import {validateEmail,validatePassword} from "../../components/utils/regex"
import style from "../../../css/Login.module.css"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Label } from "reactstrap";
import { useRouter } from "next/router";



function SignInForm(){
   const router = useRouter()
   const [aluno, setAluno] = useState([])
   const [danger, setDanger] = useState('')
   const [next, setNext] = useState('')
   useEffect(()=>{
        setInterval(()=>{
            getAluno()
        }, 2000)
   }, [])

   const cadastrar = ()=>{
    
        if(email!="" && senha!=""){
            if(validateEmail.test(email) && validatePassword.test(senha)){
                const search = aluno.filter((data)=> data.email === email && data.senha === senha)
                if(search.length==0){
                    setDanger('dados não encontrados!')
                }
                search.map((data)=>{
                    if(data.permissao=='Recusar'){
                       setDanger('Acesso negado para este usuário!')
                        setNext('')
                    }
                    else if(data.permissao=='Permitir'){
                        localStorage.setItem('idcoordenador', data.id)
                        localStorage.setItem('usernameCoordenador', data.nome)
                        setDanger('Acesso Permitido')
                        router.push('/coordenacao/inicio')
                        
                        
                    }
                    else if(data.permissao==null){
                        setDanger('A sua conta será avaliada pelo o Administrador')
                        setNext('')
                    }
                    
                })
                
            }
        }
   }
    const getAluno = async ()=>{
        await axios.get('http://localhost:5000/coordenador')
        .then((response)=>{
            setAluno(response.data)
           console.log(aluno)
        })
    }
    
    const [desabilitado, setDesabilitado] = React.useState(false)
    
    const [email, setEmail] = React.useState('');
    const [emailErr, setEmailErr] = React.useState(false);
    const [senha, setSenha] = React.useState('');
    const [senhaErr, setSenhaErr] = React.useState(false);
    const [type, setType]= React.useState('Password')
    const [btnOn, setBtn]=React.useState('Login_esconde__V2IYL')

    const showPassword = () => {
        if(type==='Text'){
            setType('Password')
            setBtn('Login_esconde__V2IYL')
        }
        else{
        setType('Text')
        setBtn('')
        }
    }
    const validate = () => {
        if(!validateEmail.test(email)){
            setEmailErr(true)
            setDesabilitado(true)
        }else{
            setEmailErr(false)
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
   
    return(
        <>
            <form className={style.sign_in_form+" " +style.form}>
                <h2 className={style.title + " " +style.h2}>Entrar</h2>
                <div className={style.input_field + " " +style.div}>
                    <i className={"bi-envelope-fill"+" "+ style.i}></i>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        className={style.input}
                        value={email}
                        onChange={(event) =>{
                            setNext('') 
                            setDanger('')
                            setEmail(event.target.value)
                            setEmailErr(false)
                            setDesabilitado(false)
                        }}
                        onBlur={validate}
                        required={true}

                        
                    />
                </div>
                {emailErr && <small className={style.error}>Por favor  digite um email válido</small>}

                <div className={style.input_field +" "+style.div}>
                <i className={"bi-lock-fill "+style.i}></i>
                <input 
                    type={type}
                    name="password" 
                    placeholder="Senha"
                    className={style.input}
                    minLength={8}
                    value={senha}
                    onChange={
                        (event) => {
                        setDanger('')
                        setNext('')
                        setSenha (event.target.value)
                        setSenhaErr(false)
                        setDesabilitado(false)}
                    } 
                    onBlur={validate}
                    required={true}
                />
                <i className={style.olhos+ " bi-eye-fill "+style.i} onClick={showPassword}></i>
                <i className={style.olhos+ " bi-eye-slash-fill "+style.i+" "+btnOn} onClick={showPassword}></i>
            </div>
            {senhaErr && <small className={style.error}>Pelo menos 6 digitos incluindo letras e numeros
                        </small>}
             <Label className="text-danger">{danger}</Label>   
             <Link href={next} className={style.btn+" "+ style.solid+" "+ style.input +" text-center p-2 text-decoration-none text-white"} onClick={cadastrar}>
                Logar
             </Link>
            </form>
        </>
    )
}

export default SignInForm