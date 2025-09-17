import Image from "next/image";
import areas from '../../public/images/features.png'
import { motion } from 'framer-motion';



const Areas = ()=>{
    return(

        <div>
        <section id="features" class="features">

        <div class="container" >
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, staggerChildren: 0.15 }} viewport={{ once: true }}>
            <header className="section-header">
                <h2>Areas de Formação</h2>
                <p>O nosso instituto conta com destintas áreas de formação, nomeadamente...</p>
            </header>
            </motion.div>
        <div className="row">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="col-lg-6">
                <Image src={areas} className="img-fluid" alt=""/>
            </div>
            </motion.div>
          <div className="col-lg-6 mt-5 mt-lg-0 d-flex">
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, staggerChildren: 0.15 }} viewport={{ once: true }}>
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
            </motion.div>
          </div>

        </div>
        </div>
        </section>
        </div>
        
    )
}

export default Areas;