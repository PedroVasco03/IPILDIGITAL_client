import Image from "next/image";
import init from '../../public/images/images-system/home.png'
import chat from '../../public/images/images-system/chat.png'
import coord from '../../public/images/images-system/coordenator.png'
import set from '../../public/images/images-system/settings.png'
import exit from '../../public/images/images-system/exit.png'
import styleSide from'../css/sideBar.module.css'
import styleGeral from '../css/logado.module.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function SideBarCoordenacao(){
    const [dado, setDado] = useState({})
    const router=useRouter();
    const currentRoute = router.pathname;
    useEffect(()=>{
    
    },[])
    return(
        <>
            <nav className={styleSide.side+" "+styleGeral.side}>
                <ul className={styleSide.ul}>
                    <li className={styleSide.li}><a href={"/coordenacao/inicio"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/coordenacao/inicio" ? 700 :" ",
                                    background: currentRoute === "/coordenacao/inicio" ? "#1478b1" : "",
                                }} > 
                        <Image className={styleSide.i} src={init} alt='inicio'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Início</span>
                    </a></li>
                    <li className={styleSide.li}><a href={"/coordenacao/chat"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/coordenacao/chat" ? 700 :" ",
                                    background: currentRoute === "/coordenacao/chat" ? "#1478b1" : "",
                                }} >
                        <Image className={styleSide.i} src={chat} alt='Chat'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Chat</span>
                    </a></li>
                    <li className={styleSide.li}><a href={"/coordenacao/team"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/coordenacao/team" ? 700 :" ",
                                    background: currentRoute === "/coordenacao/team" ? "#1478b1" : "",
                                }} >
                        <Image className={styleSide.i} src={coord} alt='Coordenação'/>
                        <span className={styleSide.side_item+" "+styleSide.span}>Coordenação</span>
                    </a></li>
                    <li className={styleSide.li}><a href={"/coordenacao/definicoes"} className={styleSide.a}style={{
                                    fontWeight: currentRoute === "/coordenacao/definicoes" ? 700 :" ",
                                    background: currentRoute === "/coordenacao/definicoes" ? "#1478b1" : "",
                                }} >
                        <Image className={styleSide.i} src={set} alt='Definições' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Definições</span>
                    </a></li>
                    <li onClick={()=>{
                        localStorage.removeItem('idcoordenador')
                        localStorage.removeItem('usernameCoordenador')
                    }} className={styleSide.li}><a href="/login/coordenacao/login" className={styleSide.a+" "+styleSide.logout}>
                        <Image className={styleSide.i } src={exit} alt='Sair' />
                        <span className={styleSide.side_item+" "+styleSide.span}>Sair</span>
                    </a></li>
                </ul>
            </nav>
        </>
    )
}

export default SideBarCoordenacao;