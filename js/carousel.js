document.addEventListener("DOMContentLoaded", function () {

  function initCustomCarousel(carouselSelector, options) {
    $(carouselSelector).owlCarousel(options);
  }


  const inicialOptions = {
    loop: true,
    margin: 0,
    nav: false,
    autoplayTimeout: 5000,
    items: 1,
  }


  const itensOptions = {
    loop:true,
    margin:10,

    responsive:{
      0:{
        items:2,
        stagePadding:10
      },
      530:{
        items:3,
        stagePadding:15
      },
      768:{
        items:4,
        stagePadding:20
      },
      1024:{
        items:5,
        stagePadding:25
      },
      1440:{
        items:7,
        stagePadding:25
      },
    }
  };

  const resenhasOptions = {
    stagePadding: 100,
    center: true,
    loop: true,
    nav: false,
    margin:20,
    center:true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
      },
      768: {
        items: 1,
      },
      1000: {
        items: 1,
        stagePadding: 300,
      },
      1440: {
        items: 3,
      }
    },
  };
  const tagsOptions = {
    center: false,
    loop: false,
    nav: false,
    margin: 5,
    stagePadding: 5,
    responsive: {
      0: {
        items: 2,
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

  const previaOptions = {
    nav:true,
    margin:10,
    stagePadding:10,
    responsive:{
      0:{
        items:2,
        stagePadding:10,
      },
      576:{
        items:3,
        stagePadding:10,
      },
      768:{
        items:3,
        stagePadding:10,
      },
      1024:{
        items:3,
        stagePadding:10,
      },
      1440:{
        items:3,
        stagePadding:10,
      },
    }
  };


  const postOptions = {
    loop:false,
    margin:15,
    
    responsive:{
      0:{
        items:2,
        stagePadding:0
      },
      400:{
        items:2,
        stagePadding:15
      },
      600:{
        items:3,
        stagePadding:15
      },
      1024:{
        items:4,
        stagePadding:25
      } 
    }
  };
 
  initCustomCarousel(".inicial", inicialOptions);
  initCustomCarousel(".itens", itensOptions);
  initCustomCarousel(".resenhas", resenhasOptions);
  initCustomCarousel(".tags-carousel", tagsOptions);
  initCustomCarousel(".previas", previaOptions);
  initCustomCarousel(".post", postOptions);

});
