const tagsTextArea = document.getElementById('tags');
const tagsPreview = document.getElementById('tags-preview');



tagsTextArea.addEventListener('keydown', function(e) {

  if (e.key === 'Enter' || e.key === 'Space' ) {
    e.preventDefault();
    const tags = tagsTextArea.value.split(/[ ,]+/);
    tagsPreview.innerHTML = '';
  
  tags.forEach(function(tag) {
    if (tag.trim() !== '') {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      const maxTagLength = 22; 
      const trimmedTag = tag.trim().slice(0, maxTagLength);
      tagElement.innerText = `#${trimmedTag}`;
      
      tagsPreview.appendChild(tagElement);
      
    }
  });
}
});
