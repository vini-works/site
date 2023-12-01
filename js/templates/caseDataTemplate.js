function jsonKey(projectKeyIdentifier) {
    fetch('js/content/projectData.json')
        .then(response => response.json())
        .then(jsonData => {
            var foundedKey = jsonData.find(item => item.project === projectKeyIdentifier);

            if (foundedKey) {
                // Criar uma div para as informações de descrição do projeto
                var divData = document.createElement('div');
                divData.classList.add("display__grid__descricao");

                // Obtenha todas as chaves do objeto foundedKey, exceto "info" e "credits"
                var keys = Object.keys(foundedKey).filter(key => key !== "info" && key !== "credits" && key !== "link");

                // Adicionar as informações de descrição do projeto na divData
                keys.forEach((key, index) => {
                    var value = foundedKey[key];
                    var element = document.createElement('p');
                    element.textContent = index === keys.length - 1 ? "└── " + value : "├── " + value;
                    divData.appendChild(element);
                });




                // Criar uma div para as informações de "info" do projeto
                var divInfo = document.createElement("div");
                divInfo.classList.add("child__case__info");

                // Verificar se a key "info" existe e não é vazia
                if (foundedKey["info"] && foundedKey["info"] !== "" && foundedKey["info"] !== "[-]") {
                    var infoValue = foundedKey["info"];

                    for (var subKey in infoValue) {
                        if (infoValue.hasOwnProperty(subKey) && infoValue[subKey] !== "") {
                            var subValue = infoValue[subKey];
                            var divSection = document.createElement("div");
                            divSection.classList.add("child__block");

                            // Criar uma UL para as informações de "subKey"
                            var ul__tag = document.createElement("ul");

                            for (var subSubKey in subValue) {
                                if (subValue.hasOwnProperty(subSubKey) && subValue[subSubKey] !== "") {
                                    var subSubValue = subValue[subSubKey];
                                    var li__tag = document.createElement("li");
                                    li__tag.classList.add("block__list");
                                    var pElement = document.createElement("p");
                                    pElement.textContent = subSubValue;
                                    li__tag.appendChild(pElement);
                                    ul__tag.appendChild(li__tag);
                                }
                            }

                            if (ul__tag.childNodes.length > 0) {
                                var subKeyElement = document.createElement("p");
                                subKeyElement.textContent = "├── " + subKey;
                                divSection.appendChild(subKeyElement);
                                divSection.appendChild(ul__tag);
                                divInfo.appendChild(divSection);
                            }
                        }
                    }
                }

                // Atualizar o conteúdo das divs com os IDs "caseData" e "caseInfo"
                var elementData = document.getElementById("case__data");
                var elementDataInfo = document.getElementById("case__info");
                elementData.innerHTML = '';
                elementDataInfo.innerHTML = '';
                elementData.appendChild(divData);
                elementDataInfo.appendChild(divInfo);

            } else {
                console.log("Projeto não encontrado.");
            }
        })
        .catch(error => console.log(error));
}
