import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script'
import './login/bootstrap-icons-1.9.1/bootstrap-icons.css'
import './css/style.css'
import '../styles/style.css'
import '../styles/main.css'
import  '../styles/styleInvalid.css'
import { useEffect } from 'react';
function MyApp({Component, pageProps}){
    useEffect(()=>{
        require('bootstrap/dist/js/bootstrap.js');
    },[])
    return(

        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                strategy="afterInteractive"
            />
            <Component {...pageProps}/>
        </>       
    )
}
export default MyApp
