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