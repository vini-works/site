let currentIndex = 0;
let selectedProjectMedia = [];

// Function to open the carousel
export function openCarousel(projectMediaElements, index) {
    currentIndex = index;
    selectedProjectMedia = projectMediaElements;
    updateCarousel();
    document.getElementById('carouselModal').style.display = 'flex';
}

// Function to close the carousel
export function closeCarousel() {
    document.getElementById('carouselModal').style.display = 'none';
}

// Function to update the carousel display
export function updateCarousel() {
    const carouselMedia = document.getElementById('carouselMedia');
    carouselMedia.innerHTML = '';

    const selectedMedia = selectedProjectMedia[currentIndex].cloneNode(true);
    selectedMedia.style.maxHeight = '90vh';
    selectedMedia.style.objectFit = 'contain';

    if (selectedMedia.tagName === 'VIDEO') {
        selectedMedia.controls = true;
        selectedMedia.autoplay = true;
        selectedMedia.loop = true;
        selectedMedia.muted = false;
    }

    carouselMedia.appendChild(selectedMedia);
}

// Function to navigate to the previous media
export function prevMedia() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : selectedProjectMedia.length - 1;
    updateCarousel();
}

// Function to navigate to the next media
export function nextMedia() {
    currentIndex = (currentIndex < selectedProjectMedia.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
}

// New function to set up the carousel modal
export function setupCarouselModal() {
    const carouselModal = document.createElement('div');
    carouselModal.id = 'carouselModal';
    carouselModal.classList.add('carousel-modal');
    carouselModal.innerHTML = `
        <div id="carouselMedia" class="carousel-media"></div>
        <button id="closeModal" class="close-modal">X</button>
    `;
    document.body.appendChild(carouselModal);

    // Close modal event
    document.getElementById('closeModal').addEventListener('click', closeCarousel);

    // Click event for navigating media
    carouselModal.addEventListener('click', (event) => {
        if (event.target !== document.getElementById('closeModal')) {
            const rect = carouselModal.getBoundingClientRect();
            if (window.innerWidth >= 728) { // Only allow navigation on desktop
                (event.clientX < rect.width / 2 ? prevMedia : nextMedia)();
            } else {
                // No action on mobile
                event.stopPropagation(); // Prevent default behavior
            }
        }
    });
}
