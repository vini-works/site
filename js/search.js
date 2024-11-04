export function setupSearch(searchInput, projectsData) {
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
}
