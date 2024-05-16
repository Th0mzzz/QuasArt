const videoContainer = document.querySelector("[data-videoContainer]")
const inputFileVideo = document.querySelector("[data-inputVideo]")
// No codigo abaixo eu verifico se o arquivo enviado no input file é um video de acordo com o tipo MIME, depois utilizo api do JS para ler o arquivo e ao terminar o carregamento eu pego o resultado que é uma URL do arquivo que o JS leu e coloco num source criado pelo JS para aparecer como prévia ants de postar o video; 
inputFileVideo.addEventListener("change", function (e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
        inputFileVideo.parentNode.classList.remove("invalid")
        const reader = new FileReader();
        reader.onload = function (e) {
            const src = e.target.result;
            if (videoContainer.querySelector(".video__preview")) {
                videoContainer.removeChild(videoContainer.querySelector(".video__preview"))
            }
            const video = document.createElement("video")
            video.setAttribute("controls", "controls");
            video.className = "video__preview";
            const source = document.createElement("source")
            source.setAttribute('src', src);
            source.setAttribute("type", file.type);
            video.appendChild(source)
            videoContainer.appendChild(video)
            videoContainer.classList.add("active")
        };
        reader.readAsDataURL(file);
    } else {
        inputFileVideo.parentNode.classList.add("invalid")
        inputFileVideo.parentNode.querySelector(".invalid-msg").textContent = 'Escolha um  arquivo do tipo video!!'
        inputFileVideo.value = ""
    }
}
)


