export function renderTemplate__Personal(data) {
  let container = document.getElementById('personal__data__container');

  Object.keys(data).forEach(function (blocoKey) {
    let bloco = data[blocoKey];

    let div__block = document.createElement('div');
    div__block.classList.add('child__personal__data');

    let blocoNameElement = document.createElement('p');
    blocoNameElement.classList.add('block__name');
    blocoNameElement.textContent = blocoKey;
    div__block.appendChild(blocoNameElement);

    let ul__tag = document.createElement('ul');

    bloco.forEach(function (item) {
      let keys = Object.keys(item);
      let li__tag = document.createElement('li');
      li__tag.classList.add('block__list');

      keys.forEach(function (key) {
        if (key !== 'link') {
          let pElement = document.createElement('p');
          pElement.classList.add('item__list');
          li__tag.appendChild(pElement);

          if (key === 'project') {
            pElement.classList.add('no');
          }

          if (blocoKey === '[Social]' && key === 'rede') {
            let aElement = document.createElement('a');
            aElement.textContent = item[key];
            aElement.href = item['link'];
            aElement.target = '_blank';
            pElement.appendChild(aElement);
          } else {
            pElement.textContent = item[key];
          }
        }
      });

      ul__tag.appendChild(li__tag);
    });

    div__block.appendChild(ul__tag);
    container.appendChild(div__block);
  });
}
