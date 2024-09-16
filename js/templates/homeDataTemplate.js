// Função para renderizar o template
function renderTemplate(data) {
  let container = document.getElementById('project__container')

  // Laço de repetição para percorrer os dados do JSON
  for (let i = 0; i < data.length; i++) {
    let projectList = data[i]

    // Criar um elemento div para cada projectList e adicionar a classe 'projectList'
    let wrapperElement = document.createElement('a')
    wrapperElement.classList.add('project__list')

    // Verificar se a propriedade 'link' está presente no objeto JSON
    if (projectList.link) {
      wrapperElement.href = projectList.link;
    } else {
      wrapperElement.classList.add('no__link');
      wrapperElement.addEventListener('click', function (e) {
        e.preventDefault()
        e.stopPropagation()
        return false;
      }, false);
    }

    if (i === 0) {
      wrapperElement.classList.add('sticky')
    }


    // Criar os elementos HTML usando os dados do JSON e aplicar as classes CSS correspondentes
    let elements = ['year', 'project', 'type', 'client', 'info']
    for (let j = 0; j < elements.length; j++) {
      let element = document.createElement('p')
      element.textContent = projectList[elements[j]]
      wrapperElement.appendChild(element);

      // Adicionar a classe correspondente para cada chave
      element.classList.add(`item__project__list__${elements[j]}`)
    }

    // Adicionar a projectList ao container
    container.appendChild(wrapperElement)
  }

  // Verifica o o caminho após a url
  function getCurrentPathaname() {
    return window.location.pathname
  }
}

// Carregar o arquivo JSON usando o método fetch
fetch('js/content/projectData.json')
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    // Chamar a função para renderizar o template com os dados do JSON
    renderTemplate(data)
  })

