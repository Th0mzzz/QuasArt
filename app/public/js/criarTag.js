const tagInput = document.querySelector(".tagInput");
const tagsContainer = document.querySelector("#tagsContainer");

tagInput.addEventListener("keyup", (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        if (tagInput.value.trim() !== '') {
            createTag(tagInput.value.trim());
            tagInput.value = '';
        }
    }
});

function createTag(tagText) {
    const div = document.createElement('div');
    div.className = 'tag text';
    div.textContent = tagText;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    closeBtn.addEventListener('click', function() {
        div.remove();
        input.remove();  
    });

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'tags[]';  
    input.value = tagText;

    div.appendChild(closeBtn);
    tagsContainer.appendChild(div);
    tagsContainer.appendChild(input);
}
