document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', (event) => {
        const keyword = event.target.value.toLowerCase();
        filterProjects(keyword);
    });

    fetch('js/content/projectData.json')
        .then(response => response.json())
        .then(jsonData => {
            window.projectsData = jsonData;
            displayProjects(jsonData);
        })
        .catch(error => console.log(error));
});

function createProjectElement(project, index) {
    const wrapperElement = document.createElement('a');
    wrapperElement.classList.add('project__list');

    if (project.link) {
        wrapperElement.href = project.link;
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

    const elements = ['year', 'project', 'type', 'client', 'info'];
    for (let j = 0; j < elements.length; j++) {
        const element = document.createElement('p');
        element.textContent = project[elements[j]];
        wrapperElement.appendChild(element);
        element.classList.add(`item__project__list__${elements[j]}`);
    }

    return wrapperElement;
}

function displayProjects(projects) {
    const projectContainer = document.getElementById('project__container');
    projectContainer.innerHTML = '';

    projects.forEach((project, index) => {
        const projectElement = createProjectElement(project, index);
        projectContainer.appendChild(projectElement);
    });
}

function filterProjects(keyword) {
    const filteredProjects = window.projectsData.filter(project => {
        return Object.values(project).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(keyword)
        );
    });

    // Adiciona o primeiro item se ele não estiver na lista filtrada
    if (!filteredProjects.includes(window.projectsData[0])) {
        filteredProjects.unshift(window.projectsData[0]);
    }

    displayProjects(filteredProjects);
}
