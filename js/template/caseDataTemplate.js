// projectKeyIdentifier é referente ao valor real da chave que você deseja encontrar nos dados JSON.
// Neste caso, o valor real da chave está atrelado ao arquivo /content/projects.json, na chave "Project"
// Exemplo: "Project" = "Monti Content"
// O valor a ser utilizado é "Monti Content", ele é chamado no arquivo no qual se deseja escrever o conteúdo HTML

function jsonKey(projectKeyIdentifier) {
    fetch('js/content/projects.json')
        .then(response => response.json())
        .then(jsonData => {
            var foundedKey = null;

            for (var i = 0; i < jsonData.length; i++) {
                if (jsonData[i].project === projectKeyIdentifier) {
                    foundedKey = jsonData[i];
                    break;
                }
            }

            if (foundedKey) {
                //Estruturando as informações de para saida HTML
                var divData = document.createElement('div');
                divData.classList.add("display__grid__descricao")
                for (var key in foundedKey) {
                    if (foundedKey.hasOwnProperty(key) && key !== "link" && key !== "more" && key !== "image") {
                        var value = foundedKey[key];
                        var element = document.createElement('p');
                        element.textContent = value;
                        divData.appendChild(element);
                    }
                }

                // Atualizar o conteúdo do elemento HTML
                var elementData = document.getElementById("caseData");
                elementData.innerHTML = '';
                elementData.appendChild(divData);
            }
        })
        .catch(error => console.log(error));
}
