const backBtn = document.querySelector(".back-btn")
// qnd a janela descer os pixels  indicados, o botão que linka para o inicio do document aparece
window.addEventListener("scroll", () => {
    if (window.scrollY >= 450) {
        backBtn.classList.add("ativo")
    }else{
        backBtn.classList.remove("ativo")
    }
})

