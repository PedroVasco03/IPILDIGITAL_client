import Image from "next/image";
import vantage1 from '../../public/images/vantage1.png'
import vantage2 from '../../public/images/vantage2.png'
import vantage3 from '../../public/images/vantage3.png'
import { Fade,Zoom } from "react-reveal";


const Vantages = ()=>{
    return(
        <div>
            <section id="vantages" className="vantages">

                <div className="container" data-aos="fade-up">
                    <Fade bottom cascade>
                        <header className="section-header">
                          <h2>Outras Vantagens</h2>
                          <p>Usando o nosso sistema só encontrarás facilidade</p>
                        </header>
                    </Fade>

                    <Fade right cascade>
                        <div className="row">

                          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="box">
                              <Image src={vantage1} className="img-fluid" alt=""/>
                              <h3>Esteja em todos os lugares</h3>
                              <p>Resolva os seus problemas aqui, e fique descansado onde estiver, presença indispensável ficou no passado.</p>
                            </div>
                          </div>

                          <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                            <div className="box">
                              <Image src={vantage2} className="img-fluid" alt=""/>
                              <h3>Informações rápidas</h3>
                              <p>Num so clique fique a par de tudo que acontece existe agora o chat entre as turmas &#128526;.</p>
                            </div>
                          </div>

                          <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
                            <div className="box">
                              <Image src={vantage3} className="img-fluid" alt=""/>
                              <h3>Poupe tempo</h3>
                              <p>Agende agora o seu atendimento e so precisas chegar a hora marcada</p>
                              <div className="contBtn mt-5">
                                <a href="./agendar"><span>Agendar Agora</span> <i className="bi bi-arrow-right"></i></a>
                              </div>

                            </div>
                          </div>
                        
                        </div>
                    </Fade>
                </div>

            </section>
        </div>
    )
}

export default Vantages;