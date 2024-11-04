document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    let projectsData = [];

    fetch('js/content/projectData.json')
        .then(response => response.json())
        .then(jsonData => {
            projectsData = jsonData;
            renderProjects(projectsData);
        })
        .catch(error => console.log(error));

    searchInput.addEventListener('input', (event) => {
        const keyword = event.target.value.toLowerCase();

        document.querySelectorAll('.project__list').forEach((projectElement, index) => {
            const projectData = projectsData[index];
            const isMobile = window.innerWidth < 728;

            const fieldsToCheck = isMobile ? ['year', 'project'] : ['year', 'project', 'type', 'client'];

            const matches = fieldsToCheck.some(field =>
                projectData[field] && projectData[field].toLowerCase().includes(keyword)
            );

            projectElement.style.display = 'block';

            const textElements = projectElement.querySelectorAll(
                '.item__project__list__year, ' +
                '.item__project__list__project, ' +
                '.item__project__list__type, ' +
                '.item__project__list__client'
            );

            textElements.forEach(textEl => {
                if (isMobile && (textEl.classList.contains('item__project__list__type') || textEl.classList.contains('item__project__list__client'))) {
                    textEl.style.display = 'none';
                } else {
                    textEl.style.display = matches || index === 0 ? 'block' : 'none';
                }
            });

            const projectDetails = projectElement.querySelector('.project__details');
            projectDetails.style.padding = matches ? '0.6rem 0' : '0.3rem 0'; // Ajuste de padding
            projectDetails.style.transition = 'padding 0.3s ease'; // Transição para padding
        });
    });

    function renderProjects(data) {
        const container = document.getElementById('project__container');
        container.innerHTML = '';

        data.forEach((projectList, index) => {
            const wrapperElement = document.createElement('div');
            wrapperElement.classList.add('project__list');

            if (projectList.images && projectList.images.length > 0) {
                wrapperElement.addEventListener('click', () => {
                    if (projectList.link) {
                        window.location.href = projectList.link;
                    }
                });
                wrapperElement.classList.add('clickable');
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
                        mediaElement.setAttribute('playsinline', ''); // Mantém o vídeo inline em mobile
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
                
                    // Verifica se não está em mobile para adicionar o evento de clique
                    if (window.innerWidth >= 728) {
                        figure.addEventListener('click', (e) => {
                            e.stopPropagation();
                            openCarousel(projectMediaElements, projectMediaElements.indexOf(mediaElement));
                        });
                    }
                
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

    function openCarousel(projectMediaElements, index) {
        currentIndex = index;
        selectedProjectMedia = projectMediaElements;
        updateCarousel();
        document.getElementById('carouselModal').style.display = 'flex';
    }

    function closeCarousel() {
        document.getElementById('carouselModal').style.display = 'none';
    }

    function updateCarousel() {
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

    function prevMedia() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : selectedProjectMedia.length - 1;
        updateCarousel();
    }

    function nextMedia() {
        currentIndex = (currentIndex < selectedProjectMedia.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    const carouselModal = document.createElement('div');
    carouselModal.id = 'carouselModal';
    carouselModal.classList.add('carousel-modal');
    carouselModal.innerHTML = `
        <div id="carouselMedia" class="carousel-media"></div>
        <button id="closeModal" class="close-modal">X</button>
    `;
    document.body.appendChild(carouselModal);

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.addEventListener('click', closeCarousel);

    carouselModal.addEventListener('click', (event) => {
        if (event.target !== closeModalButton) {
            const rect = carouselModal.getBoundingClientRect();
            if (event.clientX < rect.width / 2) {
                prevMedia();
            } else {
                nextMedia();
            }
        }
    });
});
