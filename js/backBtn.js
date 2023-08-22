const back = document.querySelectorAll('.back')

back.forEach(btn=>{

    btn.addEventListener('click', ()=>{
        window.history.back()
    })

})

