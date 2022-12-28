class Proj extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
      this.innerHTML = `

    <div class="fixed__content project__page">

        <section class="column__1">

            <div id="about" onclick="detailsSwtich()">
                <a class="wrapper__about__content_interna link">
                    <h5><span></span> Projetos</h5>
                    <h5  id="switch__text">+ Detalhes</h5>
                    <h5><span></span></h5>
                </a>
            </div>

            <div class="about__content about__content__interna">
                <div class="display__grid__4">
                    <div></div>
                    <div>
                        <hr>
                        <a  href="/" class="about__detalhes link">
                        <h5> ▚▚▚▚ Página Inicial</h5>
                        </a>
                        <hr>
                        <a class="hover__image" href="#">
                            <div class="link">
                                <h5><span></span> Yas [Breve]</h5>
                            </div>
                        </a>
                        <hr>
                        <a href="#">
                            <div class="link">
                                <h5><span></span> Centopeia [Breve]</h5>
                            </div>
                        </a>
                        <hr>
                        <a href="https://www.behance.net/gallery/154269771/GreenKitchen">
                            <div class="link">
                                <h5><span></span> GreenKitchen [BEHANCE]</h5>
                            </div>
                        </a>
                        <hr>

                        <a href="/calendario22">
                            <div class="link">
                                <h5><span></span> Calendário 2022</h5>
                            </div>
                        </a>
                        <hr>

                        <a href="/turbo">
                            <div class="link">
                                <h5><span></span> Turbo</h5>
                            </div>
                        </a>
                        <hr>

                        <a href="arquivo">
                            <div class="link">
                                <h5><span></span> Arquivo</h5>
                            </div>
                        </a>
                        <hr>

                        <a href="ilustracoes">
                            <div class="link">
                                <h5><span></span> Ilustrações</h5>
                            </div>
                        </a>
                        <hr>

                        <a href="/rr">
                            <div class="link">
                                <h5><span></span> Studio Ronaldo Rezende</h5>
                            </div>
                        </a>
                        <hr>
                    </div>
                </div>
            </div>
        </section>
    </div>


      `;
  }

}

customElements.define('proj-header', Proj);
