const addTask = document.querySelector('#add-task')
const input = document.querySelector('#input')
const tasksList = document.querySelector('#tasks-list')

document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
  addId();
});

function addId () {
  let id = 0;
  let cells = document.querySelectorAll('.taskitem');
  cells.forEach(function(el) {
    el.id = id++;
  });
}

function deleteTaskFunk(taskItem) {
  const taskItemId = taskItem.id;
  tasksList.removeChild(taskItem);
  removeTask(taskItemId);
  addId();
}

function changeTaskFunk(taskItem) {
  const task = taskItem.querySelector('.task');
  const taskItemId = taskItem.id;
  changeTask(taskItemId);
  task.innerText = input.value;
  input.value = "";
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (elem) {

    let task = document.createElement("div");
    task.textContent = elem;
    task.className = 'task';

    let taskItem = document.createElement('div');
    taskItem.className = 'taskitem';
    tasksList.appendChild(taskItem);
    taskItem.appendChild(task);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'button';
    const changeBtn = document.createElement('button');
    changeBtn.className = 'button';

    deleteBtn.textContent = 'Удалить';
    changeBtn.textContent = 'Изменить';
    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(changeBtn);

    deleteBtn.addEventListener('click', deleteTaskFunk.bind(null, taskItem));
    changeBtn.addEventListener('click', changeTaskFunk.bind(null, taskItem));
  });
}
// добавление при нажатии на добавить
addTask.addEventListener('click', addTaskFunk)

function addTaskFunk() {
 
  const task = document.createElement('div');
  task.className = 'task';
  task.textContent = input.value;

  let taskItem = document.createElement('div');
  taskItem.className = 'taskitem';
  tasksList.appendChild(taskItem);
  taskItem.appendChild(task);
  // сохраняем в локал
  saveTask(input.value);

  input.value = "";

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'button';
  const changeBtn = document.createElement('button');
  changeBtn.className = 'button';

  deleteBtn.textContent = 'Удалить';
  changeBtn.textContent = 'Изменить';

  taskItem.appendChild(deleteBtn);
  taskItem.appendChild(changeBtn);

  let cells = document.querySelectorAll('.taskitem');
  let lastCell = cells.length-1;
  taskItem.id = lastCell;

  deleteBtn.addEventListener('click', deleteTaskFunk.bind(null, taskItem));
  changeBtn.addEventListener('click', changeTaskFunk.bind(null, taskItem));
}

// Сохранение задачи в локал
function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  // Здесь мы извлекаем значение, связанное с ключом "tasks" из localStorage. 
  //  Если в localStorage нет значения для ключа "tasks" или значение не 
  //  может быть преобразовано из JSON в объект, то переменной tasks присваивается пустой
  //   массив.
  tasks.push(task);
  // Мы добавляем новую задачу task в массив tasks с 
  // помощью метода push(). Теперь новая задача добавлена в массив.
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // Мы сохраняем обновленный массив tasks в localStorage, 
  // преобразовывая его в строку JSON с помощью метода JSON.stringify(). 
  // Таким образом, обновленный список задач будет сохранен в localStorage под ключом "tasks".
}

function removeTask(taskItemId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(taskItemId, 1);
    // Мы используем метод splice() для удаления одного элемента 
    // из массива tasks по индексу index. 
    // Этот метод изменяет исходный массив
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Мы сохраняем обновленный массив tasks в localStorage, преобразовывая его в строку JSON 
    // с помощью метода JSON.stringify(). Таким образом, обновленный список задач будет
    //  сохранен в localStorage под ключом "tasks".
}

function changeTask(taskItemId) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(taskItemId, 1, input.value);
    // Мы используем метод splice() для удаления одного элемента 
    // из массива tasks по индексу id. 
    // Этот метод изменяет исходный массив
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // Мы сохраняем обновленный массив tasks в localStorage, преобразовывая его в строку JSON 
    // с помощью метода JSON.stringify(). Таким образом, обновленный список задач будет
    //  сохранен в localStorage под ключом "tasks".
}

