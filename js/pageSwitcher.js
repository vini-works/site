window.addEventListener('popstate', function (event) {
  const currentPage = document.querySelector('.current');
  const nextPage = document.querySelector('.next');

  if (event.state === 'next') {
    // Aplica a escala diminuída na página atual
    currentPage.style.transform = 'scale(0.8)';

    // Aplica o efeito de colapso na próxima página
    nextPage.style.transform = 'translateY(0)';
  } else {
    // Aplica a escala diminuída na próxima página
    nextPage.style.transform = 'scale(0.8)';

    // Aplica o efeito de colapso na página anterior
    currentPage.style.transform = 'translateY(0)';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const pages = document.querySelectorAll('.page');
  const links = document.querySelectorAll('a');

  links.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const url = this.getAttribute('href');
      const nextPage = document.querySelector(`body > div:not(.current)`);

      if (nextPage) {
        const currentPage = document.querySelector('.current');
        currentPage.classList.remove('current');
        nextPage.classList.add('current');

        currentPage.style.transform = 'scale(0.8)';
        nextPage.style.transform = 'translateY(0)';

        history.pushState('next', '', url);
      }
    });
  });
});
