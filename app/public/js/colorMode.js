const html = document.querySelector("html")
const modo = localStorage.getItem('modo');
if (modo === 'dark') {
    html.classList.add('dark');
}

const btnMode = document.getElementById('btnMode');
btnMode.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('modo', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('modo', 'dark');
    }
});

