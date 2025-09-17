import React, { useState } from "react";
import style2 from "../../../css/Prosseguir.module.css"
import axios from "axios";

function deteta (e){
    const Code = (e.key ? e.key : e.key);
    console.log(Code)
    if( Code !== '0' & 
        Code !== '1' & 
        Code !== '2' & 
        Code !== '3' & 
        Code !== '4' & 
        Code !== '5' & 
        Code !== '6' & 
        Code !== '7' & 
        Code !== '8' & 
        Code !== '9'){
        e.preventDefault()
    }
}

function SignUpForm(){
    const [turma, setTurma] = React.useState('');
    const [classe, setClasse] = React.useState('');
    const [curso, setCurso] = React.useState('');
    const [area, setArea] = React.useState('');
    const [numprocesso, setNumProcesso] = React.useState('');

    const saveData = async ()=>{
        if(numprocesso!="" && curso!="" && classe!="" && turma!="" && area!=""){
            await axios.post('http://localhost:5000/aluno',{
                nome: data.nome,
                bi: data.numbi,
                area: area,
                curso: curso,
                turma: turma,
                classe: classe,
                numeroprocesso: numprocesso,
                telefone: data.telefone,
                email: data.email,
                sexo: data.sexo,
                senha: data.senha,
            }, { method: 'post', 
            baseURL:'http://localhost:5000/aluno', 
            timeout:1000, 
            withCredentials: false, 
            auth: {
                username: nome,
                password: senha,
            },
            responseType:'json',
            responseEncoding:'utf8'
        })
            localStorage.removeItem('alunoData')
            alert('Salvo com sucesso!')
        }
        
    }
    const [update, setUpdate] = useState([])
    const [upadate, setUpadate] = useState([])
    return(
        <>
            <form method="POST"  className={style2.sign_in_form+" "+ style2.form} onSubmit={saveData}>
                <h2 className={style2.title+" "+ style2.h2}>Cadastrar-se</h2>
                <div className={style2.input_field+" "+ style2.div}>
                    <i className={"bi-123 "+ style2.i}></i>
                    <input 
                        type="number" 
                        name="processnumber" 
                        className={style2.input}
                        placeholder="Número de Processo" 
                        value={numprocesso}
                        required={true}
                        onKeyPress={deteta}
                        onChange={(event) => {
                            console.log(numprocesso)
                            setNumProcesso(event.target.value)}}
                    />
                </div>
                <div className={style2.input_field +" "+style2.div}>
                <i className={"bi-text-paragraph "+ style2.i}></i>
                <select
                    value={area} 
                    className= {style2.select+" "+style2.input}
                    onChange={({target}) => {
                        setArea (target.value)
                        if(area ==='construcao_civil'){
                            const areaFormacao =['Desenhador Projetista', 'Técnico de Obras']
                            const course = ['CP','CC']
                            setUpdate(areaFormacao)
                            setUpadate(course)
                        }else if(area === 'eletricidade'){
                            const areaFormacao =['Energia e Instalações Elétricas', 'Electrónica e Automação', 'Electrónica e Telecomunicações','Energias Renováveis']
                            const course = ['EI','EA', 'ET', 'ER']
                            setUpdate(areaFormacao)
                            setUpadate(course)

                        }else if(area === 'informatica'){
                            const areaFormacao =['Técnico de Informática', 'Técnico de Gestão de Informática']
                            const course = ['II','IG']
                            setUpdate(areaFormacao)
                            setUpadate(course)

                        }else if(area === 'mecanica'){
                            const areaFormacao =['Mecatrónica', 'Frio e Climatização', 'Electromecânica', 'Máquinas e Motores', 'Mecatrónica Autómovel', 'Metalomecânica']
                            const course = ['MC','MF', 'ME', 'MM', 'MV','MT']
                            setUpdate(areaFormacao)
                            setUpadate(course)
                        }else if(area ==='quimica'){
                            const areaFormacao=['Ambiente e Controle de Dados', 'Química Industrial', 'Petroquímica','Bioquímica','Técnico de Técnicas de Laboratório']
                            const course = ['QA','QI', 'QP', 'QB', 'QT']
                            setUpdate(areaFormacao)
                            setUpadate(course)
                        }


                    }} 
                    id="area"
                >
                    <option disabled value="">Selecione a área</option>
                    <option value="construcao_civil">Construção Civil</option>
                    <option value="eletricidade">Eletricidade</option>
                    <option value="informatica">Informática</option>
                    <option value="mecanica">Mecanica</option>
                    <option value="quimica">Química</option>
                    required={true}
                </select>
                </div>
                <div className={style2.input_field +" "+  style2.div}>
                        <i className={"bi-bar-chart-steps " + style2.i}></i>
                        <select className={style2.select+" "+style2.input} name="curso" value={curso} onChange={(event) => setCurso (event.target.value)}>
                            {update.map((item, index)=>(
                                <option value={upadate[index]}>{item}</option>
                            ))}
                            required={true}
                        </select>
                </div>
                <div className={style2.input_field+" "+ style2.div}>
                    <i className={"bi-text-indent-right "+style2.i}></i>
                        <select name="classe" className={style2.select+ " "+ style2.input} value={classe} onChange={(event) => setClasse (event.target.value)}>
                            <option disabled value="">Selecione a classe</option>
                            <option value="10">10ª classe</option>
                            <option value="11">11ª classe</option>
                            <option value="12">12ª classe</option>
                            <option value="13">13ª classe</option>
                            required={true}
                        </select>
                </div>
                <div className={style2.input_field+" "+style2.div}>
                    <i className={"bi-person-lines-fill "+style2.i}></i>
                        <select name="turma" className={style2.select+" "+style2.input} value={turma} onChange={(event) => setTurma (event.target.value)}>
                            <option disabled value="">Selecione a turma</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="C">D</option>
                            required={true}
                        </select>
                </div>
               <input type="submit" value={'Cadastrar'} className={style2.btn+" "+ style2.solid+" "+ style2.input}/>
            </form>
        </>
    )
}

export default SignUpForm