const capaContainer = document.querySelector("[data-capaContainer]")
const inputFileCapa = document.querySelector("[data-inputCapa]")

inputFileCapa.addEventListener("change", function (e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const src = e.target.result;
            if (capaContainer.querySelector(".capa__img")) {
                capaContainer.removeChild(capaContainer.querySelector(".capa__img"))
            }
            const imgCapa = document.createElement("img")
            imgCapa.setAttribute("src", src)
            imgCapa.className = "capa__img"
            const labels = capaContainer.querySelectorAll("label")
            labels.forEach(label => label.style.display = "none");
            capaContainer.appendChild(imgCapa)

        };
        reader.readAsDataURL(file);
    } else {
        inputFileCapa.parentNode.classList.add("invalid")
        inputFileCapa.parentNode.querySelector(".invalid-msg").textContent = 'Escolha um  arquivo do tipo Imagem!!'
        inputFileCapa.value = ""
    }
}
)


