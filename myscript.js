document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  //we have to store these tasks
  // also if there is already some tasks added, we grab n put them in the array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //if there is something to display run renderTask for one task at a time n display  
  tasks.forEach(task => renderTask(task))

  //add task starts here
  addTaskButton.addEventListener("click", () => {
    //grab the input value which user types
    const taskText = todoInput.value.trim();
    //check if task is added without writing anything
    if (taskText === "") return;

    //add unique id to every task and add a property to strike off
    //whenever someone clicks add task, we hold the value and create an object
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    //now push this task in the task array
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);

    //after task added to list, we clean the input field
    todoInput.value = "";
    console.log(tasks);
  });

  //to add things to the local storage
  function saveTasks() {
    //local storage API invoked using localStorage keyword
    //stringify converts to string, parse converts it back from string to the original datatype
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //retrieve the tasks and render on the dom
  function renderTask(task) {
    const li = document.createElement('li')
    li.setAttribute("data-id", task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON') return
      task.completed = !task.completed
      li.classList.toggle('completed')
      saveTasks()
    })

    li.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation()  //prevent toggle from firing
      tasks = tasks.filter(t => t.id !== task.id)  //if we put === then only the task which we delete will remain
      li.remove()
      saveTasks()
    })


    todoList.appendChild(li)
  }
})