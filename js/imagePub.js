document.getElementById('inputImage_resenha').addEventListener('change', function(event) {

    const file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' ||extension === 'webp') {

        const reader = new FileReader();

        reader.onload = function() {
            const container = document.getElementById('image_resenha');
            container.style.backgroundImage = `url(${reader.result})`;
            container.classList.add("")
        }

    reader.readAsDataURL(file);
    
    } else {
        alert('O tipo de arquivo não é suportado.');
    }
        
    });

    const inputVideo = document.getElementById('inputVideo')
    const feedVideo = document.querySelector(".feedback-video")
    const container = document.getElementById('containerVideo');
    
    inputVideo.addEventListener('change', function(event) {

        const file = event.target.files[0];
        const extension = file.name.split('.').pop().toLowerCase();
    
        if (extension !== 'mp4' || inputVideo.value === "") {
           
            container.src = "";
            container.style.display = "none"
            inputVideo.classList.add('is-invalid')
            feedVideo.classList.remove("d-none")
            feedVideo.classList.add("d-block")
        
        } else {

            inputVideo.classList.remove("is-invalid")
            feedVideo.classList.add("d-none")
            feedVideo.classList.remove("d-block")

            const reader = new FileReader();
    
            reader.onload = function() {
                container.style.display = "block"
                container.src = reader.result;
                container.classList.add('.filled')
            }
    
        reader.readAsDataURL(file);



           
        }
            
        });

    