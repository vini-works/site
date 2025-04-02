// Variáveis globais
let currentIndex = 0; // Armazena o índice do item atualmente visível no carousel
let selectedProjectMedia = []; // Armazena as mídias (imagens/vídeos) do projeto selecionado

/**
 * Abre o carousel e carrega as mídias
 * @param {Array} projectMediaElements - Lista de mídias do projeto
 * @param {number} index - Índice da mídia selecionada
 */
export function openCarousel(projectMediaElements, index) {
    currentIndex = index;
    selectedProjectMedia = projectMediaElements;
    document.getElementById('carouselModal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Desabilita o scroll da página
    loadCarousel();

    // Adiciona o evento para fechar com Esc
    document.addEventListener('keydown', handleEscKey);
}

/**
 * Carrega as mídias do carousel
 */
export function loadCarousel() {
    const carouselMedia = document.getElementById('carouselMedia');
    carouselMedia.innerHTML = ''; // Limpa as mídias anteriores

    selectedProjectMedia.forEach((mediaElement, index) => {
        const media = mediaElement.cloneNode(true); // Clona o elemento de mídia

        // Se for um vídeo, configura as propriedades do player
        if (media.tagName === 'VIDEO') {
            media.controls = false;
            media.autoplay = true;
            media.loop = true;
            media.muted = true;
        }

        carouselMedia.appendChild(media); // Adiciona a mídia ao carousel

        // Faz a imagem clicada ser visível no centro da tela
        if (index === currentIndex) {
            const selectedImage = media;
            setTimeout(() => {
                selectedImage.scrollIntoView({
                    behavior: 'instant', // O scroll é imediato
                    block: 'center',
                    inline: 'center',
                });
            }, 0);
        }
    });

    // Configura o container de mídias
    const carouselMediaContainer = document.getElementById('carouselMedia');
    carouselMediaContainer.style.overflowY = 'auto'; // Permite o scroll vertical
    carouselMediaContainer.style.maxHeight = '100vh'; // Define a altura máxima para o container de mídias
    carouselMediaContainer.style.display = 'flex'; // Para usar o flexbox
    carouselMediaContainer.style.flexDirection = 'column'; // Organiza as imagens em uma coluna
    carouselMediaContainer.style.gap = '0.6rem'; // Define o gap fixo de 10px entre as imagens
}

/**
 * Fecha o modal do carousel
 */
export function closeCarousel() {
    const modal = document.getElementById('carouselModal');
    modal.classList.remove('show'); // Remove a classe para ativar a saída suave

    setTimeout(() => {
        modal.style.display = 'none'; // Após a animação, esconde o modal
        document.body.style.overflow = ''; // Restaura o scroll da página
    }, 400); // O tempo precisa ser o mesmo da transição CSS

    document.removeEventListener('keydown', handleEscKey);
}

/**
 * Configura o modal do carousel (cria o modal se não existir)
 */
export function setupCarouselModal() {
    let carouselModal = document.getElementById('carouselModal');

    if (!carouselModal) {
        // Cria o modal caso ele não exista
        carouselModal = document.createElement('div');
        carouselModal.id = 'carouselModal';
        carouselModal.classList.add('carousel-modal');
        carouselModal.innerHTML = `
            <div id="carouselMedia" class="carousel-media"></div>
            <p id="closeModal" class="close-modal">Close [ESC]</p>
        `;
        document.body.appendChild(carouselModal); // Adiciona o modal ao corpo da página
    }

    carouselModal.style.overflowY = 'auto';
    carouselModal.style.maxHeight = '100vh';

    document.getElementById('closeModal').addEventListener('click', closeCarousel); // Adiciona o evento de fechar o modal

    // Inicializa o modal fechado
    carouselModal.style.display = 'none';
}

// Fecha o modal ao pressionar a tecla Esc
function handleEscKey(event) {
    if (event.key === 'Escape') {
        closeCarousel();
    }
}