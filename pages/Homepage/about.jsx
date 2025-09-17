import Fade from 'react-reveal'
import Image from 'next/image'
import estudantes from '.././../public/images/alunos.jpg'

const About = ()=>{
    return(
        <div id='about'>
            <section id="counts" className="counts">
                <div className="container">
                    <Fade bottom cascade >
                    <div className="row gy-4">

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-mortarboard" style={{color:"red"}}></i>
                                <div>
                                    <span className="purecounter">5</span>
                                    <p>Áreas de Formação</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-list-check" style={{color:"green"}}></i>
                                <div>
                                    <span className="purecounter">21</span>
                                    <p>Cursos</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-motherboard" style={{color:"brown"}}></i>
                                <div>
                                    <span  className="purecounter">11</span>
                                    <p>Oficinas</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="count-box">
                                <i className="bi bi-lightbulb" style={{color:"gold"}} ></i>
                                <div>
                                    <span className="purecounter">29</span>
                                    <p>Laboratórios</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    </Fade>
                </div>
            </section>

            <section id="about" className="about">

                <div className="container" data-aos="fade-up">
                    <div className="row gx-0">

                        <div className="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                            <Fade left cascade>
                            <div className="content">
                                <h3>Sobre</h3>
                                <h2>Escolher um instituto certo é uma grande preocupação atualmente.</h2>
                                <p>
                                    No nosso instituto a educação e a formação dos nossos estudantes torna-se uma das grandes prioridades e preocupações, conheça os nossos cursos, visite o nosso espaço, aqui nós tratamos da sua formação.
                                </p>
                                <div className="text-center text-lg-start">
                                    <a href="/components/Main" className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
                                        <span>Entrar Agora</span>
                                        <i className="bi bi-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                            </Fade>
                        </div>
                        <Fade right>
                        <div className="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                            <Image   src={estudantes} className="img img-fluid" alt=""/>
                        </div>
                        </Fade>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default About