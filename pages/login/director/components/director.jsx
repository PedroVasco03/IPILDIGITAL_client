import style from "../../../css/Login.module.css";
import { validateName, validateEmail, validateTelefone, validateBi, validatePassword } from "../../../../utils/regex";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Director() {
  const [allData, setAllData] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    numbi: "",
    senha: "",
    sexo: "masculino",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const endpoints = ['aluno','coordenador','director','encarregado','funcionario'];
        const results = await Promise.all(endpoints.map(ep => axios.get(`http://localhost:5000/${ep}`)));
        const mergedData = results.flatMap(res => res.data);
        setAllData(mergedData);
      } catch (err) {
        console.log('Erro ao buscar usuários:', err);
      }
    };
    getUsers();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName.test(form.nome)) newErrors.nome = true;
    if (!validateEmail.test(form.email)) newErrors.email = true;
    if (!validateTelefone.test(form.telefone)) newErrors.telefone = true;
    if (!validateBi.test(form.numbi)) newErrors.numbi = true;
    if (!validatePassword.test(form.senha)) newErrors.senha = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saverUser = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    const duplicate = allData.find(
      u => u.nome === form.nome || u.email === form.email || u.telefone === form.telefone || u.bi === form.numbi
    );

    if (duplicate) {
      alert("Dados digitados já existem");
      return;
    }

    try {
      await axios.post("http://localhost:5000/director", { ...form, tipo: "director" });
      alert("Salvo com sucesso director");
      setForm({ nome:"", email:"", telefone:"", numbi:"", senha:"", sexo:"masculino" });
    } catch (err) {
      console.log("Erro ao salvar diretor:", err);
    }
  };

  return (
    <form className={`${style.sign_up_form} ${style.form}`} onSubmit={saverUser}>
      <h2 className={style.title}>Cadastrar-se</h2>

      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          type="text"
          name="nome"
          className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
          value={form.nome}
          onChange={handleChange}
        />
        {errors.nome && <div className="invalid-feedback">Nome inválido</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="text"
          name="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="invalid-feedback">Email inválido</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Telefone</label>
        <input
          type="text"
          name="telefone"
          className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
          value={form.telefone}
          onChange={handleChange}
        />
        {errors.telefone && <div className="invalid-feedback">Telefone inválido</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Bilhete de Identidade</label>
        <input
          type="text"
          name="numbi"
          className={`form-control ${errors.numbi ? 'is-invalid' : ''}`}
          value={form.numbi}
          onChange={handleChange}
        />
        {errors.numbi && <div className="invalid-feedback">BI inválido</div>}
      </div>

      <div className="mb-3 position-relative">
        <label className="form-label">Senha</label>
        <input
          type={showPass ? "text" : "password"}
          name="senha"
          className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
          value={form.senha}
          onChange={handleChange}
        />
        <span
          className="position-absolute top-50 end-0 translate-middle-y pe-3"
          style={{cursor:'pointer'}}
          onClick={() => setShowPass(prev => !prev)}
        >
          {showPass ? "🙈" : "👁️"}
        </span>
        {errors.senha && <div className="invalid-feedback">Senha inválida</div>}
      </div>

      <div className="mb-3">
        <label className="form-label me-3">Sexo:</label>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="sexo"
            value="masculino"
            className="form-check-input"
            checked={form.sexo === "masculino"}
            onChange={handleChange}
          />
          <label className="form-check-label">Masculino</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            type="radio"
            name="sexo"
            value="feminino"
            className="form-check-input"
            checked={form.sexo === "feminino"}
            onChange={handleChange}
          />
          <label className="form-check-label">Feminino</label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
    </form>
  );
}

export default Director;
