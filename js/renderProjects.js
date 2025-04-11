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
                let mediaName = mediaUrl.split('/').pop();

                if (mediaUrl.includes('vimeo.com')) {
                    mediaElement = document.createElement('iframe');
                    mediaElement.setAttribute('data-src', `${mediaUrl}?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1`);
                    mediaElement.setAttribute('frameborder', '0');
                    mediaElement.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
                    mediaElement.setAttribute('referrerpolicy', 'origin');
                    mediaElement.style.width = '100%';
                    mediaElement.style.height = 'auto';
                    mediaElement.setAttribute('loading', 'lazy');

                    mediaName += 'vimeo.mp4';

                    fetchVimeoAspectRatio(mediaUrl).then((aspectRatio) => {
                        mediaElement.style.aspectRatio = aspectRatio;
                    });

                    mediaElement.onload = () => {
                        figure.classList.remove('media-placeholder');
                        figure.classList.add('loaded');
                    };

                    mediaElement.setAttribute('src', mediaElement.getAttribute('data-src'));
                } else {
                    mediaElement = document.createElement('img');
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

                figure.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openCarousel(projectMediaElements, projectMediaElements.indexOf(mediaElement));
                });

                galleryContainer.appendChild(figure);
            });

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
            if (e.target.closest('figure')) return;
            if (wrapperElement.classList.contains('no__link')) return;

            e.preventDefault();

            accordionContent.classList.toggle('show');
            const gallery = accordionContent.querySelector('.gallery-container');

            if (accordionContent.classList.contains('show')) {
                loadMedia(accordionContent);
                setupVimeoObservers(accordionContent);

                // Aplica template de grid aleatório apenas uma vez
                if (window.innerWidth >= 728) {
                    if (!gallery.dataset.gridTemplate) {
                        gallery.dataset.gridTemplate = generateRandomGridTemplate();
                    }
                    gallery.style.gridTemplateColumns = gallery.dataset.gridTemplate;
                } else {
                    gallery.style.gridTemplateColumns = ''; // limpa em breakpoints menores
                }


                // Aguarda dois frames para garantir que layout foi refluído
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        accordionContent.style.height = `${accordionContent.scrollHeight}px`;
                    });
                });
            } else {
                accordionContent.style.height = '0';
            }
        });

        container.appendChild(wrapperElement);
    });
}

async function fetchVimeoAspectRatio(url) {
    const videoId = url.split('/').pop();
    const apiUrl = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return (data.width / data.height).toFixed(5);
    } catch (error) {
        console.error('Erro ao obter aspect ratio do Vimeo:', error);
        return '16/9';
    }
}

function loadMedia(containerElement) {
    const lazyMedia = containerElement.querySelectorAll('img[data-src]');
    lazyMedia.forEach((media) => {
        media.classList.add('fade-in');
        const dataSrc = media.getAttribute('data-src');
        media.setAttribute('src', dataSrc);
        media.removeAttribute('data-src');

        media.addEventListener('load', () => {
            containerElement.style.height = `${containerElement.scrollHeight}px`;
            media.classList.add('loaded');
        });
    });
}

function setupVimeoObservers(scopeElement) {
    const iframes = scopeElement.querySelectorAll('iframe[src*="vimeo.com"]');
    if (!iframes.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const iframe = entry.target;
                const player = new Vimeo.Player(iframe);

                if (entry.isIntersecting) {
                    player.play().catch(() => { });
                } else {
                    player.pause().catch(() => { });
                }
            });
        },
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }
    );

    iframes.forEach((iframe) => observer.observe(iframe));
}

function generateRandomGridTemplate() {
    const total = 10;
    const parts = 7;
    const cuts = new Set();

    while (cuts.size < parts - 1) {
        cuts.add(Math.floor(Math.random() * (total - 1)) + 1);
    }

    const sortedCuts = Array.from(cuts).sort((a, b) => a - b);
    const segments = [];

    let prev = 0;
    sortedCuts.forEach((cut) => {
        segments.push(cut - prev);
        prev = cut;
    });
    segments.push(total - prev);

    return segments.map((n) => `${n}fr`).join(' ');
}
