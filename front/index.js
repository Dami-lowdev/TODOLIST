window.onload = function () {
    fetchTasks();
};

function fetchTasks() {
    fetch('/todo')
        .then(response => response.json())
        .then(tasks => {
            const taskContainer = document.getElementById('taskContainer');
            taskContainer.innerHTML = ''; // Nettoyer le contenu existant
            tasks.forEach(task => {
                if(task.docstate!== 'done'){
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.id = task._id; // Utilisation de l'id comme identifiant
                taskDiv.innerHTML = `
                <p><strong>Content:</strong> ${task.content}</p>
                <button class="buttondone" onclick="completeTask('${task._id}', '${task.docstate}')">Tick</button>
                <button class="buttondelete" onclick="deleteTask('${task._id}')">Delete</button>
            `;
                taskContainer.appendChild(taskDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function completeTask(taskId, currentState) {
    const newState = currentState === 'done' ? 'undone' : 'done';
    fetch(`/todo/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ docstate: newState })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to complete task');
            }
            if (newState === 'done') {
                // If the task is marked as done, move it to the pop-up window
                moveTaskToPopup(taskId);
            } else {
                // If the task is marked as undone, reload the page to reflect the changes
                location.reload();
            }
        })
        .catch(error => console.error('Error completing task:', error));
}

function moveTaskToPopup(taskId) {
    const taskElement = document.getElementById(taskId);
    const doneTasksList = document.getElementById("doneTasksList");
    doneTasksList.appendChild(taskElement.cloneNode(true)); // Add task to pop-up window
    taskElement.style.display = "none"; // Hide task from main page
}


function deleteTask(taskId) {
    fetch(`/todo/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete task');
            }
            location.reload(); // Reload the page after deleting the element
        })
        .catch(error => console.error('Error deleting task:', error));
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskContent = taskInput.value.trim();
    if (taskContent !== '') {
        fetch('/todo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: taskContent, docstate: 'undone' })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add task');
                }
                location.reload(); // Recharger la page après avoir ajouté la tâche
            })
            .catch(error => console.error('Error adding task:', error));
    } else {
        alert('Please enter a task.');
    }
}


// Function to show the pop-up window with done tasks
function showPopup() {
    const popup = document.getElementById("popup");
    const doneTasksList = document.getElementById("doneTasksList");
    doneTasksList.innerHTML = ""; // Clear previous content

    // Fetch the list of done tasks from the server
    fetch('/todo/?docstate=done')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch done tasks');
            }
            return response.json();
        })
        .then(tasks => {
            // Filter out only the tasks with the state "done"
            const doneTasks = tasks.filter(task => task.docstate === 'done');
            // Create task elements for each done task and append them to the doneTasksList
            doneTasks.forEach(task => {
                const taskElement = createTaskElement(task);
                doneTasksList.appendChild(taskElement);
            });
            // Display the pop-up window
            popup.style.display = "block";
        })
        .catch(error => console.error('Error fetching done tasks:', error));
}




// Function to create a task element with delete button/icon
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    
    
    const contentElement = document.createElement('div');
    contentElement.textContent = task.content;
    taskElement.appendChild(contentElement);
    
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'; // You can also use an icon here
    deleteButton.addEventListener('click', function() {
        deleteTask(task._id);
    });
    taskElement.appendChild(deleteButton);
    
    return taskElement;
}


// Function to close the pop-up window
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}


