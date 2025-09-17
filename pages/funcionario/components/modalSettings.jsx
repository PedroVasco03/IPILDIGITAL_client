import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/utils/regex";

function ModalSetting({ show, closed }) {
    const [check, setCheck] = useState(true);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [numbi, setNumBi] = useState('');
    const [senha, setSenha] = useState('');
    const [sexo, setSexo] = useState('masculino');
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        const getData = async () => {
            const id = localStorage.getItem('idfuncionario');
            try {
                const res = await axios.get(`http://localhost:5000/funcionario/${id}`);
                setNome(res.data.nome);
                setEmail(res.data.email);
                setNumBi(res.data.bi);
                setTelefone(res.data.telefone);
                setSenha(res.data.senha);
                setSexo(res.data.sexo || 'masculino');
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);

    const handleChange = (setter, validator, field) => (e) => {
        const value = e.target.value;
        setter(value);
        setErrors(prev => ({ ...prev, [field]: !validator.test(value) }));
    };

    const validateAll = () => {
        const newErrors = {
            nome: !validateName.test(nome),
            email: !validateEmail.test(email),
            telefone: !validateTelefone.test(telefone),
            bi: !validateBi.test(numbi),
            senha: !validatePassword.test(senha),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    const save = async () => {
        if (!validateAll()) return;
        const id = localStorage.getItem('idfuncionario');
        try {
            await axios.patch(`http://localhost:5000/funcionario/${id}`, {
                nome, email, telefone, bi: numbi, senha, sexo
            });
            alert('Informações atualizadas com sucesso!');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Dados</h5>
                        <button type="button" className="btn-close" onClick={closed}></button>
                    </div>
                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nome"
                            value={nome}
                            onChange={handleChange(setNome, validateName, 'nome')}
                            disabled={check}
                        />
                        {errors.nome && <small className="text-danger">Nome inválido</small>}

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange(setEmail, validateEmail, 'email')}
                            disabled={check}
                        />
                        {errors.email && <small className="text-danger">Email inválido</small>}

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Telefone"
                            maxLength={11}
                            value={telefone}
                            onChange={handleChange(setTelefone, validateTelefone, 'telefone')}
                            disabled={check}
                        />
                        {errors.telefone && <small className="text-danger">Telefone inválido</small>}

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Bilhete de Identidade"
                            maxLength={14}
                            value={numbi}
                            onChange={handleChange(setNumBi, validateBi, 'bi')}
                            disabled={check}
                        />
                        {errors.bi && <small className="text-danger">BI inválido</small>}

                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Senha"
                            maxLength={8}
                            value={senha}
                            onChange={handleChange(setSenha, validatePassword, 'senha')}
                            disabled={check}
                        />
                        {errors.senha && <small className="text-danger">Senha inválida</small>}

                        <div className="mb-2">
                            <label className="me-2">Sexo:</label>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    value="masculino"
                                    checked={sexo === 'masculino'}
                                    onChange={e => setSexo(e.target.value)}
                                    disabled={check}
                                />
                                <label className="form-check-label">Masculino</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="sexo"
                                    value="feminino"
                                    checked={sexo === 'feminino'}
                                    onChange={e => setSexo(e.target.value)}
                                    disabled={check}
                                />
                                <label className="form-check-label">Feminino</label>
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
