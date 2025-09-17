import Head from "next/head";
import CarouselComponent from "./Homepage/carousel";
import Footer from "./Homepage/footer";
import Home from "./Homepage/home";
import Services from "./Homepage/services";
import WhatIs from "./Homepage/whatIs";
import About from "./Homepage/about";
function Index ({data}){
    return (
      <div>
        <Head>
            <meta charSet="utf-8" lang="pt-pt"/>
            <title>IPILDIGITAL</title>
        </Head>
       <Home>
          <CarouselComponent/>
          <WhatIs/>
          <Services/>
          <About/>
          <Footer/>
          
       </Home>
      </div>
    );
}
export default Index


/*export async function getServerSideProps(){
  const response = await fetch(`http://localhost:5000/`)
  const data = await response.json()
  console.log(data)
  return {props: { data }}
}*/