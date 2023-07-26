const searchMenu = document.querySelector('#search__btn');
const searchContainer = document.querySelector('#search')

searchMenu.addEventListener('click', () => {
    searchContainer.classList.toggle('show');
  });


const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');
list.forEach(item => item.addEventListener('click', function(e){
	list.forEach(li => li.classList.remove('active'));

	e.currentTarget.classList.add('active');
}));

function reloadPageOnResize() {
  location.reload();
}

// Adicionar o evento de redimensionamento da janela
window.addEventListener('resize', reloadPageOnResize);






