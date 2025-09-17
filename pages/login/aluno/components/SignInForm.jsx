import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../../../utils/regex";
import style from "../../../css/Login.module.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import io from "socket.io-client";

const socket = io('http://localhost:5000');

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
    const [btnOn, setBtn] = useState('d-none');
    const [desabilitado, setDesabilitado] = useState(false);

    useEffect(() => {
        const interval = setInterval(getAluno, 1000);
        return () => clearInterval(interval);
    }, []);

    const getAluno = async () => {
        try {
            const response = await axios.get('http://localhost:5000/aluno');
            setAluno(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const cadastrar = async () => {
        try {
            if (email && senha) {
                if (validateEmail.test(email) && validatePassword.test(senha)) {
                    const search = aluno.filter(data => data.email === email && data.senha === senha);

                    if (search.length === 0) {
                        setDanger('Dados não encontrados!');
                        return;
                    }

                    for (const data of search) {
                        if (data.permissao === 'Recusar') {
                            setDanger('Acesso negado para este usuário!');
                            setNext('');
                        } else if (data.permissao === 'Permitir') {
                            localStorage.setItem('idaluno', data.id);
                            localStorage.setItem('usernameAluno', data.nome);
                            setDanger('Acesso Permitido');
                            router.push('/aluno/inicio');

                            try {
                                const coord = await axios.get('http://localhost:5000/coordenador');
                                const filtered = coord.data.filter(dado => dado.area === data.area);
                                localStorage.setItem('coordenador', filtered[0]?.id);
                            } catch (err) { console.log(err); }

                            try {
                                const director = await axios.get('http://localhost:5000/director');
                                localStorage.setItem('director', director.data[0]?.id);
                            } catch (err) { console.log(err); }

                        } else if (data.permissao == null) {
                            setDanger('A sua conta será avaliada pelo Administrador');
                            setNext('');
                        }
                    }
                }
            }
        } catch (err) {
            console.log(err);
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={style.input}
                    value={email}
                    onChange={e => {
                        setNext('');
                        setDanger('');
                        setEmail(e.target.value);
                        setEmailErr(false);
                        setDesabilitado(false);
                    }}
                    onBlur={validateFields}
                    required
                />
            </div>
            {emailErr && <small className="text-danger">Por favor digite um email válido</small>}

            <div className={`${style.input_field} ${style.div}`}>
                <i className={`bi-lock-fill ${style.i}`}></i>
                <input
                    type={type}
                    name="password"
                    placeholder="Senha"
                    className={style.input}
                    minLength={8}
                    value={senha}
                    onChange={e => {
                        setDanger('');
                        setNext('');
                        setSenha(e.target.value);
                        setSenhaErr(false);
                        setDesabilitado(false);
                    }}
                    onBlur={validateFields}
                    required
                />
                <i className={`${style.olhos} bi-eye-fill ${style.i}`} onClick={showPassword}></i>
                <i className={`${style.olhos} bi-eye-slash-fill ${style.i} ${btnOn}`} onClick={showPassword}></i>
            </div>
            {senhaErr && <small className="text-danger">Pelo menos 6 dígitos, incluindo letras e números</small>}

            {danger && <div className="text-danger my-2">{danger}</div>}

            <button
                type="button"
                className={`btn btn-primary w-100 mt-3 ${style.input}`}
                onClick={cadastrar}
                disabled={desabilitado}
            >
                Logar
            </button>
        </form>
    );
}

export default SignInForm;
