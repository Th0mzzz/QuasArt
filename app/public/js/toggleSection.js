const sections = document.querySelectorAll("[data-section]")
const btnsSection = document.querySelectorAll("[data-btnSection]")



btnsSection.forEach(btn => {

    btn.addEventListener("click", () => {
        btnsSection.forEach(button => button.classList.remove("ativo"))

        sections.forEach(section => {
            section.classList.contains("ativo") ? section.classList.remove("ativo") : ""

            if (section.dataset.section === btn.dataset.btnsection) {
                section.classList.add("ativo")
                btn.classList.add("ativo")
            }
        })

    })

})