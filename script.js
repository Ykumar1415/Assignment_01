const srcContainer = document.getElementById('source-container');
const initialItems = Array.from(srcContainer.getElementsByClassName('item'));

initialItems.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
});

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.innerText);
    event.target.classList.add('dragging');
}

function allowDrop(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const srcItem = document.querySelector('.dragging');
    srcItem.remove();

    const newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.textContent = data;

    event.target.appendChild(newItem);
    srcItem.classList.remove('dragging');
    showSuccessMessage();
}

const destContainer = document.getElementById('destination-container');

function resetContainers() {
    destContainer.innerHTML = 'Drop here';
    srcContainer.innerHTML = '';
    initialItems.forEach(item => {
        srcContainer.appendChild(item.cloneNode(true));
        item.addEventListener('dragstart', handleDragStart);
    });

    destContainer.removeEventListener('dragover', allowDrop);
    destContainer.removeEventListener('drop', handleDrop);
    destContainer.addEventListener('dragover', allowDrop);
    destContainer.addEventListener('drop', handleDrop);
    hideSuccessMessage();
}

function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    setTimeout(() => {
        hideSuccessMessage();
    }, 2000);
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'none';
}
