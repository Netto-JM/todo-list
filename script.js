const addButton = document.getElementById('criar-tarefa');
const taskInput = document.getElementById('texto-tarefa');
const taskList = document.getElementById('lista-tarefas');

function appendTextNode(element, text) {
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
}

function addIdToElement(element, idName) {
  element.setAttribute('id', idName);
}

function createElementWithText(element, text) {
  const newElement = document.createElement(element);
  if (text) appendTextNode(newElement, text);
  return newElement;
}

function completeElementBuilder(element, text, parent, idName) {
  const newElement = createElementWithText(element, text);
  if (idName) addIdToElement(newElement, idName);
  if (parent) parent.appendChild(newElement);
  return newElement;
}

function selectItem(event) {
  const clickedItem = event.target;
  clickedItem.classList.add('selected');
}

function addItem() {
  const taskText = taskInput.value;
  const taskItem = completeElementBuilder('li', taskText, taskList, 'task-item');
  taskItem.addEventListener('click', selectItem);
  taskInput.value = '';
}

addButton.addEventListener('click', addItem);
