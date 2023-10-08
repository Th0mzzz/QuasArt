document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector(".formConta")
    const inputsConta = document.querySelectorAll(".input-conta")



    form.addEventListener('submit', function (event) {

        inputsConta.forEach(input => {

            if (input.value.trim() === '' ) {
                input.classList.add('is-invalid');
                event.preventDefault();
            } else {
                input.classList.remove('is-invalid');
            }
        

        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                input.classList.remove('is-invalid');
            }
        });

    })


})})