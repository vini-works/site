// Função para renderizar o template
function renderTemplate__Personal(data) {
  let container = document.getElementById("personal__data__container");

  // Laço de repetição para percorrer os dados do JSON
  Object.keys(data).forEach(function (blocoKey) {
    let bloco = data[blocoKey];

    // Criar uma div para cada bloco de informações
    let div__block = document.createElement("div");
    div__block.classList.add("child__personal__data");

    // Exibir o nome do bloco
      let blocoNameElement = document.createElement("p");
      blocoNameElement.classList.add("block__name")
      blocoNameElement.textContent = blocoKey;
      div__block.appendChild(blocoNameElement);

    // Criar uma ul para cada bloco de informações
    var ul__tag = document.createElement("ul");

    // Laço de repetição para percorrer os dados do bloco
    bloco.forEach(function (item) {
      let keys = Object.keys(item);

      let li__tag = document.createElement("li");
      li__tag.classList.add("block__list");

      keys.forEach(function (key) {
        let pElement = document.createElement("p");
        pElement.textContent = item[key];
        pElement.classList.add("item__list");
        li__tag.appendChild(pElement);
        

        if (key === "period") {
          pElement.classList.add("no");
        }

      });

      ul__tag.appendChild(li__tag);
    });

    div__block.appendChild(ul__tag);
    container.appendChild(div__block);
  });
}

fetch('js/content/exp.json')
  .then(response => response.json())
  .then(data => {
    // Chamar a função para renderizar o template com os dados do JSON
    renderTemplate__Personal(data);
  })
  .catch(error => {
    console.error(error);
  });
