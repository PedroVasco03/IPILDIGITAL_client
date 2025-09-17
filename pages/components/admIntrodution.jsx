import foto from '../../public/images/features-2.png'
import Image from "next/image";
import { Fade,Zoom } from "react-reveal";


const Introdution = ()=>{
    return(
        <div>
            <section id="features" class="features">

                <div class="container" data-aos="fade-up">
                <div class="row feture-tabs" data-aos="fade-up">
          <div class="col-lg-6">
            <Fade left>
            <h3>Seja bem vindo senhor <b>Administrador</b>, conheça e gira o nosso sistema de forma responsável.</h3>
            </Fade>
            <ul class="nav nav-pills mb-3">
              <li>
                <a class="nav-link active" data-bs-toggle="pill" href="#tab1">Aluno</a>
              </li>
              <li>
                <a class="nav-link" data-bs-toggle="pill" href="#tab2">Director</a>
              </li>
              <li>
                <a class="nav-link" data-bs-toggle="pill" href="#tab3">Funcionário</a>
              </li>
              <li>
                <a class="nav-link" data-bs-toggle="pill" href="#tab4">Encarregado</a>
              </li>
              <li>
                <a class="nav-link" data-bs-toggle="pill" href="#tab5">Coordenador</a>
              </li>
            </ul>
            
            <div class="tab-content">
                <Fade top cascade>
              <div class="tab-pane fade show active bg-transparent" id="tab1">
                <p className='mb-3'>Relacionado aos estudantes encontras aqui as Informações necessárias para gerir qualquer conta, nomeadamente:</p>
                
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Tabela com Registos dos estudantes atualizados.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Todas as Informações Relacionadas aos Estudantes Cadastrados.</h4>
                </div>
                <p className='mb-3'>O senhor tem o poder de efetuar aqui as seguintes operações:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Conceder Acesso ao Sistema.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Remover Acesso ao Sistema, por Tempo Indeterminado.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Eliminar Conta do Sistema, Definitivamente.</h4>
                </div>
              </div>
              </Fade>
              <Fade top cascade>
              <div class="tab-pane fade show bg-transparent" id="tab2">
                <p className='mb-3'>Relacionado a Directores encontras aqui as Informações necessárias para gerir qualquer conta, nomeadamente:</p>
                
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Tabela com Registos dos Directores Atualizados.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Todas as Informações Relacionadas a Entidades Máximas Cadastradas.</h4>
                </div>
                <p className='mb-3'>O senhor tem o poder de efetuar aqui as seguintes operações:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Conceder Acesso ao Sistema.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Remover Acesso ao Sistema, por Tempo Indeterminado.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Eliminar Conta do Sistema, Definitivamente.</h4>
                </div>
              </div>
              </Fade>
              <Fade top cascade>
              <div class="tab-pane fade show bg-transparent" id="tab3">
                <p className='mb-3'>Relacionado aos Funcionários encontras aqui as Informações necessárias para gerir qualquer conta, nomeadamente:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Tabela com Registos dos Funcionários Atualizados.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Todas as Informações Relacionadas aos Funcionários Cadastrados.</h4>
                </div>
                <p className='mb-3'>O senhor tem o poder de efetuar aqui as seguintes operações:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Conceder Acesso ao Sistema.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Remover Acesso ao Sistema, por Tempo Indeterminado.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Eliminar Conta do Sistema, Definitivamente.</h4>
                </div>
              </div>
                </Fade>

                <Fade top cascade>
              <div class="tab-pane fade show bg-transparent" id="tab4">
                <p className='mb-3'>Relacionado aos Encarregados encontras aqui as Informações necessárias para gerir qualquer conta, nomeadamente:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Tabela com Registos dos Encarregados Atualizados.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Todas as Informações Relacionadas aos Encarregados Cadastradas.</h4>
                </div>
                <p className='mb-3'>O senhor tem o poder de efetuar aqui as seguintes operações:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Conceder Acesso ao Sistema.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Remover Acesso ao Sistema, por Tempo Indeterminado.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Eliminar Conta do Sistema, Definitivamente.</h4>
                </div>
                </div>
                </Fade>
                <Fade top cascade>
                <div class="tab-pane fade show bg-transparent" id="tab5">
                <p className='mb-3'></p>
                
                <p className='mb-3'>Relacionado aos Coordenadores encontras aqui as Informações necessárias para gerir qualquer conta, nomeadamente:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Tabela com Registos dos Coordenadores Atualizados.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Todas as Informações Relacionadas aos Coordenadores Cadastrados.</h4>
                </div>
                <p className='mb-3'>O senhor tem o poder de efetuar aqui as seguintes operações:</p>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Conceder Acesso ao Sistema.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Remover Acesso ao Sistema, por Tempo Indeterminado.</h4>
                </div>
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-check"></i>
                  <h4>Eliminar Conta do Sistema, Definitivamente.</h4>
                </div>
              </div>
              </Fade>
            </div>
          </div>
          
          <Fade right>
                <div class="col-lg-6">
                    <Image src={foto} className='img-fluid'></Image>
                </div>
            </Fade>
        </div>
                </div>
            </section>
        </div>
    )
}

export default Introdution;