const previasContainer = document.querySelector("#carouselPrevia")
const addPreviaBtn = document.querySelector("#previas")

addPreviaBtn.addEventListener("change", function (e) {
    e.preventDefault();

    previasContainer.innerHTML = '';
    selectedFiles = []; 

    const files = Array.from(e.target.files);
    selectedFiles.push(...files);

    if (selectedFiles.length <= 8) {
        addPreviaBtn.parentNode.classList.remove("invalid");

        selectedFiles.forEach((file, index) => {
            if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const src = e.target.result;
                    criarPreviaItem(src, index, file.type);
                };
                reader.readAsDataURL(file);
            } else {
                addPreviaBtn.parentNode.classList.add("invalid");
                addPreviaBtn.parentNode.querySelector(".invalid-msg").textContent = 'Escolha um arquivo do tipo imagem ou vídeo!';
            }
        });

    } else {
        addPreviaBtn.parentNode.classList.add("invalid");
        addPreviaBtn.parentNode.querySelector(".invalid-msg").textContent = 'Limite de prévias atingido! No máximo 8 prévias.';
        addPreviaBtn.value = "";
    }
});

function criarPreviaItem(srcMidia, index, tipoArquivo) {
    const article = document.createElement("article");
    article.className = 'previa';
    article.dataset.index = index;

    const inputContainer = document.createElement("article");
    inputContainer.className = 'input__container input-previa input-file';

    let previaContent = null;
    if (tipoArquivo.startsWith("image/")) {
        previaContent = document.createElement("img");
        previaContent.setAttribute("src", srcMidia);
    } else if (tipoArquivo.startsWith("video/")) {
        previaContent = document.createElement("video");
        previaContent.setAttribute("controls", "controls");
        const source = document.createElement("source");
        source.setAttribute('src', srcMidia);
        source.setAttribute("type", tipoArquivo);
        previaContent.appendChild(source);
    }

    previaContent.className = 'previa-content';
    inputContainer.appendChild(previaContent);
    article.appendChild(inputContainer);
    previasContainer.appendChild(article);
}
