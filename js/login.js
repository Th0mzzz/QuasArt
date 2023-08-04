const login = document.getElementById('login')
const cadastro = document.getElementById('cadastro')
const token = document.getElementById('token')
const senha = document.getElementById('novaSenha')
const formContainer = document.querySelector(".form__container")
const btnHome = document.querySelector('.btn__homeback')
const esqueceuBtn = document.querySelectorAll(".esqueceu_btn")

function encontrarIndiceArray(array,classe){
  const indiceEncontrado = Array.from(array).indexOf(

    Array.from(array).find((elemento) => elemento.classList.contains(classe))

  );
  return indiceEncontrado;
}





function alternarConta(array, classe) {
  
    let indiceEncontrado = encontrarIndiceArray(array , classe)

   if(indiceEncontrado === 0){
    switchBtns[0].classList.remove(classe);
    switchBtns[1].classList.add(classe);
    login.classList.remove('ativado')
    cadastro.classList.add('ativado')
    
   }else{
    switchBtns[1].classList.remove(classe);
    switchBtns[0].classList.add(classe);
    cadastro.classList.remove('ativado')
    login.classList.add('ativado')
    
   }
  }

  

  const switchBtns = document.querySelectorAll(".switch_btn");

  switchBtns.forEach(btn => {

    btn.addEventListener('click', () => {
        
      alternarConta(switchBtns, 'ativo');

    });
  });

  

  esqueceuBtn.forEach(btn =>{
    btn.addEventListener("click", ()=>{

      let indiceEncontrado = encontrarIndiceArray(switchBtns , 'ativo')

      if(indiceEncontrado === 0 || indiceEncontrado === 1){

        switchBtns.forEach(btn =>{
          btn.style.display = 'none'
          btnHome.style.display = "none"
        })
        login.classList.remove('ativado')
        cadastro.classList.remove('ativado')
        token.classList.add("ativado")
      }


      
    })
  })

const cancelarBtn = document.querySelectorAll(".cancelar_btn")

cancelarBtn.forEach(btn =>{
  btn.addEventListener('click', ()=>{
    switchBtns.forEach(btn =>{
      btn.style.display = 'block'
      btnHome.style.display = 'flex'
    })
    token.classList.remove('ativado')
    senha.classList.remove("ativado")
    login.classList.add('ativado')
  })
})


  function handleInput(input) {
    const value = input.value;
    const maxLength = input.getAttribute('maxlength');
    
  
    if (value.length >= maxLength) {

      let nextInput = input;
      do {
        nextInput = nextInput.nextElementSibling;
      } while (nextInput && nextInput.tagName !== 'INPUT');
      
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  const verificarToken = document.getElementById('verificarToken')

  verificarToken.addEventListener('click', ()=>{
    token.classList.remove('ativado')
    senha.classList.add('ativado')
  })

