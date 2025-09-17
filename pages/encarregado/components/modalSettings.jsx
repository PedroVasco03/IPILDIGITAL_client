import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/utils/regex";

let allData = [];

function ModalSetting({ show, closed }) {
  const [desabilitado, setDesabilitado] = useState(false);
  const [nome, setNome] = useState('');
  const [nomeErr, setNomeErr] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [telefone, setTelefone] = useState('');
  const [telefoneErr, setTelefoneErr] = useState('');
  const [numbi, setNumBi] = useState('');
  const [biErr, setBiErr] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaErr, setSenhaErr] = useState(false);
  const [sexo, setSexo] = useState('masculino');
  const [check, setCheck] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChangue = (e) => setSexo(e.target.value);

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
    setDesabilitado(nomeErr || emailErr || telefoneErr || biErr || senhaErr);
  };

  useEffect(() => {
    const getData = async () => {
      const value = localStorage.getItem('idencarregado');
      try {
        const res = await axios.get(`http://localhost:5000/encarregado/${value}`);
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
    const id = localStorage.getItem('idencarregado');
    if (nome && numbi && telefone && email && senha) {
      await axios.patch(`http://localhost:5000/encarregado/${id}`, {
        nome, bi: numbi, telefone, email, sexo, senha
      });
      alert('Informações actualizadas');
      window.location.reload();
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar dados</h5>
            <button type="button" className="btn-close" onClick={closed}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nome"
              value={nome}
              readOnly={check}
              onKeyPress={deteta}
              onChange={(e) => setNome(e.target.value)}
              onBlur={validate}
            />
            {nomeErr && <small className="text-danger">Por favor digite nome válido</small>}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              readOnly={check}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validate}
            />
            {emailErr && <small className="text-danger">Por favor digite um email válido</small>}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Telefone"
              maxLength={11}
              value={telefone}
              readOnly={check}
              onKeyPress={detetaNum}
              onChange={(e) => setTelefone(e.target.value)}
              onBlur={validate}
            />
            {telefoneErr && <small className="text-danger">Por favor digite número válido EX: "999-999-999"</small>}

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Bilhete de identidade"
              maxLength={14}
              value={numbi}
              readOnly={check}
              onChange={(e) => setNumBi(e.target.value)}
              onBlur={validate}
            />
            {biErr && <small className="text-danger">Por favor digite numero do bilhete válido</small>}

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Senha"
              maxLength={8}
              value={senha}
              readOnly={check}
              onChange={(e) => setSenha(e.target.value)}
              onBlur={validate}
            />
            {senhaErr && <small className="text-danger">A senha deve incluir: 8 dígitos, incluindo uma letra maiúscula e um número</small>}

            <div className="mb-2">
              <p>Sexo</p>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sexo"
                  value="masculino"
                  checked={sexo === 'masculino'}
                  onChange={handleChangue}
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
                  onChange={handleChangue}
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
