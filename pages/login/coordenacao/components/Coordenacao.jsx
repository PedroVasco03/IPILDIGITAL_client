import React, { useEffect, useState } from "react";
import style from "../../../css/Login.module.css";
import { validateName, validateEmail, validateTelefone, validateBi, validatePassword } from "../../../../utils/regex";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import imgbtn from '../../images/next_page_50px.png';
import imgbtnB from '../../images/back_page_50px.png';
import imgbtnCANCEL from '../../images/cancel_50px.png';

let allData = [];

function Coordenacao() {
    const [css, setCss] = useState(null);
    const [next, setNext] = useState('');
    const [desabilitado, setDesabilitado] = useState(false);
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
    const [area, setArea] = useState('');
    const [error, setError] = useState('');
    const [type, setType] = useState('password');
    const [btnOn, setBtn] = useState('d-none');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        allData = [];
        const endpoints = ['aluno', 'coordenador', 'director', 'encarregado', 'funcionario'];
        for (const endpoint of endpoints) {
            try {
                const response = await axios.get(`http://localhost:5000/${endpoint}`);
                allData.push(...response.data);
            } catch (err) {
                console.log(`Erro ao buscar ${endpoint}: ${err}`);
            }
        }
    };

    const showPassword = () => {
        if (type === 'text') {
            setType('password');
            setBtn('d-none');
        } else {
            setType('text');
            setBtn('');
        }
    };

    const validateFields = () => {
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
        validateFields();

        if (nome && email && telefone && sexo && senha && area &&
            !nomeErr && !emailErr && !telefoneErr && !biErr && !senhaErr) {

            const fetchData = allData.filter(
                data => data.nome === nome || data.bi === numbi || data.email === email || data.telefone === telefone
            );

            if (fetchData.length === 0) {
                try {
                    await axios.post('http://localhost:5000/coordenador', {
                        nome,
                        area,
                        telefone,
                        email,
                        bi: numbi,
                        sexo,
                        senha,
                        tipo: 'coordenador'
                    });
                    alert('Salvo com sucesso!');
                } catch (err) {
                    console.log('Erro ao salvar:', err);
                    alert('Erro ao salvar dados!');
                }
            } else {
                alert('Dados digitados já existem');
            }
        } else {
            alert('Dados inválidos!');
        }
    };

    const nextStep = () => {
        if (!css) {
            if (nome && !nomeErr && email && !emailErr && telefone && !telefoneErr) setCss('Login_next1__SIHIv');
        } else if (css === 'Login_next1__SIHIv') {
            if (area && !biErr && numbi) setCss('Login_next3__EuJqb');
        }
    };

    const prevStep = () => setCss(null);

    return (
        <form className={`${style.sign_up_form} ${style.form} ${css}`} onSubmit={saverUser}>
            <h2 className={`${style.title} ${style.h2}`}>Cadastrar-se</h2>

            {/* Etapa 1 */}
            <div className={style.original}>
                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-person-fill ${style.i}`}></i>
                    <input
                        type="text"
                        placeholder="Nome"
                        className={style.input}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        onBlur={validateFields}
                        required
                    />
                    {nomeErr && <small className={style.error}>Nome inválido</small>}
                </div>

                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-envelope-fill ${style.i}`}></i>
                    <input
                        type="email"
                        placeholder="Email"
                        className={style.input}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onBlur={validateFields}
                        required
                    />
                    {emailErr && <small className={style.error}>Email inválido</small>}
                </div>

                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-phone-fill ${style.i}`}></i>
                    <input
                        type="text"
                        placeholder="Telefone"
                        className={style.input}
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        onBlur={validateFields}
                        required
                    />
                    {telefoneErr && <small className={style.error}>Telefone inválido</small>}
                </div>

                <div className={style.NextPrev}>
                    <Image src={imgbtn} className={style.next + " " + style.imgbtn} onClick={nextStep} />
                </div>
            </div>

            {/* Etapa 2 */}
            <div className={`${style.div} ${style.prosseguir1}`}>
                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-card-heading ${style.i}`}></i>
                    <input
                        type="text"
                        placeholder="Bilhete de identidade"
                        className={style.input}
                        value={numbi}
                        onChange={e => setNumBi(e.target.value)}
                        onBlur={validateFields}
                        required
                    />
                    {biErr && <small className={style.error}>BI inválido</small>}
                </div>

                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-text-paragraph ${style.i}`}></i>
                    <select
                        className={`${style.select} ${style.input}`}
                        value={area}
                        onChange={e => setArea(e.target.value)}
                        required
                    >
                        <option disabled value="">Selecione a área</option>
                        <option value="construcao_civil">Construção Civil</option>
                        <option value="eletricidade">Eletricidade</option>
                        <option value="informatica">Informática</option>
                        <option value="mecanica">Mecânica</option>
                        <option value="quimica">Química</option>
                    </select>
                </div>

                <div className={style.NextPrev}>
                    <Image src={imgbtnB} className={style.prev + " " + style.imgbtn} onClick={prevStep} />
                    <Image src={imgbtn} className={style.next + " " + style.imgbtn} onClick={nextStep} />
                </div>
            </div>

            {/* Etapa 3 */}
            <div className={style.prosseguir3}>
                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-lock-fill ${style.i}`}></i>
                    <input
                        type={type}
                        placeholder="Senha"
                        className={style.input}
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        onBlur={validateFields}
                        required
                    />
                    <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
                    <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
                    {senhaErr && <small className={style.error}>Senha inválida</small>}
                </div>

                <div className="gender-field div">
                    <p>Sexo</p>
                    <div className="radio-field div">
                        <label htmlFor="masculino">Masculino</label>
                        <input type="radio" value="masculino" id="masculino" checked={sexo === 'masculino'} onChange={e => setSexo(e.target.value)} />
                        <label htmlFor="feminino" className="mx-2">Feminino</label>
                        <input type="radio" value="feminino" id="feminino" checked={sexo === 'feminino'} onChange={e => setSexo(e.target.value)} />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Cadastrar</button>

                <div className={style.NextPrev}>
                    <Image src={imgbtnCANCEL} className={style.prev + " " + style.imgbtn} onClick={prevStep} />
                </div>
            </div>
        </form>
    );
}

export default Coordenacao;
