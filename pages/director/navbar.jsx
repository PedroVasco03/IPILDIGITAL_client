import logo from '../../public/images/logotipo.png'
import styleNav from '../css/navLogado.module.css'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import set from '../../public/images/images-system/settingsB.png'
import exit from '../../public/images/images-system/exitB.png'
import chat from '../../public/images/images-system/chatB.png'
import cord from '../../public/images/images-system/coordenatorB.png'
import imagem from '../../public/images/profile_user.png'
function NavBarCoordenacao(){
    
    const [username, setUsername] = useState('')
    useEffect(()=>{
        try {
            const user = localStorage.getItem('usernameDirector')
            setUsername(user)
        } catch (error) {
            console.log(error)
            router.push('/director/login')
        }
    }, [])
    const [css, setCss] = React.useState(null)
   
    function toggleMenu(){
        if(css===null) 
            setCss('open-menu')
        else
            setCss(null)
    }
    return(
        <nav className={styleNav.nav}>
            <li className={styleNav.li}><a href={"/director/inicio/"} className={styleNav.a+" "+styleNav.logo}> 
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
                            <a href="/director/chat" className='sub-menu-link'>
                                <Image src={chat} className='img'></Image>
                                <p>Chat</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                            <a href="/director/team" className='sub-menu-link'>
                                <Image src={cord} className='img'></Image>
                                <p>Secretaria</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                            <a href="/director/definicoes" className='sub-menu-link'>
                                <Image src={set} className='img'></Image>
                                <p>Definições</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                            <a href="/login/director/login" className='sub-menu-link' onClick={()=>{
                                localStorage.removeItem('iddirector')
                                localStorage.removeItem('usernameDirector')
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
export default NavBarCoordenacao