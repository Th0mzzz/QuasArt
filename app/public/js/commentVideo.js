const btnOpenComments = document.querySelector("#btnOpenComments")
const btnCloseComments = document.querySelector("#btnCloseComments")
const videoCommentsContainer = document.querySelector("#videoComments")

btnOpenComments.addEventListener("click", () => {
    videoCommentsContainer.classList.toggle("aberto")
});
btnCloseComments.addEventListener("click", () => {
    videoCommentsContainer.classList.remove("aberto")
});

