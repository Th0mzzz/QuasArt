document.getElementById('inputImage_resenha').addEventListener('change', function(event) {

    const file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' ||extension === 'webp') {

        const reader = new FileReader();

        reader.onload = function() {
            const container = document.getElementById('image_resenha');
            container.style.backgroundImage = `url(${reader.result})`;
        }

    reader.readAsDataURL(file);
    
    } else {
        alert('O tipo de arquivo não é suportado.');
    }
        
    });


    document.getElementById('inputVideo').addEventListener('change', function(event) {

        const file = event.target.files[0];
        const extension = file.name.split('.').pop().toLowerCase();
    
        if (extension === 'mp4') {
    
            const reader = new FileReader();
    
            reader.onload = function() {
                const container = document.getElementById('containerVideo');
                container.src = reader.result;
            }
    
        reader.readAsDataURL(file);
        
        } else {
            alert('O tipo de arquivo não é suportado.');
        }
            
        });