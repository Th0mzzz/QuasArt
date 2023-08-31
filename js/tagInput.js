const tagContainer = document.getElementById('#tagContainer_resenha');
const tagInput = document.getElementById('#tagInput_resenha');
const tagList = document.getElementById('#tagList_resenha');

let tags = [];

function addTag(tag) {
  tags.push(tag);
  const tagElement = document.createElement('div');
  tagElement.classList.add('tagElement');
  tagElement.textContent = tag;
  const tagRemove = document.createElement('span');
  tagRemove.classList.add('tagRemove');
  tagRemove.innerHTML = '&times;';
  tagRemove.addEventListener('click', () => {
    removeTag(tag);
  });
  tagElement.appendChild(tagRemove);
  tagContainer.insertBefore(tagElement, tagInput);
  tagInput.value = '';
  updateTagList();
}

function removeTag(tag) {
  const index = tags.indexOf(tag);
  if (index !== -1) {
    tags.splice(index, 1);
    const tagElement = document.querySelector(`.${tag}`);
    tagContainer.removeChild(tagElement);
    updateTagList();
  }
}

function updateTagList() {
  tagList.textContent = tags.join(', ');
}

tagInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault();
    const tag = tagInput.value.trim();
    if (tag) {
      addTag(tag);
    }
  }
});S