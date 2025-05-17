const input = document.querySelector('#favchap');
const button = document.querySelector('#addButton');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
  if (input.value.trim() === '') {
    input.focus();
    return;
  }

  const li = document.createElement('li');
  const deleteButton = document.createElement('button');
  li.textContent = input.value;
  deleteButton.textContent = '❌';

  deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
  deleteButton.addEventListener('click', () => {
    list.removeChild(li);
  });

  li.appendChild(deleteButton);
  list.appendChild(li);

  input.value = '';
  input.focus();
});
