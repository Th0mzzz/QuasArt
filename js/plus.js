const modal = document.querySelector('.pubModal');
const planetBtn = document.querySelectorAll(".planet_btn");
const closeModal = document.querySelector('.close_btn');
const titulo = document.querySelector("#titulo_modal")

planetBtn.forEach( btn =>{

btn.addEventListener("click", ()=>{
    modal.style.display = 'flex'

    if(btn.classList.contains('resenhas')){
        titulo.innerHTML = `Resenha cósmica`
        

    }else if(btn.classList.contains('videos')){
        titulo.innerHTML = `Via Videos`

    }else if(btn.classList.contains('fichas')){
        titulo.innerHTML = `Fichas Espaciais`
    }

})})


closeModal.addEventListener("click", ()=>{
    modal.style.display = 'none'
})




