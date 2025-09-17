import React, { useState, useEffect } from "react";
import style from "../../../css/Login.module.css";
import { validateName, validateEmail, validateTelefone, validateBi, validatePassword } from "../../../../utils/regex";
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
  const [css, setCss] = useState(null);
  const [next, setNext] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('password');
  const [btnOn, setBtn] = useState('Login_esconde__V2IYL');
  const [desabilitado, setDesabilitado] = useState(false);

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
      } catch (err) {
        console.log(`Erro: solicitação negada (${ep})`);
      }
    }
    console.log(allData);
  };

  const handleChangeSexo = ({ target }) => setSexo(target.value);

  const deteta = (e) => {
    const code = e.charCode || e.which;
    if (code > 40 && code <= 62) e.preventDefault();
  };

  const detetaNum = (e) => {
    const code = e.charCode || e.which;
    if (code < 40 || code > 58) e.preventDefault();
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

  const showPassword = () => {
    if (type === 'text') {
      setType('password');
      setBtn('Login_esconde__V2IYL');
    } else {
      setType('text');
      setBtn('');
    }
  };

  const saverUser = async (e) => {
    e.preventDefault();
    if (nome && telefone && email && sexo && senha) {
      if (validateName.test(nome) && validateTelefone.test(telefone) && validateEmail.test(email) && validateBi.test(numbi) && validatePassword.test(senha)) {
        const fetchData = allData.filter(d => d.nome === nome || d.bi === numbi || d.email === email || d.telefone === telefone);
        if (fetchData.length === 0) {
          alert('Salvo com sucesso');
          await axios.post('http://localhost:5000/encarregado', {
            nome, telefone, email, bi: numbi, sexo, senha, tipo: 'encarregado'
          });
        } else {
          alert('Dados digitados já existem');
        }
      } else {
        alert('Dados inválidos!');
      }
    }
  };

  const ss = () => {
    if (!css && nome && !nomeErr && email && !emailErr && telefone && !telefoneErr) {
      setCss('Login_next3__EuJqb');
    }
  };

  const rs = () => setCss(null);

  return (
    <form className={`${style.sign_up_form} ${style.form} ${css}`} onSubmit={saverUser}>
      <h2 className={`${style.title} ${style.h2}`}>Cadastrar-se</h2>
      <div className={style.original}>
        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-person-fill ${style.i}`}></i>
          <input
            type="text"
            placeholder="Nome"
            className={`form-control ${style.input}`}
            value={nome}
            onKeyPress={deteta}
            onChange={(e) => setNome(e.target.value)}
            onBlur={validate}
            required
          />
        </div>
        {nomeErr && <small className="text-danger">Por favor digite nome válido</small>}

        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-envelope-fill ${style.i}`}></i>
          <input
            type="text"
            placeholder="Email"
            className={`form-control ${style.input}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            required
          />
        </div>
        {emailErr && <small className="text-danger">Por favor digite um email válido</small>}

        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-phone-fill ${style.i}`}></i>
          <input
            type="text"
            placeholder="Telefone"
            className={`form-control ${style.input}`}
            maxLength={11}
            minLength={9}
            value={telefone}
            onKeyPress={detetaNum}
            onChange={(e) => setTelefone(e.target.value)}
            onBlur={validate}
            required
          />
        </div>
        {telefoneErr && <small className="text-danger">Por favor digite número válido EX: '999-999-999'</small>}

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
            className={`form-control ${style.input}`}
            maxLength={14}
            value={numbi}
            onChange={(e) => setNumBi(e.target.value)}
            onBlur={validate}
            required
          />
        </div>
        {biErr && <small className="text-danger">Por favor digite numero do bilhete válido</small>}

        <div className={`${style.input_field} ${style.div}`}>
          <i className={`bi-lock-fill ${style.i}`}></i>
          <input
            type={type}
            placeholder="Senha"
            className={`form-control ${style.input}`}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onBlur={validate}
            required
          />
          <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
          <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
        </div>
        {senhaErr && <small className="text-danger">Pelo menos 6 dígitos incluindo letras e números</small>}

        <div className="mb-3">
          <label className="form-label">Sexo</label>
          <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" value="masculino" checked={sexo === 'masculino'} onChange={handleChangeSexo} />
              <label className="form-check-label">Masculino</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" value="feminino" checked={sexo === 'feminino'} onChange={handleChangeSexo} />
              <label className="form-check-label">Feminino</label>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Cadastrar</button>

        <div className={style.NextPrev}>
          <Image src={imgbtnCANCEL} className={`${style.prev} ${style.imgbtn}`} onClick={rs} />
        </div>
      </div>
    </form>
  );
}

export default Encarregado;
