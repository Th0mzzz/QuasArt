document.addEventListener("DOMContentLoaded", function () {

function initCustomCarousel(carouselSelector, options) {
    $(carouselSelector).owlCarousel(options);
  }
  

  const inicialOptions = {
    center: true,
    loop: true,
    margin: 0,
    responsiveClass: true,
    // autoplay: true,
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
    stagePadding:50,
    margin: 15,
    loop:true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        stagePadding:10,
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
    stagePadding:100,
    center:true,
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        stagePadding:0,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
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
  
  initCustomCarousel(".inicial", inicialOptions);
  initCustomCarousel(".itens", itensOptions);
  initCustomCarousel(".resenhas", resenhasOptions);
  initCustomCarousel(".videos", videosOptions);
  

  });
  