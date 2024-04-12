function startLoader() {
    var loaderOverlay = document.getElementById("loader-overlay");
    var loader = document.getElementById("loader");
    var progress = 0;
    var duration = 2000; // Duração do carregamento em milissegundos
    var intervalTime = duration / 100; // Intervalo de tempo para atualizar o progresso
  
    // Desabilitar rolagem da página
    document.body.style.overflow = "hidden";
  
    function increaseProgress() {
      if (progress >= 100) {
        clearInterval(interval);
        loaderOverlay.classList.add("fadeout");
        setTimeout(function() {
          loaderOverlay.style.display = "none";
          // Reativar rolagem da página
          document.body.style.overflow = "auto";
        }, 1000);
      } else {
        progress++;
        loader.textContent = progress + "%";
      }
    }
  
    var interval = setInterval(increaseProgress, intervalTime);
  }
  
  // Chame a função startLoader para iniciar o carregamento imediatamente
  startLoader();
  
  