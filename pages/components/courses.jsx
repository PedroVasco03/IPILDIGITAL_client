import Image from "next/image";
import areas from '../../public/images/features.png'
import { Fade,Zoom } from "react-reveal";


const Courses = ()=>{
    return(
        <div>
        <section id="services" class="services">

      <div class="container" data-aos="fade-up">
        <Fade top cascade>
        <header class="section-header">
          <h2>Conheça nossos Cursos</h2>
          <p>Temos a sua disposição vários cursos dentre as areas supracitadas</p>
        </header>
        </Fade>
        <Fade bottom cascade>
        <div class="row gy-4">

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-box blue">
              <i class="bi-code-slash icon"></i>
              <h3>Informática</h3>
              <p>-Técnico de Informática. <br /> -Técnico de Gestão dos Sistemas Informáticos.</p>
              
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div class="service-box orange">
              <i class="bi-bricks icon"></i>
              <h3>Construção Civil</h3>
              <p>-Desenhador projectista. <br />-Técnico de Obras de Construção Civil</p>
              
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div class="service-box green">
              <i class="bi-virus2 icon"></i>
              <h3>Química</h3>
              <p>-Ambiente e Controlo da Qualidade. <br />-Química Industrial. <br />-Petroquímica. <br />-Energias Renováveis. <br />-Bioquímica. <br />-Técnico de Técnicas de Laboratório.</p>
              
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div class="service-box red">
              <i class="bi-tools icon"></i>
              <h3>Mecanica</h3>
              <p>-Frio e Climatização. <br />-Manutenção Industrial. <br />-Máquinas e Motores. <br />-Metalomecânica. <br />-Eletromecânica.<br />-Mecatrónica.</p>
              
            </div>
          </div>

          <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div class="service-box purple">
              <i class="bi-lightning icon"></i>
              <h3>Eletricidade</h3>
              <p>-Electrónica Industrial e Automação. <br />-Electrónica e Telecomunicações. <br />-Energia e Instalações Eléctricas. </p>
              
            </div>
          </div>

        </div>
        </Fade>
      </div>

    </section>
        </div>
        
    )
}

export default Courses;