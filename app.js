const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListers();

function loadEventListers(){
  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeItem)
  clearBtn.addEventListener('click', claerTasks)
  filter.addEventListener('keyup', filterTasks)
}

function addTask(e){
  if(taskInput.value===''){
    alert('Do you really want to by-pass me !?')
  }
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value))
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML ='<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
storeTaskInLocalStorage(taskInput.value);
taskInput.value = '';
  e.preventDefault()
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task))
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML ='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks))  
}



// Event Deligation
function removeItem(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure about this?')){
    //alert('Are you sure about this?');
      e.target.parentElement.parentElement.remove()

      removeTasksFromLocalStorage( e.target.parentElement.parentElement);
    } 
  }

  function removeTasksFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
      tasks = []
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }
     tasks.forEach(function(task, index){
      if(taskItem.textContent===task){
        tasks.splice(index, 1)
      } 
     })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  //console.log(e.target);
  e.preventDefault()
}

function claerTasks(e){
  e.preventDefault()
  taskList.innerHTML = '';
// Faster
   while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild)
  // http://jsperf.com/innerhtml-vs-removechild()
  }
  claerTasksFromLocalStorage()
}
function claerTasksFromLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  e.preventDefault()
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
  //console.log(text);
}