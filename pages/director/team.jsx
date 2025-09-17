import NavBarCoordenacao from "./navbar"
import Head from "next/head"
import styleGeral from '../css/logado.module.css'
import SideBarCoordenacao from "./sidebar"
import ModalCreate from "./components/modalCreate";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import imagem from '../../public/images/profile_user.png'
function Team(){
    const [datas, setDatas] = useState([])
    const [item, setItem] = useState([])
    const router = useRouter()
    const getData = async ()=>{
        const value = localStorage.getItem('iddirector')
        await axios.get("http://localhost:5000/secretaria")
        .then((response)=>{
            const search = response.data.filter((data)=>data.iddirector === value)
            setItem(search)
        })       
    }
    useEffect(()=>{
        setInterval(()=>{
            getAlunoData()
            getFuncionario()
        }, 1000)
        getData()
     },[])
     const getFuncionario = async()=>{
        await axios.get('http://localhost:5000/funcionario')
            .then((response)=>{
                setItem(response.data) 
            })
     }
     async function deleteData(id) {
        await axios.delete(`http://localhost:5000/secretaria/${id}`);
        window.location.reload()
    }
     const getAlunoData = async ()=>{
         try{
             const data = localStorage.getItem('iddirector')
             await axios.get(`http://localhost:5000/director/${data}`)
             .then((res)=>{
                if(res.data.permissao === 'Recusar')
                    router.push('/login/director/login')
             }).catch((err)=>{
                router.push('/login/director/login')
                 console.log(err)
             })
             if(data == null)
                 router.push('/login/director/login')
         }catch(err){
             console.log(err)
         }
     }
    const [modal, setModal] = useState(false)
    const toggleModal = ()=> setModal(!modal)
    const modalClose = ()=> setModal(false)
    return  <div>
        <Head>
            <title>Director | Pessoal</title>
            <link rel="icon" type="png/ico" href="../public/images/chat.png"/>
        </Head>
        <NavBarCoordenacao/>
        <div className={styleGeral.container}>
            <SideBarCoordenacao/>
            <div className={styleGeral.content + " mt-5"}>
                    <div className=" m-2 mt-5">
                        <h4>Integrantes da Secretária:</h4>
                        {item.map((item)=>(
                        <div class="list-group m-4">
                                <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3 m-2" aria-current="true" onClick={()=>{
                                     localStorage.setItem('receptorDirector', item.nome)
                                     router.push('/director/mensagem')
                                }}>
                                <Image src={imagem} alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0"/>
                                <div class="d-flex gap-2 w-100 justify-content-between">
                                    <div>
                                    <h6 class="mb-0">{item.nome}</h6>
                                    </div>
                                    <small class="opacity-50 text-nowrap">envie a sua mensagem</small>
                                </div>
                                </a>
                            </div>
                        ))}
                    </div>
            </div>
            
            <div>
                        
                    </div>
        </div>
        


    </div>;
}
export default Team