function detailsSwtich() {
    var x = document.getElementById("Switch__Text");
    if (x.innerHTML === "+ Detalhes") {
      x.innerHTML = "× Fechar";
    } else {
      x.innerHTML = "+ Detalhes";
    }
  }