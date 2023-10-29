document.getElementById('inputImage').addEventListener('change', function(event) {

    const file = event.target.files[0];
    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' ||extension === 'webp') {

        const reader = new FileReader();

        reader.onload = function() {
            const container = document.getElementById('image_container');
            container.style.backgroundImage = `url(${reader.result})`;
            const label = container.getElementsByTagName("label")
            console.log(label)
            label.style.opacity = 0
        }

    reader.readAsDataURL(file);
    
    } else {
        alert('O tipo de arquivo não é suportado.');
    }
        
    });

    

    