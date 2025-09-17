import Image from "next/image";
import areas from '../../public/images/features.png'
import { Fade,Zoom } from "react-reveal";


const Areas = ()=>{
    return(

        <div>
        <section id="features" class="features">

        <div class="container" >
            <Fade bottom cascade>
            <header className="section-header">
                <h2>Areas de Formação</h2>
                <p>O nosso instituto conta com destintas áreas de formação, nomeadamente...</p>
            </header>
            </Fade>
        <div className="row">
            <Fade left>
            <div className="col-lg-6">
                <Image src={areas} className="img-fluid" alt=""/>
            </div>
            </Fade>
          <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
            <Fade right cascade>
            <div className="row align-self-center gy-4">

              <div className="col-md-6" >
                <div className="feature-box d-flex align-items-center">
                  <i className="bi bi-check"></i>
                  <h3>Área de Informática</h3>
                </div>
              </div>

              <div className="col-md-6" >
                <div className="feature-box d-flex align-items-center">
                  <i className="bi bi-check"></i>
                  <h3>Área de Mecanica</h3>
                </div>
              </div>

              <div className="col-md-6" >
                <div className="feature-box d-flex align-items-center">
                  <i className="bi bi-check"></i>
                  <h3>Área de Química</h3>
                </div>
              </div>

              <div className="col-md-6" >
                <div className="feature-box d-flex align-items-center">
                  <i className="bi bi-check"></i>
                  <h3>Área de Construção Civil</h3>
                </div>
              </div>

              <div className="col-md-6" >
                <div className="feature-box d-flex align-items-center">
                  <i className="bi bi-check"></i>
                  <h3>Área de Eletricidade</h3>
                </div>
              </div>

            </div>
            </Fade>
          </div>

        </div>
        </div>
        </section>
        </div>
        
    )
}

export default Areas;