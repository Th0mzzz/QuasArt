const btnOpenComments = document.querySelectorAll(".btnOpenComments")
const btnCloseComments = document.querySelector("#btnCloseComments")
const videoCommentsContainer = document.querySelector("#videoComments")

btnOpenComments.forEach(btn => {
    console.log(btn)
    btn.addEventListener("click", () => {
        videoCommentsContainer.classList.toggle("aberto")
    });
})
btnCloseComments.addEventListener("click", () => {
    videoCommentsContainer.classList.remove("aberto")
});

