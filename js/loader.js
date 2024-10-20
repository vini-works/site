function startLoader() {
  var loaderOverlay = document.getElementById("loader-overlay");
  var duration = 2000; // Duração do carregamento em milissegundos

  // Desabilitar rolagem da página
  document.body.style.overflow = "hidden";

  setTimeout(function() {
    loaderOverlay.classList.add("fadeout");
    setTimeout(function() {
      loaderOverlay.style.display = "none";
      // Reativar rolagem da página
      document.body.style.overflow = "auto";
    }, 1000); // Tempo para o fadeout
  }, duration); // Tempo do carregamento antes do fadeout
}

// Chame a função startLoader para iniciar o carregamento imediatamente
startLoader();
