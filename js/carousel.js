// Variáveis globais
let currentIndex = 0; // Armazena o índice do item atualmente visível no carousel
let selectedProjectMedia = []; // Armazena as mídias (imagens/vídeos) do projeto selecionado

/**
 * Abre o carousel e carrega as mídias
 * @param {Array} projectMediaElements - Lista de mídias do projeto
 * @param {number} index - Índice da mídia selecionada
 */
export function openCarousel(projectMediaElements, index) {
    currentIndex = index; // Atualiza o índice da mídia
    selectedProjectMedia = projectMediaElements; // Armazena as mídias do projeto
    document.getElementById('carouselModal').style.display = 'flex'; // Exibe o modal
    loadCarousel(); // Carrega as mídias no carousel
}

/**
 * Carrega as mídias do carousel
 */
export function loadCarousel() {
    const carouselMedia = document.getElementById('carouselMedia');
    carouselMedia.innerHTML = ''; // Limpa as mídias anteriores

    selectedProjectMedia.forEach((mediaElement, index) => {
        const media = mediaElement.cloneNode(true); // Clona o elemento de mídia
        media.style.maxHeight = '80vh'; // Define a altura máxima da mídia
        media.style.objectFit = 'contain'; // Ajusta o tamanho para que a imagem ou vídeo caiba na tela

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
    document.getElementById('carouselModal').style.display = 'none'; // Oculta o modal
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
            <button id="closeModal" class="close-modal">X</button>
        `;
        document.body.appendChild(carouselModal); // Adiciona o modal ao corpo da página
    }

    carouselModal.style.overflowY = 'auto';
    carouselModal.style.maxHeight = '100vh';

    document.getElementById('closeModal').addEventListener('click', closeCarousel); // Adiciona o evento de fechar o modal

    // Inicializa o modal fechado
    carouselModal.style.display = 'none';
}
