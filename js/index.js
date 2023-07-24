const searchMenu = document.querySelector('#search__btn');
const searchContainer = document.querySelector('#search')

searchMenu.addEventListener('click',  ()=>{

if(searchContainer.style.display === 'none'){
    searchContainer.style.display = 'flex'
}else{
    searchContainer.style.display = 'none'
}

})

const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');
list.forEach(item => item.addEventListener('click', function(e){
	list.forEach(li => li.classList.remove('active'));
	e.currentTarget.classList.add('active');
}));


let active = document.querySelector('.list active');



