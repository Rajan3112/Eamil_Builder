// Selectors
const components = document.querySelectorAll('.component');
const canvas = document.getElementById('canvas');
const previewBtn = document.getElementById('previewBtn');
const exportBtn = document.getElementById('exportBtn');

// Drag-and-Drop Functionality
components.forEach(component => {
  component.addEventListener('dragstart', e => {
    e.dataTransfer.setData('type', component.dataset.type);
  });
});

canvas.addEventListener('dragover', e => {
  e.preventDefault();
});

canvas.addEventListener('drop', e => {
  e.preventDefault();
  const type = e.dataTransfer.getData('type');
  addElementToCanvas(type);
});

// Add Elements to Canvas
function addElementToCanvas(type) {
  const element = document.createElement('div');
  element.className = 'element';
  if (type === 'text') {
    element.contentEditable = true;
    element.innerText = 'Editable Text Block';
  } else if (type === 'image') {
    element.innerHTML = '<img src="https://via.placeholder.com/300x150" alt="Placeholder Image">';
  } else if (type === 'button') {
    element.innerHTML = '<button class="button">Click Me</button>';
  } else if (type === 'divider') {
    element.innerHTML = '<hr>';
  }
  canvas.appendChild(element);
}

// Preview Email
previewBtn.addEventListener('click', () => {
  const emailContent = canvas.innerHTML;
  const previewWindow = window.open('', '_blank');
  previewWindow.document.write(emailContent);
  previewWindow.document.close();
});

// Export HTML
exportBtn.addEventListener('click', () => {
  const emailContent = canvas.innerHTML;
  const blob = new Blob([emailContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'email-template.html';
  link.click();
});
