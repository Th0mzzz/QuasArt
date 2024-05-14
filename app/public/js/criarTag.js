const tagInput = document.querySelector(".tagInput");
const tagsContainer = document.querySelector("#tagsContainer");

// Ao clicar ele no input de tag, ele verifica se a tecla apertada é espaço, dps verifica todas as tags ja definidas, se o length do array for menor que limite imposto ele realiza a ação(que é criar um tag adicionando os elementos pra cada uma e um input com o name tags[], que permite o formulario adicionar varios valores para um unico name), senão ele n adiciona mais e adiciona a classe `invalid` que diz q o limite foi atingido

tagInput.addEventListener("keyup", (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        const tagsSelecionadas = tagsContainer.querySelectorAll('.tag')
        console.log(tagsSelecionadas)
        if (tagsSelecionadas.length < 15) {
            tagInput.parentNode.classList.remove("invalid")

            if (tagInput.value.trim() !== '') {
                createTag(tagInput.value.trim());
                tagInput.value = '';
            }
        } else {
            tagInput.parentNode.classList.add("invalid")
        }

    } else {
        e.preventDefault();
    }
});

function createTag(tagText) {
    const article = document.createElement('article');
    article.classList.add("tag")
    article.classList.add("text")
    article.textContent = `#${tagText}`;

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    closeBtn.addEventListener('click', function () {
        article.remove();
        input.remove();
    });

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'tags[]';
    input.value = `#${tagText}`;

    article.appendChild(closeBtn);
    tagsContainer.appendChild(article);
    tagsContainer.appendChild(input);
}
