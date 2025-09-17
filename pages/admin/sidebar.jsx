import Image from "next/image"
import init from '../../public/images/images-system/home.png'
import set from '../../public/images/images-system/settings.png'
import exit from '../../public/images/images-system/exit.png'
import styleSide from'../css/sideBar.module.css'
import styleGeral from '../css/logado.module.css'
import { useRouter } from "next/router"
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap"
import Link from "next/link"
import React from "react"

function SideBarAdmin(){
    const router = useRouter()
    const currentRoute= router.pathname;
    
    return(
        <>
        <nav className={styleSide.side+" "+styleGeral.side}>
                    <ul className={styleSide.ul}>
                        
                            
                                <li className={styleSide.li+" primeiro"}>
                                <UncontrolledDropdown ><a href="#"className={styleSide.a}  
                                style={{
                                    fontWeight: currentRoute === "/admin/adminInicio" ? 700 :" " ,
                                    background: currentRoute === "/admin/adminInicio" ? "#1478b1" : "",
                                }}> 
                                    <DropdownToggle caret className="dropdown">
                                        <Image className={styleSide.i} src={init} alt='inicio'/>
                                        <span className={styleSide.side_item+" "+styleSide.span}>DashBoard</span>
                                    </DropdownToggle></a>
                                    <DropdownMenu aria-labelledby="dropdownMenuButton" className="dropdownMenu" >
                                        <Link href="/admin/component/tAluno"  >
                                            <DropdownItem className="dropdownItem" style={{
                                    fontWeight: currentRoute === "/admin/component/tAluno" ? 700 :" ",
                                    background: currentRoute === "/admin/component/tAluno" ? "#1478b1" : "",
                                }}>
                                                ALUNO 
                                            </DropdownItem>
                                        </Link> 

                                        <Link href="/admin/component/tDirector">
                                            <DropdownItem className="dropdownItem" style={{
                                    fontWeight: currentRoute === "/admin/component/tDirector" ? 700 :" ",
                                    background: currentRoute === "/admin/component/tDirector" ? "#1478b1" : "",
                                }}>
                                                DIRECTOR
                                            </DropdownItem>
                                        </Link>

                                        <Link href="/admin/component/tFuncionario">
                                            <DropdownItem className="dropdownItem" style={{
                                    fontWeight: currentRoute === "/admin/component/tFuncionario" ? 700 :" ",
                                    background: currentRoute === "/admin/component/tFuncionario" ? "#1478b1" : "",
                                }}>
                                                FUNCIONARIO
                                            </DropdownItem> 
                                        </Link>           

                                        <Link href="/admin/component/tEncarregado">
                                            <DropdownItem className="dropdownItem" style={{
                                    fontWeight: currentRoute === "/admin/component/tEncarregado" ? 700 :" ",
                                    background: currentRoute === "/admin/component/tEncarregado" ? "#1478b1" : "",
                                }}>
                                            ENCARREGADO
                                            </DropdownItem>
                                        </Link>

                                        <Link href="/admin/component/tCoordenador">
                                            <DropdownItem className="dropdownItem" style={{
                                    fontWeight: currentRoute === "/admin/component/tCoordenador" ? 700 :" ",
                                    background: currentRoute === "/admin/component/tCoordenador" ? "#1478b1" : "",
                                }}>
                                                COORDENADOR
                                            </DropdownItem>
                                        </Link>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                </li>
                        
                        <li className={styleSide.li}><a href="/admin/adminSettings" 
                            style={{
                                    fontWeight: currentRoute === "/admin/adminSettings" ? 700 :" ",
                                    background: currentRoute === "/admin/adminSettings" ? "#1478b1" : "",
                                }} 
                            className={styleSide.a}> 
                            <Image className={styleSide.i} src={set} alt='inicio'/>
                            <span className={styleSide.side_item+" "+styleSide.span } >Definições</span>
                        </a></li>
                        
                        <li onClick={()=>{
                            localStorage.removeItem('idAdmin')
                            localStorage.removeItem('usernameAdmin')
                            router.push('/admin/login')
                            }} className={styleSide.li}><a href="#" className={styleSide.a+" "+styleSide.logout}>
                            
                            <Image className={styleSide.i } src={exit} alt='Sair' />
                            <span className={styleSide.side_item+" "+styleSide.span}>Sair</span>
                        </a></li>
                    </ul>
                </nav>
                </>
    )
}

export default SideBarAdmin