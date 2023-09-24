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
