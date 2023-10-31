document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector(".formConta")
    const inputsConta = document.querySelectorAll(".input-conta")

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        inputsConta.forEach(input => {
            let isValid = true
            let paiInput = input.parentNode
            let feedback = paiInput.querySelector(".feedback")

            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                isValid = false
            } 
            if (input.classList.contains("senha") && input.value.length < 8) {
                input.classList.add("is-invalid")
                feedback.innerHTML = "No mínimo 8 caracteres!"
                feedback.style.display = "block"
                isValid = false
            }

            input.addEventListener('input', function () {
                if (input.value.trim() !== '') {
                    input.classList.remove('is-invalid');
                    feedback.style.display = "none"
                }
            });

            if (input.classList.contains("is-invalid")) {
                feedback.style.display = "block"
            } else {
                feedback.style.display = "none"
            }
        })

   
        if (document.querySelectorAll('.is-invalid').length === 0) {
            window.location.href = "perfil.html";
        }
    })
})
