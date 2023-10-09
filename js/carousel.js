document.addEventListener("DOMContentLoaded", function () {

  function initCustomCarousel(carouselSelector, options) {
    $(carouselSelector).owlCarousel(options);
  }


  const inicialOptions = {
    center: true,
    loop: true,
    margin: 0,
    nav: false,
    autoplayTimeout: 5000,
    items: 1,

  }


  const itensOptions = {
    stagePadding: 50,
    margin: 5,
    nav: false,
    loop: true,
    responsiveClass: true,

    responsive: {
      0: {

        items: 2,
        stagePadding: 10,
      },
      420: {
        items: 2,
        stagePadding: 15,
      },
      768: {
        items: 4,
      },
      1024: {
        items: 6,
      },

    },
  };

  const resenhasOptions = {
    stagePadding: 100,
    center: true,
    loop: true,
    nav: false,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 10,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  const tagsOptions = {
    center: false,
    loop: true,
    nav: false,
    margin: 5,
    stagePadding: 10,
    responsive: {
      0: {
        items: 1,
        autoWidth: true,
      },
      420: {
        items: 3,
      },
      768: {
        items: 4,
        autoWidth: false,
      },
      1024: {
        items: 5,
        margin: 10,
        autoWidth: false,
      },
      1440: {
        items: 7,
        margin: 10,
        autoWidth: false,
      }
    },
  };

  initCustomCarousel(".inicial", inicialOptions);
  initCustomCarousel(".itens", itensOptions);
  initCustomCarousel(".resenhas", resenhasOptions);
  // initCustomCarousel(".videos", tagsOptions);
  initCustomCarousel(".tags-carousel", tagsOptions);


});
