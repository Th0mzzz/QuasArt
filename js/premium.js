const modal = document.querySelector('#premium_modal');
const planoBtns = document.querySelectorAll(".plano_btn");
const closeModal = document.querySelector('.close_btn');

planoBtns.forEach( btn =>{

btn.addEventListener("click", ()=>{

    modal.style.display = 'block'

    let tituloPlano = document.querySelector("#plano_nome")
    let precoMensal = document.querySelector('#preco_mensal')
    let precoSemestral = document.querySelector('#preco_semestral')
    let precoAnual = document.querySelector('#preco_anual')

    if(btn.classList.contains("comandante")){

        tituloPlano.innerHTML = `Comandante PLUS+`
        precoMensal.innerHTML = " R$ 30.00"
        precoSemestral.innerHTML = " R$ 144.00"
        precoAnual.innerHTML = " R$ 288.00"

    }else{
        tituloPlano.innerHTML = `Tripulante PLUS +`
        precoMensal.innerHTML = " R$ 20.00"
        precoSemestral.innerHTML = " R$ 108.00"
        precoAnual.innerHTML = " R$ 192.00"
    }
})
})


closeModal.addEventListener("click", ()=>{
    modal.style.display = 'none'
})

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



