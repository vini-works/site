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
            wrapperElement.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }, false);
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
                let mediaElement;
                const mediaName = mediaUrl.split('/').pop();

                if (mediaUrl.endsWith('.mp4')) {
                    mediaElement = document.createElement('video');
                    mediaElement.src = mediaUrl;
                    mediaElement.autoplay = true;
                    mediaElement.loop = true;
                    mediaElement.muted = true;
                    mediaElement.setAttribute('playsinline', ''); // Ensures video plays inline on mobile
                    mediaElement.style.maxWidth = '100%';
                } else {
                    mediaElement = document.createElement('img');
                    mediaElement.src = mediaUrl;
                    mediaElement.style.maxWidth = '100%';
                }

                const figcaption = document.createElement('figcaption');
                figcaption.textContent = mediaName;

                figure.appendChild(mediaElement);
                figure.appendChild(figcaption);

                // Add mediaElement to projectMediaElements for carousel use
                projectMediaElements.push(mediaElement);

                // Add click event for desktop
                figure.addEventListener('click', (e) => {
                    if (window.innerWidth >= 728) { // Only allow click on desktop
                        e.stopPropagation();
                        openCarousel(projectMediaElements, projectMediaElements.indexOf(mediaElement));
                    } else {
                        // Prevent click event on mobile
                        e.stopPropagation(); // Prevent default behavior
                    }
                });

                galleryContainer.appendChild(figure);
            });

            const totalFigures = projectList.images.length;
            const remainder = totalFigures % 5;

            if (remainder !== 0) {
                const blocksToAdd = 5 - remainder;
                for (let i = 0; i < blocksToAdd; i++) {
                    const emptyFigure = document.createElement('figure');
                    emptyFigure.classList.add('empty-figure'); 
                    galleryContainer.appendChild(emptyFigure);
                }
            }
        }

        wrapperElement.appendChild(accordionContent);
        wrapperElement.addEventListener('click', function (e) {
            if (e.target.closest('figure')) {
                return;
            }
            e.preventDefault();
            accordionContent.classList.toggle('show'); 

            if (accordionContent.classList.contains('show')) {
                accordionContent.style.height = `${accordionContent.scrollHeight}px`; 
            } else {
                accordionContent.style.height = '0'; 
            }
        });

        container.appendChild(wrapperElement);
    });
}
