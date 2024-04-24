const backBtn = document.querySelector(".back-btn")

window.addEventListener("scroll", () => {
    if (window.scrollY >= 1000) {
        backBtn.classList.add("ativo")
    }else{
        backBtn.classList.remove("ativo")
    }
})

