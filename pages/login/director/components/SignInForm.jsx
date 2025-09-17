import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../../../utils/regex";
import style from "../../../css/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";

function SignInForm() {
  const router = useRouter();
  const [aluno, setAluno] = useState([]);
  const [danger, setDanger] = useState('');
  const [next, setNext] = useState('');

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaErr, setSenhaErr] = useState(false);
  const [type, setType] = useState('password');
  const [btnOn, setBtn] = useState('Login_esconde__V2IYL');

  useEffect(() => {
    const interval = setInterval(() => {
      getAluno();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getAluno = async () => {
    try {
      const response = await axios.get('http://localhost:5000/director');
      setAluno(response.data);
    } catch (err) {
      console.log('Erro ao buscar alunos', err);
    }
  };

  const cadastrar = () => {
    if(email && senha) {
      if(validateEmail.test(email) && validatePassword.test(senha)) {
        const search = aluno.filter((data) => data.email === email && data.senha === senha);
        if(search.length === 0){
          setDanger('Dados não encontrados!');
        }
        search.forEach((data) => {
          if(data.permissao === 'Recusar') {
            setDanger('Acesso negado para este usuário!');
            setNext('');
          } else if(data.permissao === 'Permitir') {
            localStorage.setItem('iddirector', data.id);
            localStorage.setItem('usernameDirector', data.nome);
            setDanger('Acesso Permitido');
            router.push('/director/inicio');
          } else if(data.permissao == null) {
            setDanger('A sua conta será avaliada pelo Administrador');
            setNext('');
          }
        });
      }
    }
  };

  const showPassword = () => {
    if(type === 'text'){
      setType('password');
      setBtn('Login_esconde__V2IYL');
    } else {
      setType('text');
      setBtn('');
    }
  };

  const validate = () => {
    setEmailErr(!validateEmail.test(email));
    setSenhaErr(!validatePassword.test(senha));
  };

  return (
    <form className={`${style.sign_in_form} ${style.form}`}>
      <h2 className={`${style.title} ${style.h2}`}>Entrar</h2>

      <div className={`${style.input_field} ${style.div}`}>
        <i className={`bi-envelope-fill ${style.i}`}></i>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={`form-control ${style.input}`}
          value={email}
          onChange={(e) => {
            setNext('');
            setDanger('');
            setEmail(e.target.value);
            setEmailErr(false);
          }}
          onBlur={validate}
          required
        />
      </div>
      {emailErr && <div className="text-danger small">Por favor digite um email válido</div>}

      <div className={`${style.input_field} ${style.div}`}>
        <i className={`bi-lock-fill ${style.i}`}></i>
        <input
          type={type}
          name="password"
          placeholder="Senha"
          className={`form-control ${style.input}`}
          minLength={8}
          value={senha}
          onChange={(e) => {
            setDanger('');
            setNext('');
            setSenha(e.target.value);
            setSenhaErr(false);
          }}
          onBlur={validate}
          required
        />
        <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
        <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
      </div>
      {senhaErr && <div className="text-danger small">Pelo menos 6 dígitos incluindo letras e números</div>}

      {danger && <div className="text-danger mb-2">{danger}</div>}

      <button
        type="button"
        className={`${style.btn} ${style.solid} ${style.input} btn btn-primary w-100`}
        onClick={cadastrar}
      >
        Logar
      </button>
    </form>
  );
}

export default SignInForm;
