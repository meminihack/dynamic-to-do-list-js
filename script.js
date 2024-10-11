document.addEventListener("DOMContentLoaded", function() {
   
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); y
        storedTasks.forEach(taskText => addTask(taskText, false));  
    }

    function addTask(taskText, save = true) {
     
        const li = document.createElement("li");
        li.textContent = taskText;             

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";  
        removeButton.classList.add("remove-btn");

       
        removeButton.onclick = function() {
            taskList.removeChild(li);        
            removeTaskFromStorage(taskText);     
        };

 
        li.appendChild(removeButton);
        taskList.appendChild(li);

        taskInput.value = "";

    
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); 
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));  
    }

    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  
        const updatedTasks = storedTasks.filter(task => task !== taskText);  
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); 
    }

  
    addButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);  
        } else {
            alert("Please enter a task!");
        }
    });

 
    taskInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const taskText = taskInput.value.trim(); 
            if (taskText !== "") {
                addTask(taskText); 
            } else {
                alert("Please enter a task!");
            }
        }
    });

    loadTasks();
});
