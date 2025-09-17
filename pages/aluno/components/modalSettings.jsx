import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { validateBi, validateEmail, validateName, validatePassword, validateTelefone } from "@/utils/regex";

function ModalSettings({ show, close }) {
    const router = useRouter();

    const [check, setCheck] = useState(true);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [numbi, setNumBi] = useState('');
    const [senha, setSenha] = useState('');
    const [sexo, setSexo] = useState('masculino');
    const [curso, setCurso] = useState('');
    const [area, setArea] = useState('');
    const [classe, setClasse] = useState('');
    const [turma, setTurma] = useState('');
    const [numprocesso, setNumProcesso] = useState('');

    const [update, setUpdate] = useState([]);
    const [upadate, setUpadate] = useState([]);

    const filterArea = (dado) => {
        if(dado === 'construcao_civil'){
            setUpdate(['Selecione o curso','Desenhador Projetista', 'Técnico de Obras']);
            setUpadate(['','CP','CC']);
        } else if(dado === 'eletricidade'){
            setUpdate(['Selecione o curso','Energia e Instalações Elétricas', 'Electrónica e Automação', 'Electrónica e Telecomunicações','Energias Renováveis']);
            setUpadate(['','EI','EA','ET','ER']);
        } else if(dado === 'informatica'){
            setUpdate(['Selecione o curso','Técnico de Informática', 'Técnico de Gestão de Informática']);
            setUpadate(['','II','IG']);
        } else if(dado === 'mecanica'){
            setUpdate(['Selecione o curso','Mecatrónica', 'Frio e Climatização', 'Electromecânica', 'Máquinas e Motores', 'Mecatrónica Automóvel','Metalomecânica']);
            setUpadate(['','MC','MF','ME','MM','MV','MT']);
        } else if(dado === 'quimica'){
            setUpdate(['Selecione o curso','Ambiente e Controle de Dados', 'Química Industrial', 'Petroquímica','Bioquímica','Técnico de Técnicas de Laboratório']);
            setUpadate(['','QA','QI','QP','QB','QT']);
        }
    }

    useEffect(() => {
        const getData = async () => {
            const value = localStorage.getItem('idaluno');
            try {
                const res = await axios.get(`http://localhost:5000/aluno/${value}`);
                setNome(res.data.nome);
                setEmail(res.data.email);
                setNumBi(res.data.bi);
                setTelefone(res.data.telefone);
                setSenha(res.data.senha);
                setSexo(res.data.sexo);
                setNumProcesso(res.data.numeroprocesso);
                setClasse(res.data.classe);
                setCurso(res.data.curso);
                setArea(res.data.area);
                setTurma(res.data.turma);
            } catch(err) {
                console.log(err);
            }
        }
        if(show) getData();
    }, [show]);

    const save = async () => {
        const data = localStorage.getItem('idaluno');
        if(nome && email && telefone && numbi && senha && curso && area && classe && turma && numprocesso){
            await axios.patch(`http://localhost:5000/aluno/${data}`, {
                nome, bi: numbi, telefone, senha, sexo,
                curso, area, classe, turma, numprocesso
            });
            alert("Informações atualizadas com sucesso!");
            localStorage.removeItem('idaluno');
            router.push('/login/aluno/LoginAluno');
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    }

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Dados</h5>
                        <button type="button" className="btn-close" onClick={close}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nome</label>
                                <input type="text" className="form-control" value={nome} readOnly={check}
                                    onChange={e => setNome(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" value={email} readOnly={check}
                                    onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telefone</label>
                                <input type="text" className="form-control" value={telefone} readOnly={check}
                                    onChange={e => setTelefone(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Bilhete de Identidade</label>
                                <input type="text" className="form-control" value={numbi} readOnly={check}
                                    onChange={e => setNumBi(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Senha</label>
                                <input type="password" className="form-control" value={senha} readOnly={check}
                                    onChange={e => setSenha(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Sexo</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="sexo" value="masculino"
                                            checked={sexo === 'masculino'} onChange={e => setSexo(e.target.value)} />
                                        <label className="form-check-label">Masculino</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="sexo" value="feminino"
                                            checked={sexo === 'feminino'} onChange={e => setSexo(e.target.value)} />
                                        <label className="form-check-label">Feminino</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Área</label>
                                <select className="form-select" value={area} onChange={e => { setArea(e.target.value); filterArea(e.target.value) }}>
                                    <option value="">Selecione a área</option>
                                    <option value="construcao_civil">Construção Civil</option>
                                    <option value="eletricidade">Eletricidade</option>
                                    <option value="informatica">Informática</option>
                                    <option value="mecanica">Mecânica</option>
                                    <option value="quimica">Química</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Curso</label>
                                <select className="form-select" value={curso} onChange={e => setCurso(e.target.value)}>
                                    {update.map((item, idx) => <option key={idx} value={upadate[idx]}>{item}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Classe</label>
                                <select className="form-select" value={classe} onChange={e => setClasse(e.target.value)}>
                                    <option value="">Selecione a classe</option>
                                    <option value="10">10ª Classe</option>
                                    <option value="11">11ª Classe</option>
                                    <option value="12">12ª Classe</option>
                                    <option value="13">13ª Classe</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Turma</label>
                                <select className="form-select" value={turma} onChange={e => setTurma(e.target.value)}>
                                    <option value="">Selecione a turma</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Número do Processo</label>
                                <input type="text" className="form-control" value={numprocesso} onChange={e => setNumProcesso(e.target.value)} />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={save}>Salvar</button>
                        <button className="btn btn-secondary" onClick={() => setCheck(false)}>Editar</button>
                        <button className="btn btn-danger" onClick={close}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalSettings;
