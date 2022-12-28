function detailsSwtich() {
    var x = document.getElementById("switch__text");
    if (x.innerHTML === "+ Detalhes") {
      x.innerHTML = "× Fechar";
    } else {
      x.innerHTML = "+ Detalhes";
    }
  }