import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../../../utils/regex";
import style from "../../../css/Login.module.css";
import { useRouter } from "next/router";
import axios from "axios";

function SignInForm() {
  const router = useRouter();
  const [alunos, setAlunos] = useState([]);
  const [danger, setDanger] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaErr, setSenhaErr] = useState(false);
  const [type, setType] = useState('password');
  const [btnOn, setBtn] = useState('Login_esconde__V2IYL');

  // Busca coordenadores uma vez ao montar o componente
  useEffect(() => {
    getAlunos();
  }, []);

  const getAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/coordenador');
      setAlunos(response.data);
    } catch (err) {
      console.log('Erro ao buscar coordenadores:', err);
    }
  };

  const cadastrar = () => {
    if (!email || !senha) return;

    if (!validateEmail.test(email) || !validatePassword.test(senha)) return;

    const usuario = alunos.find(a => a.email === email && a.senha === senha);

    if (!usuario) {
      setDanger('Dados não encontrados!');
      return;
    }

    switch (usuario.permissao) {
      case 'Recusar':
        setDanger('Acesso negado para este usuário!');
        break;
      case 'Permitir':
        localStorage.setItem('idcoordenador', usuario.id);
        localStorage.setItem('usernameCoordenador', usuario.nome);
        setDanger('Acesso Permitido');
        router.push('/coordenacao/inicio');
        break;
      default:
        setDanger('A sua conta será avaliada pelo Administrador');
        break;
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

  const validateFields = () => {
    setEmailErr(!validateEmail.test(email));
    setSenhaErr(!validatePassword.test(senha));
  };

  return (
    <form className={`${style.sign_in_form} ${style.form}`} onSubmit={e => e.preventDefault()}>
      <h2 className={`${style.title} ${style.h2}`}>Entrar</h2>

      <div className={`${style.input_field} ${style.div}`}>
        <i className={`bi-envelope-fill ${style.i}`}></i>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className={style.input}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setEmailErr(false);
            setDanger('');
          }}
          onBlur={validateFields}
          required
        />
      </div>
      {emailErr && <small className={style.error}>Por favor digite um email válido</small>}

      <div className={`${style.input_field} ${style.div}`}>
        <i className={`bi-lock-fill ${style.i}`}></i>
        <input
          type={type}
          name="password"
          placeholder="Senha"
          className={style.input}
          value={senha}
          onChange={e => {
            setSenha(e.target.value);
            setSenhaErr(false);
            setDanger('');
          }}
          onBlur={validateFields}
          minLength={6}
          required
        />
        <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
        <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
      </div>
      {senhaErr && <small className={style.error}>Pelo menos 6 dígitos, incluindo letras e números</small>}

      <div>
        <button
          type="button"
          className={`${style.btn} ${style.solid} ${style.input} text-center p-2 text-white`}
          onClick={cadastrar}
        >
          Logar
        </button>
      </div>

      {danger && <div className="text-danger mt-2">{danger}</div>}
    </form>
  );
}

export default SignInForm;
