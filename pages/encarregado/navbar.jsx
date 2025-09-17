import styleNav from '../css/navLogado.module.css'
import logo from '../../public/images/logotipo.png'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import set from '../../public/images/images-system/settingsB.png'
import exit from '../../public/images/images-system/exitB.png'
import chat from '../../public/images/images-system/chatB.png'
import imagem from '../../public/images/profile_user.png'
function NavBarAluno(){
    
    const [username, setUsername] = useState('')
    useEffect(()=>{
        try {
            const user = localStorage.getItem('usernameEncarregado')
            setUsername(user)
        } catch (error) {
            console.log(error)
            router.push('/encarregado/login')
        }
    }, [])
    const [css, setCss] = React.useState(null)
   
    function toggleMenu(){
        if(css===null) 
            setCss('open-menu')
        else
            setCss(null)
    }
    const [dado, setDado] = useState({})
    const [open, setOpen] = useState(false)
    const setOpenned = ()=>{
        setOpen(true)
    }
    const closed = ()=>{
        setOpen(false)
    }
    return(
        <nav className={styleNav.nav}>
                    <li className={styleNav.li}><a href={"/encarregado/inicio/"} className={styleNav.a+" "+styleNav.logo}> 
                            <Image className={styleNav.i} src={logo} alt='logo'/>
                            <span className={styleNav.nav_item+" "+styleNav.span}>IPIL<span className={styleNav.digital}> DIGITAL</span> </span>
                    </a></li>
                    <div className="contImage">
                        <Image src={imagem} className='user-pic' onClick={toggleMenu}></Image>
                    </div>

                    <div className={"sub-menu-wrap "+ css}>
                        <div className="sub-menu">
                            <div className="user-info">
                                <Image src={imagem} className='img'></Image>
                                <h2>{username}</h2>
                            </div>
                            <hr/>
                            <a href="/encarregado/chat" className='sub-menu-link'>
                                <Image src={chat} className='img'></Image>
                                <p>Chat</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                            <a href="/encarregado/definicoes" className='sub-menu-link'>
                                <Image src={set} className='img'></Image>
                                <p>Definições</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                            <a href="/login/encarregado/login" className='sub-menu-link' onClick={()=>{
                                localStorage.removeItem('idencarregado')
                                localStorage.removeItem('usernameEncarregado')
                            }}>
                                <Image src={exit} className='img'></Image>
                                <p>Sair</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                        </div>
                    </div>
        </nav>
    )
}
export default NavBarAluno