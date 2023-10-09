document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector(".formConta")
    const inputsConta = document.querySelectorAll(".input-conta")
    


    form.addEventListener('submit', function (event) {

        inputsConta.forEach(input => {

            let paiInput = input.parentNode

            let feedback = paiInput.querySelector(".feedback")

            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                event.preventDefault();
            } else {
                input.classList.remove('is-invalid');
            }

            if(input.classList.contains("is-invalid")){
                feedback.style.display = "block"
            }else {
                feedback.style.display = "none"
            }

            if(input.classList.contains("senha")){
                
                 if(input.value.length < 8){
                    event.preventDefault();
                    input.classList.add("is-invalid")
                    feedback.innerHTML = "No minimo 8 caracteres!"
                    feedback.style.display = "block"
                    
                 }
            }

        





        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                input.classList.remove('is-invalid');
                feedback.style.display = "none"
            }
            

        });




       

    })


})})