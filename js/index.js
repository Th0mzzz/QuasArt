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



const modoBtn = document.querySelector("#modoBtn")
const body = document.body
const icone = modoBtn.querySelector("i")

modoBtn.addEventListener('click', function() {
    body.classList.toggle('dark');
    if(body.classList.contains('dark')){
        icone.className = "bi bi-brightness-high"
    }else {
        icone.className = "bi bi-moon"
    }
    
    const darkModeEnabled = body.classList.contains('dark');
    localStorage.setItem('darkModeEnabled', darkModeEnabled);
});


const darkModeEnabled = localStorage.getItem('darkModeEnabled');

if (darkModeEnabled === 'true') {
    body.classList.add('dark');
    icone.className = "bi bi-brightness-high"
}




