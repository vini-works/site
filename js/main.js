import { fetchProjectsData } from './fetchData.js';
import { setupSearch } from './search.js';
import { renderProjects } from './renderProjects.js';
import { openCarousel, closeCarousel, prevMedia, nextMedia, setupCarouselModal } from './carousel.js';

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('searchInput');
    const projectContainer = document.getElementById('project__container');
    const projectsData = await fetchProjectsData();

    renderProjects(projectsData, projectContainer);
    setupSearch(searchInput, projectsData);
    
    // Setup carousel modal
    setupCarouselModal();
});
