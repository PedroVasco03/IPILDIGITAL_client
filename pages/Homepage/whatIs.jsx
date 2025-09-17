import Image from 'next/image'
import what from '../../public/images/initial.png'
import style from '../css/services.module.css'
import style2 from '../css/whats.module.css'
import { motion } from "framer-motion"

const WhatIs = ()=> {
    return( 
        <div className='container-fluid p-2' id='what'>
            <div className={style2.container_sobre+' w-100'}>
                
                <motion.div 
                    className={style2.text}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2  
                        className={style.title + " mb-5"}
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        O que é o IPILDIGITAL?
                    </motion.h2>

                    <p>
                        IPILDIGITAL é um sistema que permite melhorar o funcionamento da escola tornando os trabalhos totalmente digitais. 
                    </p>
                    <p className='m-0'>
                        Porquê o nome <b>IPIL DIGITAL</b>?  
                        Este nome indica que o nosso sistema é voltado inicialmente ao nosso instituto, 
                        procurando tornar os serviços oferecidos pelo mesmo o mais digitais possíveis.
                    </p>
                </motion.div>

                <motion.div 
                    className={style2.imgCont}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9 }}
                >
                    <Image className={style.img_sobre}  src={what} alt="o que é o IPILDIGITAL" />
                </motion.div>
            </div>
        </div>
    )
}

export default WhatIs
