import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";

import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/utils/regex";

function ModalSetting({ show, closed }) {
    const [desabilitado, setDesabilitado] = useState(false);
    const [check, setCheck] = useState(true);
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
    const router = useRouter();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const id = localStorage.getItem('idcoordenador');
            const res = await axios.get(`http://localhost:5000/coordenador/${id}`);
            setNome(res.data.nome);
            setEmail(res.data.email);
            setNumBi(res.data.bi);
            setTelefone(res.data.telefone);
            setSenha(res.data.senha);
            setArea(res.data.area || '');
        } catch (err) {
            console.log(err);
        }
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

    const save = async () => {
        const id = localStorage.getItem('idcoordenador');
        if (!desabilitado && nome && telefone && numbi && area && email && senha) {
            await axios.patch(`http://localhost:5000/coordenador/${id}`, {
                nome, telefone, bi: numbi, area, email, sexo, senha
            });
            window.location.reload();
        }
    };

    const deteta = (e) => {
        const code = e.charCode || e.which;
        if (code > 40 && code <= 62) e.preventDefault();
    };

    const detetaNum = (e) => {
        const code = e.charCode || e.which;
        if (code < 40 || code > 58) e.preventDefault();
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Dados</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control mb-2 ${nomeErr ? 'is-invalid' : ''}`}
                                placeholder="Nome"
                                value={nome}
                                readOnly={check}
                                onChange={(e) => setNome(e.target.value)}
                                onKeyPress={deteta}
                                onBlur={validate}
                            />
                            {nomeErr && <div className="invalid-feedback">Por favor digite um nome válido</div>}

                            <input
                                type="email"
                                className={`form-control mb-2 ${emailErr ? 'is-invalid' : ''}`}
                                placeholder="Email"
                                value={email}
                                readOnly={check}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={validate}
                            />
                            {emailErr && <div className="invalid-feedback">Por favor digite um email válido</div>}

                            <input
                                type="text"
                                className={`form-control mb-2 ${telefoneErr ? 'is-invalid' : ''}`}
                                placeholder="Telefone"
                                maxLength={11}
                                minLength={9}
                                value={telefone}
                                readOnly={check}
                                onChange={(e) => setTelefone(e.target.value)}
                                onKeyPress={detetaNum}
                                onBlur={validate}
                            />
                            {telefoneErr && <div className="invalid-feedback">Número inválido. Ex: 999-999-999</div>}

                            <input
                                type="text"
                                className={`form-control mb-2 ${biErr ? 'is-invalid' : ''}`}
                                placeholder="Bilhete de Identidade"
                                maxLength={14}
                                value={numbi}
                                readOnly={check}
                                onChange={(e) => setNumBi(e.target.value)}
                                onBlur={validate}
                            />
                            {biErr && <div className="invalid-feedback">Número de BI inválido</div>}

                            <select
                                className="form-select mb-2"
                                value={area}
                                disabled={check}
                                onChange={(e) => setArea(e.target.value)}
                            >
                                <option value="">Selecione a área</option>
                                <option value="construcao_civil">Construção Civil</option>
                                <option value="eletricidade">Eletricidade</option>
                                <option value="informatica">Informática</option>
                                <option value="mecanica">Mecanica</option>
                                <option value="quimica">Química</option>
                            </select>

                            <input
                                type="password"
                                className={`form-control mb-2 ${senhaErr ? 'is-invalid' : ''}`}
                                placeholder="Senha"
                                value={senha}
                                maxLength={8}
                                readOnly={check}
                                onChange={(e) => setSenha(e.target.value)}
                                onBlur={validate}
                            />
                            {senhaErr && <div className="invalid-feedback">Senha deve conter 8 dígitos, incluindo letra maiúscula e número</div>}

                            <div className="mb-2">
                                <p>Sexo</p>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="sexo"
                                        value="masculino"
                                        disabled={check}
                                        checked={sexo === 'masculino'}
                                        onChange={(e) => setSexo(e.target.value)}
                                    />
                                    <label className="form-check-label">Masculino</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="sexo"
                                        value="feminino"
                                        disabled={check}
                                        checked={sexo === 'feminino'}
                                        onChange={(e) => setSexo(e.target.value)}
                                    />
                                    <label className="form-check-label">Feminino</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={save}>Salvar</button>
                        <button className="btn btn-secondary" onClick={() => setCheck(false)}>Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalSetting;
