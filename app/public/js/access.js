const accessBtn = document.querySelector("#access");
const accessContainer = document.querySelector("#accessContainer");
const aumentarFont = accessContainer.querySelector("#aumentar");
const diminuirFont = accessContainer.querySelector("#diminuir");
const sublinharLinks = accessContainer.querySelector("#sublinhar");
const tipografiaFacil = accessContainer.querySelector("#facil");
const reset = accessContainer.querySelector("#reset");
const doc = document.querySelector("html")

accessBtn.addEventListener("click", () => {
    accessContainer.classList.toggle("aberto")
});

tipografiaFacil.addEventListener("click", () => {
    doc.classList.toggle("tipografiaFacil")
})

aumentarFont.addEventListener("click", () => {
    if (doc.classList.contains("diminuida")) {
        doc.classList.remove("diminuida")
    } else {
        doc.classList.add("aumentada")
    }
})

diminuirFont.addEventListener("click", () => {
    if (doc.classList.contains("aumentada")) {
        doc.classList.remove("aumentada")
    } else {
        doc.classList.add("diminuida")
    }
})

sublinharLinks.addEventListener("click", ()=>{
    doc.classList.toggle("sublinhado")

})


reset.addEventListener("click", ()=>{
    doc.classList.remove("tipografiaFacil")
    doc.classList.remove("diminuida")
    doc.classList.remove("aumentada")
    doc.classList.remove("sublinhado")
})

