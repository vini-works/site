  $('#about').click(function () {
    $('.about__content').animate({
      height: "toggle"
    }, 500, function () {
      // Animation complete.

    });
  })