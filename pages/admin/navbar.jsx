import styleNav from '../css/navLogado.module.css'
import logo from '../../public/images/logotipo.png'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import set from '../../public/images/images-system/settingsB.png'
import exit from '../../public/images/images-system/exitB.png'
import imagem from '../../public/images/profile_user.png'
function NavBarSecretaria(){
    const [username, setUsername] = useState('')
    useEffect(()=>{
        try {
            const user = localStorage.getItem('usernameAdmin')
            setUsername(user)
        } catch (error) {
            console.log(error)
        }
    },[])
    const [css, setCss] = React.useState(null)
   
    function toggleMenu(){
        if(css===null) 
            setCss('open-menu')
        else
            setCss(null)
    }
    const [open, setOpen] = useState(false)
    const setOpenned = ()=>{
        setOpen(true)
    }
    const closed = ()=>{
        setOpen(false)
    }
    return(
        <nav className={styleNav.nav}>
            <li className={styleNav.li}><a href="/admin/adminInicio" className={styleNav.a+" "+styleNav.logo}> 
                <Image className={styleNav.i} src={logo} alt='logo'/>
                    <span className={styleNav.nav_item+" "+styleNav.span}>IPIL<span className={styleNav.digital}> DIGITAL</span></span>
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
                            <a href="/admin/adminSettings" className='sub-menu-link'>
                                <Image src={set} className='img'></Image>
                                <p>Definições</p>
                                <i class="bi bi-arrow-right-short"></i>
                            </a>
                            <a href="/admin/login" className='sub-menu-link' onClick={()=>{
                                localStorage.removeItem('idAdmin')
                                localStorage.removeItem('usernameAdmin')
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
export default NavBarSecretaria