  document.addEventListener('DOMContentLoaded', function () {
    function initOwlCarousel(selector, options) {
      $(selector).owlCarousel(options);
    }

    // Configuração do carousel inicial
    initOwlCarousel('.carousel-inicial', {
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        1000: {
          items: 1
        }
      }
    });

    // Configuração do carousel de itens
    initOwlCarousel('.carousel-itens', {
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 2
        },
        600: {
          items: 4
        },
        1000: {
          items: 5
        }
      }
    });

    // Configuração do carousel de resenhas
    initOwlCarousel('.carousel-resenhas', {
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 1
        }
      }
    });

    // Configuração do carousel de vídeos
    initOwlCarousel('.carousel-videos', {
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 5
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  });

