const searchMenu = document.querySelector('#search__btn');
const searchContainer = document.querySelector('#search')

searchMenu.addEventListener('click', () => {
    if(searchMenu.classList.contains("active")){
        searchContainer.classList.toggle('show');
    }else{
        searchContainer.classList.remove("show")
        searchMenu.classList.remove("active")
    }
    
  });


const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');
list.forEach(item => item.addEventListener('click', function(e){
	list.forEach(li => li.classList.remove('active'));

	e.currentTarget.classList.add('active');
}));

let larguraAnterior = window.innerWidth;

function reloadPage() {
    const larguraAtual = window.innerWidth;
    if (larguraAtual !== larguraAnterior) {
        location.reload();
    }
}


window.addEventListener('resize', reloadPage);






