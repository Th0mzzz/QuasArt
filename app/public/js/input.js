const inputsContainers = document.querySelectorAll(".input__container.senha")
const inputsMask = document.querySelectorAll(".inputMask")
// input que troca o type de password para text para poder visualizar a senha que está sendo escrita.
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

inputsMask.forEach(input => {
    input.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
})