function jsonKey(projectKeyIdentifier) {
    fetch('js/content/projects.json')
        .then(response => response.json())
        .then(jsonData => {
            var foundedKey = jsonData.find(item => item.project === projectKeyIdentifier);

            if (foundedKey) {
                // Criar uma div para as informações de descrição do projeto
                var divData = document.createElement('div');
                divData.classList.add("display__grid__descricao");

                // Adicionar as informações de descrição do projeto na div
                for (var key in foundedKey) {
                    if (foundedKey.hasOwnProperty(key) && key !== "link" && key !== "more" && key !== "info" && key !== "credits") {
                        var value = foundedKey[key];
                        var element = document.createElement('p');
                        element.textContent = value;
                        divData.appendChild(element);
                    }
                }

                // Atualizar o conteúdo da div com o ID "caseData"
                var elementData = document.getElementById("caseData");
                elementData.innerHTML = '';
                elementData.appendChild(divData);

                // Criar uma div para as informações de info do projeto
                if (foundedKey["info"]) {
                    var infoValue = foundedKey["info"];
                    var divInfo = document.createElement("div");
                    divInfo.classList.add("display__grid__info");

                    // Adicionar o valor de "info" à divInfo
                    var infoElement = document.createElement("p");
                    infoElement.textContent = "[info]";
                    divInfo.appendChild(infoElement);

                    // Criar uma div para os elementos "block" e "block-2"
                    var divBlockData = document.createElement("div");
                    divBlockData.classList.add("display__grid__info__block")

                    // Adicionar os blocos "block" e "block-2" à divBlockData
                    for (var key in infoValue) {
                        if (infoValue.hasOwnProperty(key)) {
                            var value = infoValue[key];
                            var element = document.createElement('p');
                            element.textContent = value;
                            divBlockData.appendChild(element);
                        }
                    }
                    
                    // Adicionar divBlockData à divInfo
                    divInfo.appendChild(divBlockData);

                    // Atualizar o conteúdo da div com o ID "caseDataInfo"
                    var elementDataInfo = document.getElementById("caseDataInfo");
                    elementDataInfo.innerHTML = '';
                    elementDataInfo.appendChild(divInfo);
                }

            } else {
                console.log("Projeto não encontrado.");
            }
        })
        .catch(error => console.log(error));
}
