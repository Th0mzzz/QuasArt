const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".landing__nav-btn")
const menuContainer = document.querySelector(".menu-container")
const menuItens = document.querySelectorAll(".nav__item")
// Menu mobile

menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("show")
})

menuItens.forEach(item => item.addEventListener("click",()=>{ menuContainer.classList.remove("show")}))

// animação nav
let currentScrollY = window.scrollY

window.addEventListener("scroll", () => {

    if (window.scrollY > currentScrollY) {
        nav.style.transform = "translateY(-100%)"
        currentScrollY = window.scrollY
        menuContainer.classList.contains("show")? menuContainer.classList.remove("show"): ""
    }
    if (window.scrollY < currentScrollY) {
        nav.style.transform = "translateY(0%)"
        currentScrollY = window.scrollY

    }
})