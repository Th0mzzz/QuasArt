const tagsTextArea = document.getElementById('tags');
const tagsPreview = document.getElementById('tags-preview');

tagsTextArea.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
      e.preventDefault();
  }
});



tagsTextArea.addEventListener('input', function() {
  const tags = tagsTextArea.value.split(/[ ,]+/);
  tagsPreview.innerHTML = '';

  tags.forEach(function(tag) {
    if (tag.trim() !== '') {
      const tagElement = document.createElement('span');
      tagElement.classList.add('tag');
      tagElement.innerText = `#${tag.trim()}`;
      tagsPreview.appendChild(tagElement);
    }
  });
});