import Head from "next/head";
import Link from "next/link";

function notfound() {

    return(
        <div className="containerGeral">
            <Head>
                <title>Página não encontrada</title>
            </Head>
            <h1 className="h1">404 Página não encontrada <b>#1</b></h1>
            <p class="zoom-area p"><b>Link inválido</b> Verifique o caminho. </p>
            <section class="error-container">
                <span class="four"><span class="screen-reader-text">4</span></span>
                <span class="zero"><span class="screen-reader-text">0</span></span>
                <span class="four"><span class="screen-reader-text">4</span></span>
            </section>
            <div class="link-container">
                <Link  href="/" class="more-link a">Voltar para Início</Link>
            </div>
        </div>
    )
}

export default notfound;