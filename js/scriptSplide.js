const splide = new Splide('.splide', {
    arrows: false,
    pagination: false,
    drag: 'free',
    type: 'loop',
    perPage: 3,
    gap: 5,
    fixedHeight: '80vh',
    autoScroll: {
      speed: 0.5,
      pauseOnHover: false,
    },
    breakpoints: {
      720: {
        perPage: 1,
      },
    },
  });

  splide.mount(window.splide.Extensions);