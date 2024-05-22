const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".landing__nav-btn")
const menuContainer = document.querySelector(".menu-container")
const menuItens = document.querySelectorAll(".nav__item")
// Menu mobile

menuBtn.addEventListener("click", () => {
    menuContainer.classList.toggle("show")
    menuContainer.classList.contains("show") ? menuBtn.querySelector("i").className = "bi bi-x-lg " : menuBtn.querySelector("i").className = "bi bi-list ";
})

menuItens.forEach(item => item.addEventListener("click", () => {
    menuContainer.classList.contains("show") ? menuBtn.querySelector("i").className = "bi bi-list " : menuBtn.querySelector("i").className = "bi bi-x-lg ";
    menuContainer.classList.remove("show")

}))

// animação nav
let currentScrollY = window.scrollY

window.addEventListener("scroll", () => {

    if (window.scrollY > currentScrollY) {
        nav.style.transform = "translateY(-100%)"
        currentScrollY = window.scrollY
        if (menuContainer.classList.contains("show")) {
            menuContainer.classList.remove("show")
            menuBtn.querySelector("i").className = "bi bi-list"
        }
    }
    if (window.scrollY < currentScrollY) {
        nav.style.transform = "translateY(0%)"
        currentScrollY = window.scrollY

    }
})