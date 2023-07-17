function alternarClasses(array, classe) {
    const indiceEncontrado = Array.from(array).indexOf(

      Array.from(array).find((elemento) => elemento.classList.contains(classe))

    );
    const login = document.getElementById('login')
    const cadastro = document.getElementById('cadastro')

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
        
      alternarClasses(switchBtns, 'ativo');

    });
  });