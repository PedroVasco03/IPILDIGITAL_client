import Image from 'next/image'
import styleSide from'../css/sideBar.module.css'
import styleGeral from '../css/logado.module.css'
import init from '../../public/images/images-system/home.png'
import chat from '../../public/images/images-system/chat.png'
import coord from '../../public/images/images-system/coordenator.png'
import coord2 from '../../public/images/images-system/job.png'
import set from '../../public/images/images-system/settings.png'
import exit from '../../public/images/images-system/exit.png'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
function SideBarAluno(){
    const [dado, setDado] = useState({})
    const router=useRouter()
    const currentRoute = router.pathname;
    return(
        <>
        <nav className={styleSide.side+" "+styleGeral.side}>
                <ul className={styleSide.ul}>
                    <li className={styleSide.li}><a href={"/aluno/inicio"} className={styleSide.a} style={{
                                    fontWeight: currentRoute === "/aluno/inicio" ? 700 :" ",
                                    background: currentRoute === "/aluno/inicio" ? "#1478b1" : "",
                                }} > 
                        <Image className={styleSide.i} src={init} alt='inicio'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Início</span>
                    </a></li>
                    <li className={styleSide.li}><a href={"/aluno/chat"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/aluno/chat" ? 700 :" ",
                                    background: currentRoute === "/aluno/chat" ? "#1478b1" : "",
                                }}>
                        <Image className={styleSide.i} src={chat} alt='Chat'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Chat</span>
                    </a></li>
                    <li className={styleSide.li}><a href={"/aluno/agendar"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/aluno/agendar" ? 700 :" ",
                                    background: currentRoute === "/aluno/agendar" ? "#1478b1" : "",
                                }}>
                        <Image className={styleSide.i} src={coord} alt='Coordenação'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Agendar</span>
                    </a></li>
                    <li className={styleSide.li}><a href={"/aluno/pedido"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/aluno/pedido" ? 700 :" ",
                                    background: currentRoute === "/aluno/pedido" ? "#1478b1" : "",
                                }}>
                        <Image className={styleSide.i} src={coord2} alt='Coordenação'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Serviço</span>
                    </a></li>

                    <li className={styleSide.li}><a href={"/aluno/definicoes"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/aluno/definicoes" ? 700 :" ",
                                    background: currentRoute === "/aluno/definicoes" ? "#1478b1" : "",
                                }}>
                        <Image className={styleSide.i} src={set} alt='Definições' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Definições</span>
                    </a></li>
                    <li onClick={()=>{
                        localStorage.removeItem('idaluno')
                        localStorage.removeItem('usernameAluno')
                        localStorage.removeItem('coordenador')
                    }} className={styleSide.li}><a href="/login/aluno/LoginAluno" className={styleSide.a+" "+styleSide.logout}>
                        <Image className={styleSide.i } src={exit} alt='Sair' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Sair</span>
                    </a></li>
                </ul>
            </nav>
        </>
    )
}

export default SideBarAluno