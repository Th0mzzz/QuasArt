// Declaramos todo os botões do container de acessibilidade
const accessBtn = document.querySelector("#access");
const accessContainer = document.querySelector("#accessContainer");
const aumentarFont = accessContainer.querySelector("#aumentar");
const diminuirFont = accessContainer.querySelector("#diminuir");
const sublinharLinks = accessContainer.querySelector("#sublinhar");
const tipografiaFacil = accessContainer.querySelector("#facil");
const reset = accessContainer.querySelector("#reset");
const doc = document.querySelector("html")
const tipografiaStorage = localStorage.getItem("tipografia")
const linksStorage = localStorage.getItem("links")
const fonteStorage = localStorage.getItem("fonte")

// Aqui verificamos as variaveis do localstorage que são setadas pelos botões, pra continuar as definições pras outras paginas. Caso tenham, serão colocadas as classes no document que fará a estilização
if (tipografiaStorage == "facil") {
    doc.classList.add("tipografiaFacil")
}

if (linksStorage == "sublinhados") {
    doc.classList.add("sublinhado")
}

if (fonteStorage == "aumentada") {
    doc.classList.add("aumentada")
}

if (fonteStorage == "diminuida") {
    doc.classList.add("diminuida")
}
// botão para abrir e fechar o menu de acessibilidade

accessBtn.addEventListener("click", (e) => {
    e.stopPropagation(); 
    accessContainer.classList.toggle("aberto");
});

window.addEventListener("click", (e) => {
    if (!accessContainer.contains(e.target) && e.target !== accessBtn && accessContainer.classList.contains("aberto")) {
        accessContainer.classList.remove("aberto");
    }
});


// botao para deixar a tipografia facil
tipografiaFacil.addEventListener("click", () => {
    doc.classList.toggle("tipografiaFacil")
    localStorage.setItem("tipografia", "facil")
})
// botao para aumentar a fonte

aumentarFont.addEventListener("click", () => {
    if (doc.classList.contains("diminuida")) {
        doc.classList.remove("diminuida")
        localStorage.setItem("fonte", "normal")

    } else {
        doc.classList.add("aumentada")
        localStorage.setItem("fonte", "aumentada")

    }
})

// botao para diminuir a fonte
diminuirFont.addEventListener("click", () => {
    if (doc.classList.contains("aumentada")) {
        doc.classList.remove("aumentada")
        localStorage.setItem("fonte", "normal")

    } else {
        doc.classList.add("diminuida")
        localStorage.setItem("fonte", "diminuida")

    }
})

// sublinhar os links
sublinharLinks.addEventListener("click", () => {
    doc.classList.toggle("sublinhado")
    localStorage.setItem("links", "sublinhados")
})

// retirar todas as config de acessibilidade
reset.addEventListener("click", () => {
    doc.classList.remove("tipografiaFacil")
    localStorage.setItem("tipografia", "normal")
    doc.classList.remove("diminuida")
    doc.classList.remove("aumentada")
    localStorage.setItem("fonte", "normal")
    doc.classList.remove("sublinhado")
    localStorage.setItem("links", "normais")
})


  