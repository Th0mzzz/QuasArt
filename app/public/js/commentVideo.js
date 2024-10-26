const btnOpenComments = document.querySelectorAll("[data-opencomment]")
btnOpenComments.forEach(btn => {
    const videoCommentsContainer = document.querySelector(`[data-videoComments=${btn.dataset.opencomment}]`)
    const btnClose = videoCommentsContainer.querySelector('.btn-close')
    btnClose.addEventListener("click", () => { videoCommentsContainer.classList.remove("aberto") })
    btn.addEventListener("click", () => {
        videoCommentsContainer.classList.toggle("aberto")
    });
})


