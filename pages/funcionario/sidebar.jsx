import Image from 'next/image'
import styleSide from'../css/sideBar.module.css'
import styleGeral from '../css/logado.module.css'
import init from '../../public/images/images-system/home.png'
import chat from '../../public/images/images-system/chat.png'
import coord from '../../public/images/images-system/coordenator.png'
import set from '../../public/images/images-system/settings.png'
import set2 from '../../public/images/images-system/job.png'
import exit from '../../public/images/images-system/exit.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function SideBarAluno(){
    
    const router = useRouter();
    const currentRoute = router.pathname
    const [dado, setDado] = useState({})
    useEffect(()=>{

    },[])
    return(
        <>
        <nav className={styleSide.side+" "+styleGeral.side}>
                <ul className={styleSide.ul}>
                    <li className={styleSide.li}><a href="/funcionario/inicio" className={styleSide.a} style={{
                                    fontWeight: currentRoute === "/funcionario/inicio" ? 700 :" ",
                                    background: currentRoute === "/funcionario/inicio" ? "#1478b1" : "",
                                }} > 
                        <Image className={styleSide.i} src={init} alt='inicio'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Início</span>
                    </a></li>
                    <li className={styleSide.li}><a href="/funcionario/chat" className={styleSide.a} style={{
                                    fontWeight: currentRoute === "/funcionario/chat" ? 700 :" ",
                                    background: currentRoute === "/funcionario/chat" ? "#1478b1" : "",
                                }} >
                        <Image className={styleSide.i} src={chat} alt='Chat'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Chat</span>
                    </a></li>
                    <li className={styleSide.li}><a href="/funcionario/servicos" className={styleSide.a} style={{
                                    fontWeight: currentRoute === "/funcionario/servicos" ? 700 :" ",
                                    background: currentRoute === "/funcionario/servicos" ? "#1478b1" : "",
                                }} >
                        <Image className={styleSide.i} src={set2} alt='Serviços' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Serviços</span>
                    </a></li>
                    <li className={styleSide.li}><a href="/funcionario/definicoes" className={styleSide.a} style={{
                                    fontWeight: currentRoute === "/funcionario/definicoes" ? 700 :" ",
                                    background: currentRoute === "/funcionario/definicoes" ? "#1478b1" : "",
                                }} >
                        <Image className={styleSide.i} src={set} alt='Definições' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Definições</span>
                    </a></li>
                    <li onClick={()=>{
                        localStorage.removeItem('idfuncionario')
                        localStorage.removeItem('usernameFuncionario')
                    }} className={styleSide.li}><a href="/login/funcionario/login" className={styleSide.a+" "+styleSide.logout}>
                        <Image className={styleSide.i } src={exit} alt='Sair' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Sair</span>
                    </a></li>
                </ul>
            </nav>
        </>
    )
}

export default SideBarAluno