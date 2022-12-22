class Slider extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
       
        <section class="splide">
        <div class="splide__track">
      <ul class="splide__list">

        <li class="splide__slide"> <img loading="lazy" class="link__item__image" src="/images/covers/yas.jpg" width="100%" />
          <h5><span></span> Yas [Breve]</h5>
        </li>

        <li class="splide__slide"> <a class="link__item" href="https://www.behance.net/gallery/154269771/GreenKitchen" target="_blank"><img loading="lazy"
          class="link__item__image" src="/images/covers/C02.jpg" width="100%" />
        <h5><span></span> Centopeia [Breve]</h5>
      </a>
    </li>

        <li class="splide__slide"> <a class="link__item" href="https://www.behance.net/gallery/154269771/GreenKitchen" target="_blank"><img loading="lazy"
          class="link__item__image" src="/images/covers/gk.jpg.webp" width="100%" />
            <h5><span></span> GreenKitchen [BEHANCE]</h5>
          </a>
        </li>

        <li class="splide__slide"> <a class="link__item" href="/calendario22"><img loading="lazy" class="link__item__image" src="/images/calendario2022/IMG_1014.webp"
              width="100%" />
            <h5><span></span> Calendário 2022</h5>
          </a>
        </li>

        <li class="splide__slide"> <a class="link__item" href="/turbo"><img loading="lazy" class="link__item__image" src="/images/covers/turbo.png" width="100%" />
            <h5><span></span> Turbo</h5>
          </a>
        </li>

        <li class="splide__slide"> <a class="link__item" href="/arquivo"><img loading="lazy" class="link__item__image" src="/images/covers/lvxz.png" width="100%" />
            <h5><span></span> Arquivo</h5>
          </a>
        </li>

        <li class="splide__slide"> <a class="link__item" href="ilustrascoes"><img loading="lazy" class="link__item__image" src="/images/covers/lab.png" width="100%" />
            <h5><span></span> Ilustrações</h5>
          </a>
        </li>

        <li class="splide__slide"> <a class="link__item" href="/rr"><img loading="lazy" class="link__item__image" src="/images/covers/studiorr-cover.png" width="100%" />
            <h5><span></span> Studio Ronaldo Rezende</h5>
          </a>
        </li>

      </ul>
    </div>
  </section>
      `;
    }

}

customElements.define('slider-from-splider', Slider);
