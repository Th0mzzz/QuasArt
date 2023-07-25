function carrosel (carouselId){
const container = document.getElementById(carouselId)
const slides = container.querySelector(".slides");
const slideWidth = container.querySelector(".slide").clientWidth;
const prev = container.querySelector('.prevBtn')
const next = container.querySelector('.nextBtn')
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;


function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = slides.children.length - 1;
    }
    updateCarousel();
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= slides.children.length) {
        currentSlide = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const offsetX = -currentSlide * slideWidth;
    slides.style.transform = `translateX(${offsetX}px)`;
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50; // Adjust this value to control sensitivity
    const deltaX = touchEndX - touchStartX;

    if (deltaX > swipeThreshold) {
        prevSlide();
    } else if (deltaX < -swipeThreshold) {
        nextSlide();
    }
}

slides.addEventListener("touchstart", handleTouchStart);
slides.addEventListener("touchend", handleTouchEnd);

prev.addEventListener("click", prevSlide);
next.addEventListener('click',nextSlide)

}


carrosel("carouselInicial")
carrosel("recomendados")
carrosel("resenhas1")
carrosel("recentes")

carrosel('videos')

// carrosel("paraVoce")


// Videos 

const videosContainer = document.querySelectorAll('.carouselvideos');

videosContainer.forEach(container =>{

let slides = container.querySelectorAll('.slide');


slides.forEach(slide =>{
    let video = slide.getElementsByTagName(video)

    slide.addEventListener("mouseenter", video.play())
    slide.addEventListener("mouseleave", video.pause())

})


})

