function createNav() {
    let container = document.getElementById("nav__container");

    const link1 = document.createElement('a');
    const link2 = document.createElement('a');
    const works = document.createElement('a');
    const paragraph2 = document.createElement('p');

    link1.href = '/';
    link1.textContent = 'Vinícius Queiróz';

    works.textContent = '[works]';
    if (window.location.pathname === '/' || window.location.pathname === `/index.html`) {
        works.href = "#project__container";
    }

    link2.href = '/';
    link2.textContent = '[about]';

    paragraph2.innerHTML = `
    <div class="toggle-container">
        <input type="checkbox" id="themeToggle" class="ios-toggle">
        <label for="themeToggle" class="toggle-label"></label>
    </div>
`;

    container.appendChild(link1);
    container.appendChild(works);
    container.appendChild(link2);
    container.appendChild(paragraph2);

}

createNav();
