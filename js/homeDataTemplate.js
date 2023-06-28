// Função para renderizar o template
function renderTemplate(data) {
  let container = document.getElementById("project__container");

  // Laço de repetição para percorrer os dados do JSON
  for (let i = 0; i < data.length; i++) {
    let projectList = data[i];

    // Criar um elemento div para cada projectList e adicionar a classe "projectList"
    let wrapperElement = document.createElement("a");
    wrapperElement.classList.add("project__list");

    wrapperElement.href = projectList.link;

    // Verificar se a propriedade "link" está presente no objeto JSON
    if (projectList.link) {
      wrapperElement.href = projectList.link;
    } else {
      wrapperElement.classList.add("no__link");
      wrapperElement.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, false);
    }

    // Criar os elementos HTML usando os dados do JSON e aplicar as classes CSS correspondentes
    let yearElement = document.createElement("p");
    yearElement.textContent = projectList.year;

    let projectElement = document.createElement("p");
    projectElement.textContent = projectList.project;

    let typeElement = document.createElement("p");
    typeElement.textContent = projectList.type;

    let clientElement = document.createElement("p");
    clientElement.textContent = projectList.client;

    let moreElement = document.createElement("p");
    moreElement.textContent = projectList.more;


    //Adicionando classes ao elementos
    yearElement.classList.add("item__project__list");
    projectElement.classList.add("item__project__list");
    typeElement.classList.add("item__project__list");
    clientElement.classList.add("item__project__list");
    clientElement.classList.add("item__project__list__studio");
    moreElement.classList.add("item__project__list");
    moreElement.classList.add("item__project__list__more");


    // Adicionar os elementos ao elemento da projectList
    wrapperElement.appendChild(yearElement);
    wrapperElement.appendChild(projectElement);
    wrapperElement.appendChild(typeElement);
    wrapperElement.appendChild(clientElement);
    wrapperElement.appendChild(moreElement);

    // Adicionar a projectList ao container
    container.appendChild(wrapperElement);
  }
}

// Carregar o arquivo JSON usando o método fetch
fetch('js/content/projects.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Chamar a função para renderizar o template com os dados do JSON
    renderTemplate(data);
  })


