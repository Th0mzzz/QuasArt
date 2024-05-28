const inputsContainers = document.querySelectorAll(".input__container.senha")
const inputsMask = document.querySelectorAll(".inputMask")
const stars = document.querySelectorAll('.avaliacao__stars .star');
const avaliacaoInput = document.getElementById('avaliacaoInput');

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
// Mascara para input que tira todos os caracteres especiais e letras
inputsMask.forEach(input => {
    input.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
})

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        attStars(index);
        avaliacaoInput.value = index + 1;
    });
    function attStars(index) {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.querySelector('i').classList.replace('bi-star', 'bi-star-fill');
            } else {
                s.querySelector('i').classList.replace('bi-star-fill', 'bi-star');
            }
        });
    }
});
