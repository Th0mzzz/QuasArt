const searchModal = document.querySelector('#searchModal')
const list = document.querySelectorAll('.list');
const nav = document.querySelector('.navigation');

list.forEach(item => item.addEventListener('click', function (e) {

    list.forEach(li => {
        li.classList.remove('active')
        searchModal.classList.remove('search_ativo')
    });

    e.currentTarget.classList.add('active');

    if (e.currentTarget.classList.contains("search")) {
        searchModal.classList.add("search_ativo")
    }


}));


// BOTÃO DE MODO
const modoBtn = document.querySelectorAll(".modoBtn")
const body = document.body
console.log(modoBtn)
modoBtn.forEach(btn => {


    btn.addEventListener('click', function () {
        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {

            btn.innerHTML = "<i class='bi bi-brightness-high'></i> <p class='d-none d-md-block'> Modo Claro</p>"

        } else {
            btn.innerHTML = "<i class='bi bi-moon'></i> <p class='d-none d-md-block'>Modo Escuro</p>"
        }
        const darkModeEnabled = body.classList.contains('dark');
        localStorage.setItem('darkModeEnabled', darkModeEnabled);

    });



    const darkModeEnabled = localStorage.getItem('darkModeEnabled');

    if (darkModeEnabled === 'true') {
        
        body.classList.add('dark');

        btn.innerHTML = "<i class='bi bi-brightness-high'></i> <p class='d-none d-md-block'> Modo Claro</p>"

    } else {

        btn.innerHTML = "<i class='bi bi-moon'></i> <p class='d-none d-md-block'>Modo Escuro</p>"
    }

})

// BOTÃOP PARA VOLTAR A PAGINA ANTERIOR


const back = document.querySelectorAll('.back')

back.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        window.history.back()
    })

})