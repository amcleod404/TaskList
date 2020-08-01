// Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Event listeners

// Add Task

form.addEventListener('submit', (e) => {

  if (taskInput.value === '') {
    alert('🤡');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);

  // Store task in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';

  e.preventDefault()

});

// Store task to LS

const storeTaskInLocalStorage = (task) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

document.addEventListener('DOMContentLoaded', (e) => {

  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
  
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);

  });

});

// Remove task

taskList.addEventListener('click', (e) => {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?'))
    taskList.removeChild(e.target.parentElement.parentElement);
    
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }

});

// Remove task from LS

const removeTaskFromLocalStorage = (taskItem) => {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }

  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

};

// Clear Tasks

clearBtn.addEventListener('click', (e) => {
  //taskList.innerHTML = '';

  // Faster

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksfromLocalStorage();
  
});

// Clear Tasks from LS

const clearTasksfromLocalStorage = () => {
  localStorage.clear();
};

// Filter through tasks

filter.addEventListener('keyup', (e) => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    console.log(item);
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
});










