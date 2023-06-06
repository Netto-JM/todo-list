const clearCompletedButton = document.getElementById('remover-finalizados');
const removeButton = document.getElementById('remover-selecionado');
const clearAllButton = document.getElementById('apaga-tudo');
const saveButton = document.getElementById('salvar-tarefas');
const moveDownButton = document.getElementById('mover-baixo');
const moveUpButton = document.getElementById('mover-cima');
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
  const listItems = document.getElementsByClassName('task-item');
  for (let index = 0; index < listItems.length; index += 1) {
    const item = listItems[index];
    item.classList.remove('selected');
  }
  clickedItem.classList.add('selected');
}

function completeTask(event) {
  const completedItem = event.target;
  completedItem.classList.toggle('completed');
}

function addItem(taskText, event) {
  const taskItem = completeElementBuilder('li', taskText, taskList);
  taskItem.classList.add('task-item');
  taskItem.addEventListener('click', selectItem);
  taskItem.addEventListener('dblclick', completeTask);
  if (event.type === 'click') taskInput.value = '';
  return taskItem;
}

function removeListItems(listItems) {
  for (let index = listItems.length - 1; index >= 0; index -= 1) {
    const item = listItems[index];
    taskList.removeChild(item);
  }
}

function clearList() {
  const listItems = document.getElementsByClassName('task-item');
  removeListItems(listItems);
}

function saveList() {
  const taskDescriptions = [];
  const taskClasses = [];
  const listItems = document.getElementsByClassName('task-item');
  for (let index = 0; index < listItems.length; index += 1) {
    const item = listItems[index];
    const description = item.textContent;
    taskDescriptions.push(description);
    const classes = item.classList.toString();
    taskClasses.push(classes);
  }
  localStorage.setItem('taskDescriptions', JSON.stringify(taskDescriptions));
  localStorage.setItem('taskClasses', JSON.stringify(taskClasses));
}

function clearCompleted() {
  const completedTasks = document.getElementsByClassName('completed');
  removeListItems(completedTasks);
}

function getList(event) {
  const taskDescriptions = JSON.parse(localStorage.getItem('taskDescriptions'));
  if (taskDescriptions === null || taskDescriptions.length === 0) return;
  const taskClasses = JSON.parse(localStorage.getItem('taskClasses'));
  for (let index = 0; index < taskDescriptions.length; index += 1) {
    const description = taskDescriptions[index];
    const taskItem = addItem(description, event);
    const remainingClasses = taskClasses[index].split(' ').slice(1);
    taskItem.classList.add(...remainingClasses);
  }
}

function isNothingSelected(selectedTask) {
  const noSelectionMade = !selectedTask;
  if (noSelectionMade) return alert('Select a task first');
}

function moveTaskUp() {
  const selectedTask = document.querySelector('.selected');
  if (isNothingSelected(selectedTask)) return;
  const previousTask = selectedTask.previousElementSibling;
  const isTopTask = !previousTask;
  if (isTopTask) return alert('Task is already at the top');
  taskList.insertBefore(selectedTask, previousTask);
}

function moveTaskDown() {
  const selectedTask = document.querySelector('.selected');
  if (isNothingSelected(selectedTask)) return;
  const nextTask = selectedTask.nextElementSibling;
  const isBottomTask = !nextTask;
  if (isBottomTask) return alert('Task is already at the bottom');
  taskList.insertBefore(nextTask, selectedTask);
}

function removeSelectedTask() {
  const selectedTask = document.querySelector('.selected');
  if (isNothingSelected(selectedTask)) return;
  taskList.removeChild(selectedTask);
}

addButton.addEventListener('click', (event) => addItem(taskInput.value, event));
clearAllButton.addEventListener('click', clearList);
clearCompletedButton.addEventListener('click', clearCompleted);
saveButton.addEventListener('click', saveList);
moveUpButton.addEventListener('click', moveTaskUp);
moveDownButton.addEventListener('click', moveTaskDown);
removeButton.addEventListener('click', removeSelectedTask);
window.addEventListener('load', getList);
