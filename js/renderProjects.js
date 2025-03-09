import { openCarousel } from './carousel.js';

export function renderProjects(data, container) {
    container.innerHTML = '';

    data.forEach((projectList, index) => {
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('project__list');

        if (projectList.images && projectList.images.length > 0) {
            wrapperElement.classList.add('clickable');
            wrapperElement.addEventListener('click', () => {
                if (projectList.link) {
                    window.location.href = projectList.link;
                }
            });
        } else {
            wrapperElement.classList.add('no__link');
            wrapperElement.addEventListener(
                'click',
                function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                },
                false
            );
        }

        if (index === 0) {
            wrapperElement.classList.add('sticky');
        }

        const projectDetails = document.createElement('div');
        projectDetails.classList.add('project__details');

        const elements = ['year', 'project', 'type', 'client'];
        elements.forEach((element) => {
            const el = document.createElement('p');
            el.textContent = projectList[element];
            el.classList.add(`item__project__list__${element}`);
            projectDetails.appendChild(el);
        });

        wrapperElement.appendChild(projectDetails);

        const accordionContent = document.createElement('div');
        accordionContent.classList.add('accordion__content');
        
        const galleryContainer = document.createElement('div');
        galleryContainer.classList.add('gallery-container');
        accordionContent.appendChild(galleryContainer);

        let projectMediaElements = [];

        if (projectList.images && projectList.images.length > 0) {
            projectList.images.forEach((mediaUrl) => {
                const figure = document.createElement('figure');
                figure.classList.add('media-placeholder');

                let mediaElement;
                const mediaName = mediaUrl.split('/').pop();

                if (mediaUrl.endsWith('.mp4')) {
                    mediaElement = document.createElement('video');
                    // Usa data-src para carregamento sob demanda
                    mediaElement.setAttribute('data-src', mediaUrl);
                    mediaElement.autoplay = true;
                    mediaElement.loop = true;
                    mediaElement.muted = true;
                    mediaElement.setAttribute('playsinline', '');
                    // Pré-carregamento evitado; será modificado para "auto" ao carregar
                    mediaElement.preload = 'none';
                    mediaElement.style.maxWidth = '100%';

                    mediaElement.addEventListener('canplaythrough', () => {
                        // Remove o placeholder assim que o vídeo estiver pronto
                        figure.classList.remove('media-placeholder');
                        figure.classList.add('loaded');
                        mediaElement.classList.add('loaded');
                    });
                } else {
                    mediaElement = document.createElement('img');
                    // Usa data-src para carregamento sob demanda
                    mediaElement.setAttribute('data-src', mediaUrl);
                    mediaElement.style.maxWidth = '100%';
                    mediaElement.setAttribute('loading', 'lazy');

                    mediaElement.onload = () => {
                        figure.classList.remove('media-placeholder');
                    };
                }

                const figcaption = document.createElement('figcaption');
                figcaption.textContent = mediaName;

                figure.appendChild(mediaElement);
                figure.appendChild(figcaption);

                projectMediaElements.push(mediaElement);

                // Abre o carousel ao clicar na mídia, se a largura da tela permitir
                figure.addEventListener('click', (e) => {
                    if (window.innerWidth >= 728) {
                        e.stopPropagation();
                        openCarousel(projectMediaElements, projectMediaElements.indexOf(mediaElement));
                    }
                });

                galleryContainer.appendChild(figure);
            });

            // Completa o grid, se necessário
            const totalFigures = projectList.images.length;
            const remainder = totalFigures % 10;
            if (remainder !== 0) {
                const blocksToAdd = 10 - remainder;
                for (let i = 0; i < blocksToAdd; i++) {
                    const emptyFigure = document.createElement('figure');
                    emptyFigure.classList.add('empty-figure');
                    galleryContainer.appendChild(emptyFigure);
                }
            }
        }

        wrapperElement.appendChild(accordionContent);

        wrapperElement.addEventListener('click', function (e) {
            // Impede o toggle se clicar em uma mídia
            if (e.target.closest('figure')) return;
            e.preventDefault();

            accordionContent.classList.toggle('show');

            if (accordionContent.classList.contains('show')) {
                // Carrega os assets somente quando o accordion é aberto
                loadMedia(accordionContent);
                accordionContent.style.height = `${accordionContent.scrollHeight}px`;
            } else {
                accordionContent.style.height = '0';
            }
        });

        container.appendChild(wrapperElement);
    });
}

// Carrega imagens e vídeos que usam lazy loading e atualiza a altura do container conforme os assets são carregados.
function loadMedia(containerElement) {
    const lazyMedia = containerElement.querySelectorAll('img[data-src], video[data-src]');
    lazyMedia.forEach((media) => {
        media.classList.add('fade-in'); // Adiciona a classe de transição
        const dataSrc = media.getAttribute('data-src');
        media.setAttribute('src', dataSrc);
        media.removeAttribute('data-src');

        if (media.tagName.toLowerCase() === 'video') {
            media.preload = 'auto';
            media.load();

            media.addEventListener('loadedmetadata', () => {
                containerElement.style.height = `${containerElement.scrollHeight}px`;
            });

            media.addEventListener('canplaythrough', () => {
                if (media.parentElement) {
                    media.parentElement.classList.remove('media-placeholder');
                    media.classList.add('loaded'); // Ativa a transição
                }
            });
        } else {
            media.addEventListener('load', () => {
                containerElement.style.height = `${containerElement.scrollHeight}px`;
                media.classList.add('loaded'); // Ativa a transição
            });
        }
    });
}
