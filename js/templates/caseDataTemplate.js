function jsonKey(projectKeyIdentifier) {
    fetch('js/content/projectData.json')
        .then(response => response.json())
        .then(jsonData => {
            var foundedKey = jsonData.find(item => item.project === projectKeyIdentifier);

            if (foundedKey) {
                // Criar uma div para as informações de descrição do projeto
                var divData = document.createElement('div');
                divData.classList.add("display__grid__descricao");

                // Adicionar as informações de descrição do projeto na divData
                for (var key in foundedKey) {
                    if (foundedKey.hasOwnProperty(key) && key !== "link" && key !== "more" && foundedKey[key] !== "" && key !== "info" && key !== "credits") {
                        var value = foundedKey[key];
                        var element = document.createElement('p');
                        element.textContent = value;
                        divData.appendChild(element);
                    }
                }

                // Criar uma div para as informações de "info" do projeto
                var divInfo = document.createElement("div");
                divInfo.classList.add("display__grid__info");

                // Verificar se a key "info" existe e não é vazia
                if (foundedKey["info"] && foundedKey["info"] !== "" && foundedKey["info"] !== "[-]") {
                    var infoValue = foundedKey["info"];
                    
                    // Criar uma div para a key "info"
                    var infoElement = document.createElement("p");
                    infoElement.textContent = "[info]";
                    divInfo.appendChild(infoElement);

                    // Criar uma div para agrupar as informações de "description" e "credits"
                    var divDescriptionAndCredits = document.createElement("div");
                    divDescriptionAndCredits.classList.add("display__grid__credits__descrip");


                    // Loop para adicionar as informações de "description" e "credits" à divDescriptionAndCredits, se existirem
                    var subKeys = ["descrição", "créditos"];
                    for (var i = 0; i < subKeys.length; i++) {
                        var subKey = subKeys[i];
                        if (infoValue[subKey] && infoValue[subKey] !== "" && infoValue[subKey] !== "[-]") {
                            var subValue = infoValue[subKey];
                            var divSection = document.createElement("div");
                            divSection.classList.add("display__grid__info__block");

                            for (var subSubKey in subValue) {
                                if (subValue.hasOwnProperty(subSubKey) && subValue[subSubKey] !== "") {
                                    var subSubValue = subValue[subSubKey];
                                    var subElement = document.createElement('p');
                                    subElement.textContent = subSubValue;
                                    divSection.appendChild(subElement);
                                }
                            }

                            if (divSection.childNodes.length > 0) {
                                var subKeyElement = document.createElement("p");
                                subKeyElement.textContent = "[" + subKey + "]";
                                divSection.insertBefore(subKeyElement, divSection.firstChild);
                                divDescriptionAndCredits.appendChild(divSection);
                            }
                        }
                    }

                    // Adicionar a divDescriptionAndCredits à divInfo, se houver algum conteúdo
                    if (divDescriptionAndCredits.childNodes.length > 0) {
                        divInfo.appendChild(divDescriptionAndCredits);
                    }
                }

                // Atualizar o conteúdo das divs com os IDs "caseData" e "caseDataInfo"
                var elementData = document.getElementById("caseData");
                var elementDataInfo = document.getElementById("caseDataInfo");
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
