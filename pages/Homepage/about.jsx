import { motion } from "framer-motion";
import Image from "next/image";
import estudantes from ".././../public/images/alunos.jpg";

const About = () => {
  return (
    <div id="about">
      <section id="counts" className="counts">
        <div className="container">
          <motion.div
            className="row gy-4"
            initial={{ opacity: 0, y: 50 }} // como se fosse "bottom"
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="count-box">
                <i className="bi bi-mortarboard" style={{ color: "red" }}></i>
                <div>
                  <span className="purecounter">5</span>
                  <p>Áreas de Formação</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="count-box">
                <i className="bi bi-list-check" style={{ color: "green" }}></i>
                <div>
                  <span className="purecounter">21</span>
                  <p>Cursos</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="count-box">
                <i className="bi bi-motherboard" style={{ color: "brown" }}></i>
                <div>
                  <span className="purecounter">11</span>
                  <p>Oficinas</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-3 col-md-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="count-box">
                <i className="bi bi-lightbulb" style={{ color: "gold" }}></i>
                <div>
                  <span className="purecounter">29</span>
                  <p>Laboratórios</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container" data-aos="fade-up">
          <div className="row gx-0">
            <motion.div
              className="col-lg-6 d-flex flex-column justify-content-center"
              initial={{ opacity: 0, x: -50 }} // como se fosse "left"
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="content">
                <h3>Sobre</h3>
                <h2>
                  Escolher um instituto certo é uma grande preocupação
                  atualmente.
                </h2>
                <p>
                  No nosso instituto a educação e a formação dos nossos
                  estudantes torna-se uma das grandes prioridades e
                  preocupações, conheça os nossos cursos, visite o nosso espaço,
                  aqui nós tratamos da sua formação.
                </p>
                <div className="text-center text-lg-start">
                  <a
                    href="/components/Main"
                    className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                  >
                    <span>Entrar Agora</span>
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-lg-6 d-flex align-items-center"
              initial={{ opacity: 0, x: 50 }} // como se fosse "right"
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image src={estudantes} className="img img-fluid" alt="" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
