// projectKeyIdentifier é referente ao valor real da chave que você deseja encontrar nos dados JSON.
// Neste caso, o valor real da chave está atrelado ao arquivo /content/projects.json, na chave "Project"
// Exemplo: "Project" = "Monti Content"
// O valor a ser utilizado é "Monti Content", ele é chamado no arquivo no qual se deseja escrever o conteúdo HTML

function jsonKey(projectKeyIdentifier) {
    fetch('js/content/projects.json')
        .then(response => response.json())
        .then(jsonData => {
            var foundedKey = jsonData.find(item => item.project === projectKeyIdentifier);

            if (foundedKey) {
                // Criar uma div para as informações do projeto
                var divData = document.createElement('div');
                divData.classList.add("display__grid__descricao");

                // Adicionar as informações do projeto na div
                for (var key in foundedKey) {
                    if (foundedKey.hasOwnProperty(key) && key !== "link" && key !== "more" && key !== "info") {
                        var value = foundedKey[key];
                        var element = document.createElement('p');
                        element.textContent = key + ': ' + value;
                        divData.appendChild(element);
                    }
                }

                // Atualizar o conteúdo do elemento HTML "caseData"
                var elementData = document.getElementById("caseData");
                elementData.innerHTML = '';
                elementData.appendChild(divData);

                // Criar uma div apenas para o elemento "info"
                if (foundedKey["info"]) {
                    var divInfo = document.createElement("div");
                    divInfo.innerHTML = '<p>[info]</p><p>' + foundedKey["info"] + '</p>';
                    elementData.appendChild(divInfo);
                }

            } else {
                console.log("Projeto não encontrado.");
            }
        })
        .catch(error => console.log(error));
}
