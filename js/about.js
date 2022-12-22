if (window.matchMedia("(min-width: 766px)").matches) {

  $('#about').mouseenter(function () {
    $('.about__content').animate({
      height: "toggle"
    }, 1000, function () {
      // Animation complete.

    });
  })
  
} else {

  $('#about').click(function () {
    $('.about__content').animate({
      height: "toggle"
    }, 1000, function () {
      // Animation complete.

    });
  })
}