document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html")
    const modo = localStorage.getItem('modo');
    const btnMode = document.getElementById('btnMode');
    const iconMode = btnMode.querySelector("i")

    if (modo === 'dark') {
        html.classList.add('dark');
        iconMode.className = "bi bi-brightness-high"
    } else {
        iconMode.className = "bi bi-moon"
    }

    btnMode.addEventListener('click', () => {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            iconMode.className = "bi bi-moon"

            localStorage.setItem('modo', 'light');
        } else {
            html.classList.add('dark');
            iconMode.className = "bi bi-brightness-high"

            localStorage.setItem('modo', 'dark');
        }
    });
})


