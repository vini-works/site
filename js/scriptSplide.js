const splide = new Splide('.splide', {
    arrows: false,
    pagination: false,
    drag: 'free',
    perPage: 4,
    gap: 5,
    fixedHeight: '95vh',
    autoScroll: {
      speed: 0.2,
      pauseOnHover: false,
    },
    breakpoints: {
      720: {
        perPage: 1,
        fixedHeight: '95vh',
      },
    },
  });

  splide.mount(window.splide.Extensions);