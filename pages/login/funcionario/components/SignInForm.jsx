import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../../../utils/regex";
import style from "../../../css/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const [funcionario, setFuncionario] = useState([]);
  const [danger, setDanger] = useState('');
  const [next, setNext] = useState('');

  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaErr, setSenhaErr] = useState(false);
  const [type, setType] = useState('password');
  const [btnOn, setBtn] = useState('Login_esconde__V2IYL');

  const [desabilitado, setDesabilitado] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      getFuncionario();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getFuncionario = async () => {
    try {
      const response = await axios.get('http://localhost:5000/funcionario');
      setFuncionario(response.data);
    } catch (error) {
      console.log("Erro ao buscar funcionários:", error);
    }
  };

  const cadastrar = (email, senha) => {
    if (email && senha) {
      if (validateEmail.test(email) && validatePassword.test(senha)) {
        const search = funcionario.filter(data => data.email === email && data.senha === senha);
        if (search.length === 0) {
          setDanger('Dados não encontrados!');
          setNext('');
        } else {
          search.forEach(data => {
            if (data.permissao === 'Recusar') {
              setDanger('Acesso negado para este usuário!');
              setNext('');
            } else if (data.permissao === 'Permitir') {
              localStorage.setItem('idfuncionario', data.id);
              localStorage.setItem('usernameFuncionario', data.nome);
              setDanger('Acesso Permitido');
              router.push('/funcionario/inicio');
            } else if (data.permissao == null) {
              setDanger('A sua conta será avaliada pelo Administrador');
              setNext('');
            }
          });
        }
      }
    }
  };

  const showPassword = () => {
    if (type === 'text') {
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
    setDesabilitado(!validateEmail.test(email) || !validatePassword.test(senha));
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
          className={style.input}
          value={email}
          onChange={e => { setEmail(e.target.value); setEmailErr(false); setDesabilitado(false); setDanger(''); setNext(''); }}
          onBlur={validate}
          required
        />
      </div>
      {emailErr && <small className="text-danger">Por favor, digite um email válido</small>}

      <div className={`${style.input_field} ${style.div}`}>
        <i className={`bi-lock-fill ${style.i}`}></i>
        <input
          type={type}
          name="password"
          placeholder="Senha"
          className={style.input}
          minLength={8}
          value={senha}
          onChange={e => { setSenha(e.target.value); setSenhaErr(false); setDesabilitado(false); setDanger(''); setNext(''); }}
          onBlur={validate}
          required
        />
        <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
        <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
      </div>
      {senhaErr && <small className="text-danger">Pelo menos 6 dígitos, incluindo letras e números</small>}

      {danger && <p className="text-danger">{danger}</p>}

      <Link
        href={next || '#'}
        className={`${style.btn} ${style.solid} ${style.input} text-center p-2 text-decoration-none text-white`}
        onClick={() => cadastrar(email, senha)}
      >
        Logar
      </Link>
    </form>
  );
}

export default SignInForm;
