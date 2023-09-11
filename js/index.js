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



