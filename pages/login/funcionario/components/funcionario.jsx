import style from "../../../css/Login.module.css";
import { validateName, validateEmail, validateTelefone, validateBi, validatePassword } from "../../../../utils/regex";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import imgbtn from '../../images/next_page_50px.png';
import imgbtnCANCEL from '../../images/cancel_50px.png';

let allData = [];

function Encarregado() {
  const [nome, setNome] = useState('');
  const [nomeErr, setNomeErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [telefoneErr, setTelefoneErr] = useState(false);
  const [numbi, setNumBi] = useState('');
  const [biErr, setBiErr] = useState(false);
  const [senha, setSenha] = useState('');
  const [senhaErr, setSenhaErr] = useState(false);
  const [sexo, setSexo] = useState('masculino');
  const [desabilitado, setDesabilitado] = useState(false);
  const [css, setCss] = useState(null);
  const [type, setType] = useState('password');
  const [btnOn, setBtn] = useState('Login_esconde__V2IYL');
  const [error, setError] = useState('');
  const [next, setNext] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    allData = [];
    const endpoints = ['aluno', 'coordenador', 'director', 'encarregado', 'funcionario'];
    for (const ep of endpoints) {
      try {
        const res = await axios.get(`http://localhost:5000/${ep}`);
        allData.push(...res.data);
      } catch {
        console.log(`Erro: solicitação negada ${ep}`);
      }
    }
    console.log(allData);
  };

  const handleChangue = ({ target }) => setSexo(target.value);

  const deteta = (e) => {
    const Code = e.charCode || e.which;
    if (Code > 40 && Code <= 62) e.preventDefault();
  };

  const detetaNum = (e) => {
    const Code = e.charCode || e.which;
    if (Code < 40 || Code > 58) e.preventDefault();
  };

  const validate = () => {
    setNomeErr(!validateName.test(nome));
    setEmailErr(!validateEmail.test(email));
    setTelefoneErr(!validateTelefone.test(telefone));
    setBiErr(!validateBi.test(numbi));
    setSenhaErr(!validatePassword.test(senha));
    setDesabilitado(
      !validateName.test(nome) ||
      !validateEmail.test(email) ||
      !validateTelefone.test(telefone) ||
      !validateBi.test(numbi) ||
      !validatePassword.test(senha)
    );
  };

  const saverUser = async (e) => {
    e.preventDefault();
    if (nome && telefone && email && sexo && senha) {
      if (validateName.test(nome) && validateTelefone.test(telefone) && validateEmail.test(email) && validateBi.test(numbi) && validatePassword.test(senha)) {
        const fetchData = allData.filter(d => d.nome === nome || d.bi === numbi || d.email === email || d.telefone === telefone);
        if (fetchData.length === 0) {
          alert('Salvo com sucesso');
          await axios.post('http://localhost:5000/funcionario', {
            nome, telefone, email, bi: numbi, sexo, senha, tipo: 'secretaria'
          });
        } else {
          alert('Dados digitados já existem');
        }
      } else {
        alert('Dados inválidos!');
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

  const ss = () => {
    if (!css && nome && !nomeErr && email && !emailErr && telefone && !telefoneErr) setCss('Login_next3__EuJqb');
  };

  const rs = () => {
    if (css === 'Login_next3__EuJqb') setCss(null);
  };

  return (
    <form className={`${style.sign_up_form} ${style.form} ${css}`} onSubmit={saverUser}>
      <h2 className={`${style.title} ${style.h2}`}>Cadastrar-se</h2>

      <div className={style.original}>
        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-person-fill ${style.i}`}></i>
          <input
            type="text"
            placeholder="Nome"
            className="form-control"
            value={nome}
            onKeyPress={deteta}
            onChange={e => { setNome(e.target.value); setNomeErr(false); setDesabilitado(false); }}
            onBlur={validate}
            required
          />
          {nomeErr && <small className="text-danger">Por favor digite nome válido</small>}
        </div>

        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-envelope-fill ${style.i}`}></i>
          <input
            type="text"
            placeholder="Email"
            className="form-control"
            value={email}
            onChange={e => { setEmail(e.target.value); setEmailErr(false); setDesabilitado(false); }}
            onBlur={validate}
            required
          />
          {emailErr && <small className="text-danger">Por favor digite um email válido</small>}
        </div>

        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-phone-fill ${style.i}`}></i>
          <input
            type="text"
            placeholder="Telefone"
            className="form-control"
            maxLength={11}
            minLength={9}
            value={telefone}
            onKeyPress={detetaNum}
            onChange={e => { setTelefone(e.target.value); setTelefoneErr(false); setDesabilitado(false); }}
            onBlur={validate}
            required
          />
          {telefoneErr && <small className="text-danger">Por favor digite número válido EX: 999-999-999</small>}
        </div>

        <div className={style.NextPrev}>
          <Image src={imgbtn} className={`${style.next} ${style.imgbtn}`} onClick={ss} />
        </div>
      </div>

      <div className={style.prosseguir3}>
        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-card-heading ${style.i}`}></i>
          <input
            type="text"
            placeholder="Bilhete de identidade"
            className="form-control"
            maxLength={14}
            value={numbi}
            onChange={e => { setNumBi(e.target.value); setBiErr(false); setDesabilitado(false); }}
            onBlur={validate}
            required
          />
          {biErr && <small className="text-danger">Por favor digite numero do bilhete válido</small>}
        </div>

        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-lock-fill ${style.i}`}></i>
          <input
            type={type}
            placeholder="Senha"
            className="form-control"
            value={senha}
            onChange={e => { setSenha(e.target.value); setSenhaErr(false); setDesabilitado(false); }}
            onBlur={validate}
            required
          />
          <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
          <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
          {senhaErr && <small className="text-danger">Pelo menos 6 dígitos incluindo letras e números</small>}
        </div>

        <div className="gender-field div" onChange={e => setSexo(e.target.value)}>
          <p>Sexo</p>
          <div className="radio-field div">
            <label htmlFor="masculino">Masculino</label>
            <input type="radio" id="masculino" value="masculino" checked={sexo === 'masculino'} onChange={handleChangue} />
            <label htmlFor="feminino" className="mx-2">Feminino</label>
            <input type="radio" id="feminino" value="feminino" checked={sexo === 'feminino'} onChange={handleChangue} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">Cadastrar</button>

        <div className={style.NextPrev}>
          <Image src={imgbtnCANCEL} className={`${style.prev} ${style.imgbtn}`} onClick={rs} />
        </div>
      </div>
    </form>
  );
}

export default Encarregado;
