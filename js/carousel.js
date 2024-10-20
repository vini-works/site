let currentIndex = 0;
let mediaElements = [];

// Função para verificar se o dispositivo é mobile
function isMobile() {
    return window.innerWidth <= 768; // Defina a largura máxima para considerar mobile
}

document.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os elementos de mídia na galeria
    const galleryItems = document.querySelectorAll(".gallery-container img, .gallery-container video");
    mediaElements = Array.from(galleryItems);

    // Adiciona evento de clique para cada item da galeria
    mediaElements.forEach((media, index) => {
        // Apenas adiciona o evento se não for mobile
        if (!isMobile()) {
            media.addEventListener("click", () => openCarousel(index));
        }
    });

    // Cria e adiciona o modal ao body
    const carouselModal = document.createElement("div");
    carouselModal.id = "carouselModal";
    carouselModal.classList.add("carousel-modal");
    carouselModal.innerHTML = `
        <div id="carouselMedia" class="carousel-media"></div>
        <button id="closeModal" class="close-modal">X</button>
    `;
    document.body.appendChild(carouselModal);

    // Adiciona evento para fechar o modal ao clicar no botão de fechar
    const closeModalButton = document.getElementById("closeModal");
    closeModalButton.addEventListener("click", closeCarousel);

    // Adiciona evento de clique no modal para navegação
    carouselModal.addEventListener("click", (event) => {
        // Verifica se o clique não foi no botão de fechar
        if (event.target !== closeModalButton) {
            const rect = carouselModal.getBoundingClientRect();
            // Verifica se o clique foi na metade esquerda ou direita da tela
            if (event.clientX < rect.width / 2) {
                prevMedia();
            } else {
                nextMedia();
            }
        }
    });

    // Adiciona evento para prevenir seleção ao abrir o modal
    carouselModal.addEventListener("mousedown", (event) => {
        event.preventDefault(); // Previne a seleção de texto
    });
});

function openCarousel(index) {
    currentIndex = index;
    updateCarousel();
    document.getElementById("carouselModal").style.display = "flex";
}

function closeCarousel() {
    document.getElementById("carouselModal").style.display = "none";
}

function updateCarousel() {
    const carouselMedia = document.getElementById("carouselMedia");
    carouselMedia.innerHTML = "";

    const selectedMedia = mediaElements[currentIndex].cloneNode(true);
    selectedMedia.style.maxHeight = "90vh";
    selectedMedia.style.objectFit = "contain";
    carouselMedia.appendChild(selectedMedia);
}

function prevMedia() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : mediaElements.length - 1;
    updateCarousel();
}

function nextMedia() {
    currentIndex = (currentIndex < mediaElements.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}

document.addEventListener("DOMContentLoaded", () => {
    const figures = document.querySelectorAll("figure");
    const mediaElements = document.querySelectorAll("figure img, figure video");

    // Função para calcular e definir a altura máxima
    function setMaxHeight() {
        let maxHeight = 0;

        // Determina a altura máxima da mídia
        mediaElements.forEach(media => {
            const height = media.clientHeight;
            if (height > maxHeight) maxHeight = height;
        });

        // Aplica a altura máxima a todas as figures
        figures.forEach(figure => {
            figure.style.height = `${maxHeight}px`;
        });
    }

    // Verifica o carregamento de cada mídia e então chama setMaxHeight
    Promise.all(Array.from(mediaElements).map(media => {
        return new Promise(resolve => {
            if (media.tagName === 'VIDEO') {
                media.addEventListener("loadedmetadata", () => resolve());
            } else if (media.complete) { // Para imagens já carregadas
                resolve();
            } else {
                media.addEventListener("load", () => resolve());
            }
        });
    })).then(setMaxHeight);
});

