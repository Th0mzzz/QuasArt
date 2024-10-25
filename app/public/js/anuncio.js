const anuncio = document.querySelector("[data-anuncio]")
window.onload = function() {
    setTimeout(()=>{
        const closeAdd = document.createElement("button")
        closeAdd.className = "closeBtn btn"
        const icon = document.createElement("i")
        icon.className = "bi bi-x-lg"
        closeAdd.appendChild(icon)
        closeAdd.addEventListener("click", ()=>{
            anuncio.classList.remove("show")
        })
        anuncio.appendChild(closeAdd)
    }, 5000)
};
