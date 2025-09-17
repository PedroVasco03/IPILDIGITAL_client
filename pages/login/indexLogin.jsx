import React from "react"
import Head from 'next/head'
import style from '../css/escolha.module.css'
function LoginHome(){
    return(
        <>
        <Head>
            <title>Logar Como?</title>
        </Head>
        <div className={style.container}>
            
            <a href="#"> <div className={style.div +" "+style.first}></div></a>
            <a href="#"><div className={style.div+" "+style.second}></div></a>
            <a href="#"><div className={style.div+" "+style.third}></div></a>
        </div>
        </>
    )
}

export default LoginHome