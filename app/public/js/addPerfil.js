const capaContainer = document.querySelector("[data-capaContainer]");
const inputFileCapa = document.querySelector("[data-inputCapa]");
const aspectRatio = 3 / 4 ;
const margemErro = 0.5  

inputFileCapa.addEventListener("change", function (e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const src = e.target.result;
            const img = new Image();
            img.onload = function () {
                const imgAspectRatio = img.width / img.height;
                if (Math.abs(imgAspectRatio - aspectRatio) > margemErro) { 
                    inputFileCapa.parentNode.classList.add("invalid");
                    inputFileCapa.parentNode.querySelector(".invalid-msg").textContent = "A proporção da imagem deve ser 3:4.";
                    capaContainer.removeChild(capaContainer.querySelector(".capa__img"));
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
