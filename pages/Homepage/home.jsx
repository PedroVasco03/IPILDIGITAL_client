import Head from "next/head"
import NavBar from "../navbar"

const Home = ({children})=>{
    return(
        <div>
            <Head><meta charSet="utf-8" lang="pt-pt"/></Head>
            <div className="d-flex flex-column">
                <NavBar/>
                {children}
            </div>
        </div>
        
    )
}
export default Home