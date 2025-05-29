import { openCarousel } from './carousel.js';

export function renderProjects(data, container) {
    container.innerHTML = '';

    data.forEach((projectList) => {
        const wrapperElement = document.createElement('div');
        wrapperElement.classList.add('project__list');

        const projectDetails = document.createElement('div');
        projectDetails.classList.add('project__details');

        //'client'
        ['year', 'project', 'type'].forEach((element) => {
            const el = document.createElement('p');
            el.textContent = projectList[element];
            el.classList.add(`item__project__list__${element}`);
            projectDetails.appendChild(el);
        });

        wrapperElement.appendChild(projectDetails);

        const hasImages = projectList.images && projectList.images.length > 0;

        if (hasImages) {
            wrapperElement.classList.add('clickable');
            wrapperElement.addEventListener('click', async (e) => {
                e.preventDefault();
                const projectMediaElements = await loadMediaElements(projectList.images);
                openCarousel(projectMediaElements, 0);
            });
        } else {
            wrapperElement.classList.add('no__link');
            wrapperElement.style.pointerEvents = 'none';
        }

        container.appendChild(wrapperElement);
    });
}

async function loadMediaElements(imageUrls) {
    const mediaElements = [];

    for (const mediaUrl of imageUrls) {
        let element;

        if (mediaUrl.includes('vimeo.com')) {
            element = document.createElement('iframe');
            element.setAttribute('src', `${mediaUrl}?autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&playsinline=1&dnt=1`);
            element.setAttribute('frameborder', '0');
            element.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
            element.setAttribute('referrerpolicy', 'origin');
            element.style.width = '100%';
            element.style.height = '80vh';
            element.setAttribute('loading', 'lazy');

            const aspectRatio = await fetchVimeoAspectRatio(mediaUrl);
            element.style.aspectRatio = aspectRatio;
        } else {
            element = document.createElement('img');
            element.setAttribute('src', mediaUrl);
            element.setAttribute('loading', 'lazy');
            element.style.maxWidth = '100%';
        }

        mediaElements.push(element);
    }

    return mediaElements;
}

async function fetchVimeoAspectRatio(url) {
    const videoId = url.split('/').pop();
    const apiUrl = `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const width = data.width;
        const height = data.height;
        return `${width} / ${height}`; // <- formato esperado pelo CSS
    } catch (error) {
        console.error('Erro ao obter aspect ratio do Vimeo:', error);
        return '16 / 9'; // fallback válido
    }
}

