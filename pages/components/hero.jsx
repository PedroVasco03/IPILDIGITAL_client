import Image from "next/image";
import { motion } from "framer-motion";
import heroImg from '../../public/images/hero-img.png'

const Hero = () => {
  return (
    <div>
      <section id="hero" className="hero d-flex align-items-center">
        <div className="container">
          <div className="row">
            {/* Texto com fade-up */}
            <motion.div
              className="col-lg-6 d-flex flex-column justify-content-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1>Seja bem vindo ao IPILDIGITAL</h1>
              <h2>
                Dentro do nosso sistema o senhor encontrará mais facilidade e
                agilidade. Role e começe a usar.
              </h2>
              <div>
                <div className="text-center text-lg-start">
                  <a
                    href="#vantages"
                    className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Iniciar</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Imagem com efeito "Zoom" */}
            <motion.div
              className="col-lg-6 hero-img"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image src={heroImg} className="img-fluid" alt="Hero Image" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
