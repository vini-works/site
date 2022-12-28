class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
      this.innerHTML = `

      
  
      <div class="fixed__content">
      
      <div class="display__grid__75_25">
      
      <section>
          <h5>
            Vinícius Queiróz é um visual designer
            que está procurando fazer barulho ao redor.
            interessado em design editorial, interfaces e sinalização.
          </h5>
        </section>
        
        <section>
          <div id="about" onclick="detailsSwtich()" class="link wrapper__about__content_interna">
            <h5><span></span> Sobre</h5>
            <h5 id="Switch__Text">+ Detalhes</h5>
          </div>
  
          <div class="about__content">
            <br>
            <hr></hr>
            <a href="https://www.instagram.com/vviniciusqueiroz/" target="_blank"> 
              <div class="link">
                <h5>@vviniciusqueiroz</h5>
              </div>
              </a>
            <hr></hr>
            <a href="mailto:vnsqzs@gmail.com"> 
              <div class="link">
                <h5>vnsqzs@gmail.com</h5>
              </div>
            </a>
            <hr></hr>
            <a href="https://www.behance.net/vviniciusqueiroz"> 
              <div class="link">
                <h5>Behance</h5>
              </div>
            </a>
            <hr></hr>
            <br>
            <h5> Colaborou com <a class="link" target="_blank" href="https://valkiriaic.com.br/">Valkiria Inteligência
                Criativa</a>, Estúdio Biabum e músicos independentes.</h5>
            <br>
            <h5>
              Desenvolve sua carreira como designer e diretor de arte, além de apoiar-se em conceitos que
              aprendeu durante a faculdade de Sistemas de Informação pela Universidade Federal de Mato Grosso. Busca,
              com o seu trabalho, usar de pensamentos sistêmicos para criar soluções visuais envolventes e
              culturalmente orientadas para projetos transformadores.
            </h5>
  
            <br>
  
            <div>
              <hr></hr>
              <h5>EXPERIÊNCIAS</h5>
              <hr></hr>
  
  
              <h5>
                Designer Júnior
                <br>
                <a href="https://www.estudiogole.com/" class="link" target="_blank">Estúdio Gole</a>
                <br>
                Mar. 2022 até Presente
                <br>
                ----
              </h5>
  
              <h5>
                Freelancing
                <br>
                Jun. 2021 até Fev. 2022
                <br>
                ----
              </h5>
  
              <h5>
                Diretor de Arte (Estágio)
                <br>
                Instituto Euvaldo Lodi Mato Grosso
                <br>
                Out. 2019 até Mai. 2021
                <br>
                ----
              </h5>
              <h5>
                Desenvolvedor Frontend (Júnior)
                <br>
                Código5 Web
                <br>
                Ago. 2018 até Ago. 2019
              </h5>
              <br>
            </div>
  
            <div>
              <hr></hr>
                <h5>Educação</h5>
              <hr></hr>
  
              <h5>
                Decodificando Identidades
                <br>
                Aprender Design
                <br>
                Carlos Bocai e Julia B. Aguiar
                <br>
                Ago. 2021
                <br>
                <a href="https://www.aprender.design/certificado/c7XXMcJhnaF1hG9PJ74HwL" target="_blank"> 
                  <div class="link">
                    <h5>→ Credencial</h5>
                  </div>
                </a>
                <br>
                ----
              </h5>
  
              <h5>
                Building an immersive creative website from scratch without frameworks
                <br>
                Awwwards Academy
                <br>
                Jun. 2021
                <br>
  
                <a href="https://drive.google.com/file/d/1aNn6M5r0DtNPSDlwLDlpnMw_VP5bxw2N/view" target="_blank"> 
                  <div class="link">
                    <h5>→ Credencial</h5>
                  </div>
                </a>
  
                <br>
                ----
              </h5>
  
              <h5>
                Sistemas de Informação
                <br>
                Universidade Federal do Estado de Mato Grosso
                <br>
                Mai. 2019 - Descontinuado
                <br>
              </h5>
            </div>
            <br>
            <div>
              <hr></hr>
                <h5>Aparições</h5>
              <hr></hr>
              <h5>
                Brasil Design Awards 2022 @Shorlist
                <br>
                GreenKitchen
              </h5>
            </div>
          </div>
        </section>
      </div>
    </div>

      `;
  }

}

customElements.define('main-header', Header);
