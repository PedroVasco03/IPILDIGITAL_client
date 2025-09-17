import Image from "next/image";
import { motion } from "framer-motion";
import chat from "../../public/images/chat2.png";
import schedule from "../../public/images/schedule2.png";
import attend from "../../public/images/attend2.png";
import style from "../css/services.module.css";

const Services = () => {
  // Variantes para o efeito cascade
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3, // efeito cascata
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div id="services">
      <div className={style.todos + " mt-2"}>
        {/* Texto do topo */}
        <motion.div
          className={style.contentText}
          initial="hidden"
          whileInView="show"
          variants={itemVariants}
          viewport={{ once: true }}
        >
          <h2 style={{ fontWeight: "bold" }} className={style.title}>
            Serviços
          </h2>
          <p className={style.text}>
            O IPILDIGITAL tem como objectivo facilitar alguns dos principais
            serviços oferecidos pela coordenação de forma simples e rápida.
          </p>
        </motion.div>

        {/* Cards animados em cascata */}
        <motion.div
          className={style.container + " " + style.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Card 1 */}
          <motion.div
            className={style.card + " " + style.div}
            variants={itemVariants}
          >
            <div className={style.div + " " + style.lines}></div>
            <div className={style.imgBx + " " + style.div}>
              <Image src={chat} className={style.imgS} alt="Chat Online" />
            </div>
            <div className={style.content}>
              <div className={style.details}>
                <h2 className={style.h2}>Chat Online</h2>
                <p className={style.p}>
                  Agora podes entra em contacto com os teus colegas e podes
                  estar a par de todas informações.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className={style.card + " " + style.div}
            variants={itemVariants}
          >
            <div className={style.div + " " + style.lines}></div>
            <div className={style.imgBx + " " + style.div}>
              <Image
                src={schedule}
                className={style.imgS}
                alt="Marcações Online"
              />
            </div>
            <div className={style.content}>
              <div className={style.details}>
                <h2 className={style.h2}>Marcações Online</h2>
                <p className={style.p}>
                  As marcações serão feitas de forma simples agendando o horário
                  e o assunto que pretende que seja atendido.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className={style.card + " " + style.div}
            variants={itemVariants}
          >
            <div className={style.div + " " + style.lines}></div>
            <div className={style.imgBx + " " + style.div}>
              <Image
                src={attend}
                className={style.imgS}
                alt="Atendimento Online"
              />
            </div>
            <div className={style.content}>
              <div className={style.details}>
                <h2 className={style.h2}>Atendimento Online</h2>
                <p className={style.p}>
                  Receba atendimento da coordenação e da secretária de forma
                  simples, tendo uma experiência única.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
