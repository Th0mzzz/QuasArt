function alterarDisplay(elemento){
    
}

const searchMenu = document.querySelector('#search__btn');
const searchContainer = document.querySelector('.search__container')

searchMenu.addEventListener('click', ()=>{
    if(searchContainer.style.display === 'none'){
        searchContainer.style.display = 'flex'
    }else{
        searchContainer.style.display = 'none'
    }
})