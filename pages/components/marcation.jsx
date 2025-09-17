import foto from '../../public/images/features1.png'
import Image from "next/image";
import { Fade,Zoom } from "react-reveal";


const Marcation = ()=>{
    return(
        <div>
            <section id="details" class="details">
      <div class="container">

        <div class="row content">
            <Fade left>
                <div class="col-md-4" data-aos="fade-right">
                    <Image src={foto} class="img-fluid" alt=""/>
                </div>
            </Fade>
          <div class="col-md-8 pt-4" data-aos="fade-up">
            <Fade top cascade>
                <h3>Agende agora o seu atendimento presencial.</h3>
                <p class="font-italic">
                  Algumas das principais vantagens e objetivos do agendamento <b>Online</b>.
                </p>
            </Fade>
            <Fade right cascade>
                <ul>
                  <li><i class="bi-check"></i> <b>Evitar</b> as enchentes.</li>
                  <li><i class="bi-check"></i> <b>Proporcionar</b> atendimento de qualidade para todos.</li>
                  <li><i class="bi-check"></i> <b>Dedicar</b> mais tempo a um problema específico.</li>
                  <li><i class="bi-check"></i> <b>Melhorar</b> a experiência do usuário a 100%.</li>
                </ul>
            </Fade>
            <Fade bottom>
                <p>
                    Só existem vantagens num serviço como este, adira ja e conte o seu feedback.
                </p>
            </Fade>
          </div>
        </div>
        </div>
        </section>
        </div>
    )
}

export default Marcation;