import Image from "next/image";
import heroImg from '../../public/images/hero-img.png'
import { Fade,Zoom } from "react-reveal";


const Hero = ()=>{
    return(
        <div>
            <section id="hero" className="hero d-flex align-items-center">

                <div className="container">
                    <div className="row">
                        <Fade bottom cascade>

                        
                        <div className="col-lg-6 d-flex flex-column justify-content-center">
                            <h1>Seja bem vindo ao IPILDIGITAL</h1>
                            <h2>Dentro do nosso sistema o senhor encontrará mais facilidade e agilidade. Role e começe a usar.</h2>
                            <div>
                                <div className="text-center text-lg-start">
                                    <a href="#vantages" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                                        <span>Iniciar</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        </Fade>
                            <div className="col-lg-6 hero-img">
                            <Zoom top>
                                <Image src={heroImg} className="img-fluid" alt=""/>
                            </Zoom>
                            </div>
                    </div>
                </div> 
            </section>
        </div>
    )
}

export default Hero;