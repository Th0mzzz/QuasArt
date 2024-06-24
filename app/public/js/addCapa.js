const capaContainer = document.querySelector("[data-capaContainer]");
const inputFileCapa = document.querySelector("[data-inputCapa]");
const maxFileSize = 2 * 1024 * 1024;
const aspectRatio = inputFileCapa.classList.contains("capaResenha") ? 4 / 3 : 9 / 16 ;
const margemErro = 0.2
inputFileCapa.addEventListener("change", function (e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        if (file.size > maxFileSize) {
            inputFileCapa.parentNode.classList.add("invalid");
            inputFileCapa.parentNode.querySelector(".invalid-msg").textContent = 'O arquivo excede o tamanho máximo de 2MB.';
            inputFileCapa.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const src = e.target.result;
            const img = new Image();
            img.onload = function () {
                const imgAspectRatio = img.width / img.height;
                if (Math.abs(imgAspectRatio - aspectRatio) > margemErro) { 
                    inputFileCapa.parentNode.classList.add("invalid");
                    inputFileCapa.parentNode.querySelector(".invalid-msg").textContent = inputFileCapa.classList.contains("capaResenha") ? "A proporção da imagem deve ser 4:3." : 'A proporção da imagem deve ser 9:16.';
                    inputFileCapa.value = "";
                    return;
                }

                inputFileCapa.parentNode.classList.remove("invalid");
                if (capaContainer.querySelector(".capa__img")) {
                    capaContainer.removeChild(capaContainer.querySelector(".capa__img"));
                }

                const imgCapa = document.createElement("img");
                imgCapa.setAttribute("src", src);
                imgCapa.className = "capa__img";
                const labels = capaContainer.querySelectorAll("label");
                labels.forEach(label => label.style.display = "none");
                capaContainer.appendChild(imgCapa);
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    } else {
        inputFileCapa.parentNode.classList.add("invalid");
        inputFileCapa.parentNode.querySelector(".invalid-msg").textContent = 'Escolha um arquivo do tipo Imagem!!';
        inputFileCapa.value = "";
    }
});
