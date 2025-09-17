import React, { useEffect, useState } from "react";
import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/utils/regex";
import axios from "axios";
import { useRouter } from "next/router";

let allData = [];

function ModalSetting({ show, closed }) {
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
  const [check, setCheck] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChangue = (e) => setSexo(e.target.value);

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

  useEffect(() => {
    const getData = async () => {
      const value = localStorage.getItem('iddirector');
      try {
        const res = await axios.get(`http://localhost:5000/director/${value}`);
        setNome(res.data.nome);
        setEmail(res.data.email);
        setNumBi(res.data.bi);
        setTelefone(res.data.telefone);
        setSenha(res.data.senha);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const save = async () => {
    alert('Informações actualizadas');
    const data = localStorage.getItem('iddirector');
    if (nome && numbi && telefone && email && senha) {
      await axios.patch(`http://localhost:5000/director/${data}`, {
        nome, bi: numbi, telefone, email, sexo, senha
      });
      window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar dados</h5>
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
                onKeyPress={deteta}
                onChange={(e) => setNome(e.target.value)}
                onBlur={validate}
              />
              {nomeErr && <div className="invalid-feedback">Por favor digite nome válido</div>}

              <input
                type="text"
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
                value={telefone}
                readOnly={check}
                maxLength={11}
                minLength={9}
                onKeyPress={detetaNum}
                onChange={(e) => setTelefone(e.target.value)}
                onBlur={validate}
              />
              {telefoneErr && <div className="invalid-feedback">Por favor digite número válido EX: "999-999-999"</div>}

              <input
                type="text"
                className={`form-control mb-2 ${biErr ? 'is-invalid' : ''}`}
                placeholder="Bilhete de identidade"
                value={numbi}
                readOnly={check}
                maxLength={14}
                onChange={(e) => setNumBi(e.target.value)}
                onBlur={validate}
              />
              {biErr && <div className="invalid-feedback">Por favor digite número do bilhete válido</div>}

              <input
                type="password"
                className={`form-control mb-2 ${senhaErr ? 'is-invalid' : ''}`}
                placeholder="Senha"
                value={senha}
                readOnly={check}
                maxLength={8}
                onChange={(e) => setSenha(e.target.value)}
                onBlur={validate}
              />
              {senhaErr && <div className="invalid-feedback">
                A senha deve incluir: 8 dígitos, incluindo uma letra maiúscula e um número
              </div>}

              <div className="mb-3">
                <p>Sexo</p>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sexo"
                    id="masculino"
                    value="masculino"
                    disabled={check}
                    checked={sexo === 'masculino'}
                    onChange={handleChangue}
                  />
                  <label className="form-check-label" htmlFor="masculino">Masculino</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sexo"
                    id="feminino"
                    value="feminino"
                    disabled={check}
                    checked={sexo === 'feminino'}
                    onChange={handleChangue}
                  />
                  <label className="form-check-label" htmlFor="feminino">Feminino</label>
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
