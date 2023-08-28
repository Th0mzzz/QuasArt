document.addEventListener("DOMContentLoaded", function () {

function initCustomCarousel(carouselSelector, options) {
    $(carouselSelector).owlCarousel(options);
  }
  

  const inicialOptions = {
    center: true,
    loop: true,
    margin: 0,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout:5000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  

  const itensOptions = {
    loop: true,
    margin: 1,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  };

  const resenhasOptions = {
    center:true,
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 2,
      },
    },
  };
  const videosOptions = {
    center:false,
    loop: true,
    margin: 5,
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
      },
      768: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  };
  
  initCustomCarousel(".carousel-inicial", inicialOptions);
  initCustomCarousel(".carousel-itens", itensOptions);
  initCustomCarousel(".carousel-resenhas", resenhasOptions);
  initCustomCarousel(".carousel-videos", videosOptions);
  

  });
  