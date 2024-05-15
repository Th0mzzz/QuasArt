const previasContainer = document.querySelector("#carouselPrevia")
const addPreviaBtn = document.querySelector("#addPrevia")

// O Codigo localiza a mudança do input file AddPrevia e localiza todas as previas já existentes. Logo em seguida ele verifica se a soma de todas elas são menores que 10, ele também tira a classe invalid do input__container caso ele estivesse com uma. No proximo passo ele cria uma variavel file com o valor do input e verifica se o arquivo existe e se ele é uma imagem. Utilizando a function FileReader() ele lê o arquivo e o transforma numa URL onde eu guardo o resultado na variavel imgSrc e chamo a função criarPreviaItem, onde eu crio toda a previa dinamicamente e logo em seguida limpo o value do input.

addPreviaBtn.addEventListener("change", function (e) {
    const previas = document.querySelectorAll(".previa")
    e.preventDefault();
    if (previas.length < 8) {
        addPreviaBtn.parentNode.classList.remove("invalid")
        const file = e.target.files[0];
        if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const src = e.target.result;

                criarPreviaItem(src, addPreviaBtn.value, file.type)
                addPreviaBtn.value = ''
            };
            reader.readAsDataURL(file);
        } else {
            addPreviaBtn.parentNode.classList.add("invalid")
            addPreviaBtn.parentNode.querySelector(".invalid-msg").textContent = 'Escolha um arquivo do tipo imagem ou video!'
            addPreviaBtn.value = ""
        }
    } else {
        addPreviaBtn.parentNode.classList.add("invalid")
        addPreviaBtn.parentNode.querySelector(".invalid-msg").textContent = 'Limite de prévias atingido! No maximo 8 prévias.'
        addPreviaBtn.value = ""
    }
})

function criarPreviaItem(srcMidia, valorPrevia, tipoArquivo) {
    const article = document.createElement("article");
    article.className = 'previa'
    const inputContainer = document.createElement("article")
    inputContainer.className = 'input__container input-previa input-file'
    const removePrevia = document.createElement("span")
    removePrevia.className = 'removePrevia'
    removePrevia.innerHTML = `<i class="bi bi-x-lg"></i>`
    removePrevia.addEventListener("click", () => {
        article.remove()
    })
    let previaContent = null
    if (tipoArquivo.startsWith("image/")) {
        previaContent = document.createElement("img")
        previaContent.setAttribute("src", srcMidia)
    } else if (tipoArquivo.startsWith("video/")) {
        previaContent = document.createElement("video")
        previaContent.setAttribute("controls", "controls")
        const source = document.createElement("source")
        source.setAttribute('src', srcMidia);
        source.setAttribute("type", tipoArquivo);
        previaContent.appendChild(source)
    }
    previaContent.className = 'previa-content';
    const inputPrevia = document.createElement("input")
    inputPrevia.type = "hidden"
    inputPrevia.name = "previas[]"
    inputPrevia.value = valorPrevia;

    inputContainer.appendChild(removePrevia)
    inputContainer.appendChild(inputPrevia)
    inputContainer.appendChild(previaContent)
    article.appendChild(inputContainer)
    previasContainer.appendChild(article)
}

