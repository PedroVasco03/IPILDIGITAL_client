import style from "../../../css/Login.module.css";
import style2 from "../../../css/Prosseguir.module.css";
import { validateName, validateEmail, validateTelefone, validateBi, validatePassword } from "../../../../utils/regex";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Image from "next/image";
import imgbtn from '../../images/next_page_50px.png';
import imgbtnB from '../../images/back_page_50px.png';
import imgbtnCANCEL from '../../images/cancel_50px.png';
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');
let allData = [];

function Aluno() {
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
    const [curso, setCurso] = useState('');
    const [area, setArea] = useState('');
    const [classe, setClasse] = useState('');
    const [turma, setTurma] = useState('');
    const [numprocesso, setNumProcesso] = useState('');
    const [next, setNext] = useState('');
    const [error, setError] = useState('');
    const [css, setCss] = useState(null);
    const [update, setUpdate] = useState([]);
    const [upadate, setUpadate] = useState([]);
    const [type, setType] = useState('password');
    const [btnOn, setBtn] = useState('d-none');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        allData = [];
        const urls = ['aluno', 'coordenador', 'director', 'encarregado', 'funcionario'];
        for (let url of urls) {
            try {
                const res = await axios.get(`http://localhost:5000/${url}`);
                allData.push(...res.data);
            } catch {
                console.log('erro: solicitação negada');
            }
        }
    };

    const handleChangeSexo = (e) => setSexo(e.target.value);

    const deteta = (e) => {
        const code = e.charCode || e.which;
        if (code > 40 && code <= 62) e.preventDefault();
    };

    const detetaNum = (e) => {
        const code = e.charCode || e.which;
        if (code < 40 || code > 58) e.preventDefault();
    };

    const validateFields = () => {
        setNomeErr(!validateName.test(nome));
        setEmailErr(!validateEmail.test(email));
        setTelefoneErr(!validateTelefone.test(telefone));
        setBiErr(!validateBi.test(numbi));
        setSenhaErr(!validatePassword.test(senha));
        setDesabilitado(
            !validateName.test(nome) || !validateEmail.test(email) ||
            !validateTelefone.test(telefone) || !validateBi.test(numbi) ||
            !validatePassword.test(senha)
        );
    };

    const saverUser = async () => {
        if (nome && telefone && email && sexo && senha && area && curso && classe) {
            if (validateName.test(nome) && validateTelefone.test(telefone) &&
                validateEmail.test(email) && validateBi.test(numbi) && validatePassword.test(senha)) {
                const fetchData = allData.filter((data) =>
                    data.nome === nome || data.bi === numbi || data.email === email || data.telefone === telefone
                );
                if (fetchData.length === 0) {
                    await axios.post('http://localhost:5000/aluno', {
                        nome, bi: numbi, area, curso, turma, classe,
                        numeroprocesso: numprocesso, telefone, email, sexo, senha, tipo: 'aluno'
                    });
                    socket.emit('register', nome);
                    alert('Dados salvos com sucesso!');
                    window.location.reload();
                } else {
                    setNext('');
                    setError('Dados digitados já existem');
                }
            } else {
                alert('Dados inválidos!');
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

    const filterArea = (dado) => {
        const areas = {
            construcao_civil: { areaFormacao: ['Desenhador Projetista', 'Técnico de Obras'], course: ['CP', 'CC'] },
            eletricidade: { areaFormacao: ['Energia e Instalações Elétricas', 'Electrónica e Automação', 'Electrónica e Telecomunicações', 'Energias Renováveis'], course: ['EI', 'EA', 'ET', 'ER'] },
            informatica: { areaFormacao: ['Técnico de Informática', 'Técnico de Gestão de Informática'], course: ['II', 'IG'] },
            mecanica: { areaFormacao: ['Mecatrónica', 'Frio e Climatização', 'Electromecânica', 'Máquinas e Motores', 'Mecatrónica Autómovel', 'Metalomecânica'], course: ['MC', 'MF', 'ME', 'MM', 'MV', 'MT'] },
            quimica: { areaFormacao: ['Ambiente e Controle de Dados', 'Química Industrial', 'Petroquímica', 'Bioquímica', 'Técnico de Técnicas de Laboratório'], course: ['QA', 'QI', 'QP', 'QB', 'QT'] }
        };
        if (areas[dado]) {
            setUpdate(areas[dado].areaFormacao);
            setUpadate(areas[dado].course);
        }
    };

    const nextStep = () => {
        if (!css && nome && email && telefone && !nomeErr && !emailErr && !telefoneErr) setCss('Login_next1__SIHIv');
        else if (css === 'Login_next1__SIHIv' && area && numprocesso && numbi && !biErr) setCss('Login_next2__Iv6K6');
        else if (css === 'Login_next2__Iv6K6' && curso && classe && turma) setCss('Login_next3__EuJqb');
    };

    const prevStep = () => {
        if (css === 'Login_next2__Iv6K6') setCss('Login_next1__SIHIv');
        else if (css === 'Login_next1__SIHIv') setCss(null);
        else if (css === 'Login_next3__EuJqb') setCss('Login_next2__Iv6K6');
    };

    return (
        <form className={`${style.sign_up_form} ${style.form} ${css}`}>
            <h2 className={`${style.title} ${style.h2}`}>Cadastrar-se</h2>

            {/* Passo 1 */}
            <div className={style.original}>
                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-person-fill ${style.i}`}></i>
                    <input type="text" placeholder="Nome" className={style.input} value={nome} onChange={e => { setNome(e.target.value); setNomeErr(false); }} onKeyPress={deteta} onBlur={validateFields} required />
                </div>
                {nomeErr && <small className="text-danger">Por favor digite nome válido</small>}

                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-envelope-fill ${style.i}`}></i>
                    <input type="email" placeholder="Email" className={style.input} value={email} onChange={e => { setEmail(e.target.value); setEmailErr(false); }} onBlur={validateFields} required />
                </div>
                {emailErr && <small className="text-danger">Por favor digite um email válido</small>}

                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-phone-fill ${style.i}`}></i>
                    <input type="text" placeholder="Telefone" className={style.input} value={telefone} maxLength={11} onChange={e => { setTelefone(e.target.value); setTelefoneErr(false); }} onKeyPress={detetaNum} onBlur={validateFields} required />
                </div>
                {telefoneErr && <small className="text-danger">Por favor digite número válido EX: 999-999-999</small>}

                <div className={style.NextPrev}>
                    <Image src={imgbtn} className={`${style.next} ${style.imgbtn}`} onClick={nextStep} />
                </div>
            </div>

            {/* Passo 2 */}
            <div className={`${style.div} ${style.prosseguir1}`}>
                <div className={`${style.input_field} ${style.div}`}>
                    <i className={`bi-card-heading ${style.i}`}></i>
                    <input type="text" placeholder="Bilhete de identidade" className={style.input} value={numbi} onChange={e => { setNumBi(e.target.value); setBiErr(false); }} onBlur={validateFields} maxLength={14} required />
                </div>
                {biErr && <small className="text-danger">Por favor digite numero do bilhete válido</small>}

                <div className={`${style2.input_field} ${style2.div}`}>
                    <i className="bi-123"></i>
                    <input type="number" placeholder="Número de Processo" className={style2.input} value={numprocesso} onChange={e => setNumProcesso(e.target.value)} required />
                </div>
                {numprocesso === '' && <small className="text-danger">Por favor preencha este campo</small>}

                <div className={`${style2.input_field} ${style2.div}`}>
                    <i className="bi-text-paragraph"></i>
                    <select value={area} className={`${style2.select} ${style2.input}`} onChange={e => { setArea(e.target.value); filterArea(e.target.value); }} required>
                        <option value="" disabled>Selecione a área</option>
                        <option value="construcao_civil">Construção Civil</option>
                        <option value="eletricidade">Eletricidade</option>
                        <option value="informatica">Informática</option>
                        <option value="mecanica">Mecanica</option>
                        <option value="quimica">Química</option>
                    </select>
                </div>

                <div className={style.NextPrev}>
                    <Image src={imgbtnB} className={`${style.prev} ${style.imgbtn}`} onClick={prevStep} />
                    <Image src={imgbtn} className={`${style.next} ${style.imgbtn}`} onClick={nextStep} />
                </div>
            </div>

            {/* Passo 3 */}
            <div className={style.prosseguir2}>
                <div className={`${style2.input_field} ${style2.div}`}>
                    <i className="bi-bar-chart-steps"></i>
                    <select className={`${style2.select} ${style2.input}`} value={curso} onChange={e => setCurso(e.target.value)} required>
                        <option value="" disabled>Selecione o Curso</option>
                        {update.map((item, index) => <option key={index} value={upadate[index]}>{item}</option>)}
                    </select>
                </div>

                <div className={`${style2.input_field} ${style2.div}`}>
                    <i className="bi-text-indent-right"></i>
                    <select className={`${style2.select} ${style2.input}`} value={classe} onChange={e => setClasse(e.target.value)} required>
                        <option value="" disabled>Selecione a classe</option>
                        <option value="10">10ª classe</option>
                        <option value="11">11ª classe</option>
                        <option value="12">12ª classe</option>
                        <option value="13">13ª classe</option>
                    </select>
                </div>

                <div className={`${style2.input_field} ${style2.div}`}>
                    <i className="bi-person-lines-fill"></i>
                    <select className={`${style2.select} ${style2.input}`} value={turma} onChange={e => setTurma(e.target.value)} required>
                        <option value="" disabled>Selecione a turma</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>

                <div className={style.NextPrev}>
                    <Image src={imgbtnB} className={`${style.prev} ${style.imgbtn}`} onClick={prevStep} />
                    <Image src={imgbtn} className={`${style.next} ${style.imgbtn}`} onClick={nextStep} />
                </div>
            </div>

            {/* Passo 4 */}
            <div className={style.prosseguir3}>
                <div className={`${style.input_field} ${style.div}`}>
                    <i className="bi-lock-fill"></i>
                    <input type={type} placeholder="Senha" className={style.input} minLength={8} value={senha} onChange={e => { setSenha(e.target.value); setSenhaErr(false); }} onBlur={validateFields} required />
                    <i className={`${style.olhos} bi-eye-fill`} onClick={showPassword}></i>
                    <i className={`${style.olhos} bi-eye-slash-fill ${btnOn}`} onClick={showPassword}></i>
                </div>
                {senhaErr && <small className="text-danger">Pelo menos 6 digitos incluindo letras e numeros</small>}

                <div className="gender-field div">
                    <p>Sexo</p>
                    <div className="radio-field div">
                        <label htmlFor="masculino">Masculino</label>
                        <input type="radio" value="masculino" id="masculino" checked={sexo === 'masculino'} onChange={handleChangeSexo} className="mx-1" />
                        <label htmlFor="feminino" className="mx-2">Feminino</label>
                        <input type="radio" value="feminino" id="feminino" checked={sexo === 'feminino'} onChange={handleChangeSexo} className="mx-1" />
                    </div>
                </div>

                {error && <div className="text-danger">{error}</div>}

                <button type="button" className="btn btn-primary mt-2" onClick={saverUser}>Cadastrar</button>

                <div className={style.NextPrev}>
                    <Image src={imgbtnCANCEL} className={`${style.prev} ${style.imgbtn}`} onClick={prevStep} />
                </div>
            </div>
        </form>
    );
}

export default Aluno;
