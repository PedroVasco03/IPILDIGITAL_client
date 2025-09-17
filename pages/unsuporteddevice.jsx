import Link from "next/link";

const { default: Head } = require("next/head");

function unsuporteddevice() {
    return(
        <div className="containerGeral">
            <Head>
                <title>Dispositivo inválido</title>
            </Head>
                <h1 className="h1">403 Dispositivo inválido <b>#2</b></h1>
                <p class="zoom-area p"><b>Dispositivo inválido</b> Acesse a página pelo PC. </p>
                <section class="error-container">
                    <span class="four"><span class="screen-reader-text">4</span></span>
                    <span class="zero"><span class="screen-reader-text">0</span></span>
                    <span class="four"><span class="screen-reader-text">3</span></span>
                </section>
                <div class="link-container">
                    <Link href="/" class="more-link a">Voltar para Início</Link>
                </div>
        </div>
    )
}

export default unsuporteddevice;