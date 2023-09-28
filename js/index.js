const searchModal =  document.querySelector('#searchModal')
const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');

list.forEach(item => item.addEventListener('click', function(e){

	list.forEach(li => {
        li.classList.remove('active')
        searchModal.classList.remove('search_ativo')
    });

	e.currentTarget.classList.add('active');

    if(e.currentTarget.classList.contains("search")){
        searchModal.classList.add("search_ativo")
    }
    
    
}));


// BOTÃO DE MODO
const modoBtn = document.querySelector("#modoBtn")
const body = document.body

modoBtn.addEventListener('click', function() {
    body.classList.toggle('dark');

    if(body.classList.contains('dark')){
        modoBtn.innerHTML = "<i class='bi bi-brightness-high'></i> Modo claro  "
    
    }else{
        modoBtn.innerHTML = "<i class='bi bi-moon'></i> Modo Escuro"
    }    
    const darkModeEnabled = body.classList.contains('dark');
    localStorage.setItem('darkModeEnabled', darkModeEnabled);

});



const darkModeEnabled = localStorage.getItem('darkModeEnabled');

if (darkModeEnabled === 'true') {
    body.classList.add('dark');
    modoBtn.innerHTML = "<i class='bi bi-brightness-high'></i> Modo claro  "
}else{
    modoBtn.innerHTML = "<i class='bi bi-moon'></i> Modo escuro"
}

// BOTÃOP PARA VOLTAR A PAGINA ANTERIOR


const back = document.querySelectorAll('.back')

back.forEach( btn => {
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        window.history.back()
    })
    
})