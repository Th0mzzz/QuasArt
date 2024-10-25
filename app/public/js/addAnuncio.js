const anuncioContainer = document.querySelector("[data-anuncioContainer]");
const inputFileAnuncio = document.querySelector("[data-inputAnuncio]");

inputFileAnuncio.addEventListener("change", function (e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const src = e.target.result;
            const img = new Image();
            img.onload = function () {

                inputFileAnuncio.parentNode.classList.remove("invalid");
                if (anuncioContainer.querySelector(".capa__img")) {
                    anuncioContainer.removeChild(anuncioContainer.querySelector(".capa__img"));
                }
                const imgAnuncio = document.createElement("img");
                imgAnuncio.setAttribute("src", src);
                imgAnuncio.className = "capa__img";
                anuncioContainer.appendChild(imgAnuncio);
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    } else {
        inputFileAnuncio.parentNode.classList.add("invalid");
        inputFileAnuncio.parentNode.querySelector(".invalid-msg").textContent = 'Escolha um arquivo do tipo Imagem!!';
        inputFileAnuncio.value = "";
    }
});
