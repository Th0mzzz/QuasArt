const curtirBtn = document.querySelector("[data-curtirBtn]")
const curtirBtnIcon = curtirBtn.querySelector("i")
curtirBtn.addEventListener("click", ()=>{
    if(curtirBtn.classList.contains("curtido")){
        curtirBtn.classList.remove("curtido")
        curtirBtnIcon.className = "bi bi-heart"
    }else{
        curtirBtn.classList.add("curtido")
        curtirBtnIcon.className = "bi bi-heart-fill"
    }
})