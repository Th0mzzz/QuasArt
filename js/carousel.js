document.addEventListener("DOMContentLoaded", function () {

function initCustomCarousel(carouselSelector, options) {
    $(carouselSelector).owlCarousel(options);
  }
  

  const inicialOptions = {
    center: true,
    loop: true,
    margin: 0,
    nav:false,
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
    margin:5,
    nav:false,
    loop:true,
    responsiveClass: true,
    autoWidth:true,
    responsive: {
      0: {
        
        items: 2,
        stagePadding:10,
      },
      420:{
        items:3,
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
    nav:false,
    margin: 20,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        stagePadding:10,
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
    nav:false,
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
  