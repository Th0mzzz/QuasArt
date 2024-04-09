const inputsContainers = document.querySelectorAll(".input__container.senha")

inputsContainers.forEach(inputContainer => {
    const ocultSenha = inputContainer.querySelector(".ocultSenha");
    const icon = ocultSenha.querySelector("i")
    const input = inputContainer.querySelector("input")
    ocultSenha.addEventListener("click", (e) => {
        e.preventDefault();
        if (input.type == "password") {
            input.type = "text"
            icon.className = "bi bi-eye-slash"
        } else {
            icon.className = "bi bi-eye"
            input.type = "password"
        }
    })

})