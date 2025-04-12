// // document.addEventListener('DOMContentLoaded', function() {
// //     const taskInput = document.getElementById('task-input');
// //     const addTaskBtn = document.getElementById('add-task-btn');
// //     const taskList = document.getElementById('task-list');
// //     const filterBtns = document.querySelectorAll('.filter-btn');
    
// //     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
// //     let currentFilter = 'all';
    
// //     // Render tasks based on current filter
// //     function renderTasks() {
// //         taskList.innerHTML = '';
        
// //         const filteredTasks = tasks.filter(task => {
// //             if (currentFilter === 'all') return true;
// //             if (currentFilter === 'completed') return task.completed;
// //             if (currentFilter === 'pending') return !task.completed;
// //         });
        
// //         filteredTasks.forEach((task, index) => {
// //             const taskItem = document.createElement('li');
// //             taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
// //             taskItem.innerHTML = `
// //                 <span>${task.text}</span>
// //                 <div class="task-actions">
// //                     <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
// //                     <button class="delete-btn">Delete</button>
// //                 </div>
// //             `;
            
// //             taskItem.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(index));
// //             taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
            
// //             taskList.appendChild(taskItem);
// //         });
// //     }
    
// //     // Add a new task
// //     function addTask() {
// //         const text = taskInput.value.trim();
// //         if (text) {
// //             tasks.push({ text, completed: false });
// //             saveTasks();
// //             taskInput.value = '';
// //             renderTasks();
// //         }
// //     }
    
// //     // Toggle task completion status
// //     function toggleComplete(index) {
// //         tasks[index].completed = !tasks[index].completed;
// //         saveTasks();
// //         renderTasks();
// //     }
    
// //     // Delete a task
// //     function deleteTask(index) {
// //         tasks.splice(index, 1);
// //         saveTasks();
// //         renderTasks();
// //     }
    
// //     // Save tasks to localStorage
// //     function saveTasks() {
// //         localStorage.setItem('tasks', JSON.stringify(tasks));
// //     }
    
// //     // Set filter
// //     function setFilter(filter) {
// //         currentFilter = filter;
// //         filterBtns.forEach(btn => {
// //             btn.classList.toggle('active', btn.dataset.filter === filter);
// //         });
// //         renderTasks();
// //     }
    
// //     // Event listeners
// //     addTaskBtn.addEventListener('click', addTask);
// //     taskInput.addEventListener('keypress', (e) => {
// //         if (e.key === 'Enter') addTask();
// //     });
    
// //     filterBtns.forEach(btn => {
// //         btn.addEventListener('click', () => setFilter(btn.dataset.filter));
// //     });
    
// //     // Initial render
// //     renderTasks();
// // });

// document.addEventListener('DOMContentLoaded', function() {
//     const taskInput = document.getElementById('task-input');
//     const addTaskBtn = document.getElementById('add-task-btn');
//     const taskList = document.getElementById('task-list');
//     const filterBtns = document.querySelectorAll('.filter-btn');
    
//     let tasks = [];
//     let currentFilter = 'all';
    
//     // Fetch tasks from server
//     async function fetchTasks() {
//         try {
//             const response = await fetch('http://localhost:5000/api/tasks');
//             tasks = await response.json();
//             renderTasks();
//         } catch (error) {
//             console.error('Error fetching tasks:', error);
//         }
//     }
    
//     // Render tasks based on current filter
//     function renderTasks() {
//         taskList.innerHTML = '';
        
//         const filteredTasks = tasks.filter(task => {
//             if (currentFilter === 'all') return true;
//             if (currentFilter === 'completed') return task.completed;
//             if (currentFilter === 'pending') return !task.completed;
//         });
        
//         filteredTasks.forEach(task => {
//             const taskItem = document.createElement('li');
//             taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
//             taskItem.innerHTML = `
//                 <span>${task.text}</span>
//                 <div class="task-actions">
//                     <button class="complete-btn" data-id="${task.id}">${task.completed ? 'Undo' : 'Complete'}</button>
//                     <button class="delete-btn" data-id="${task.id}">Delete</button>
//                 </div>
//             `;
            
//             taskList.appendChild(taskItem);
//         });
//     }
    
//     // Add a new task
//     async function addTask() {
//         const text = taskInput.value.trim();
//         if (text) {
//             try {
//                 const response = await fetch('http://localhost:5000/api/tasks', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ text }),
//                 });
//                 const newTask = await response.json();
//                 tasks.push(newTask);
//                 taskInput.value = '';
//                 renderTasks();
//             } catch (error) {
//                 console.error('Error adding task:', error);
//             }
//         }
//     }
    
//     // Toggle task completion status
//     async function toggleComplete(taskId) {
//         try {
//             const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//                 method: 'PUT',
//             });
//             const updatedTask = await response.json();
            
//             // Update local tasks array
//             const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);
//             if (taskIndex !== -1) {
//                 tasks[taskIndex] = updatedTask;
//             }
            
//             renderTasks();
//         } catch (error) {
//             console.error('Error updating task:', error);
//         }
//     }
    
//     // Delete a task
//     async function deleteTask(taskId) {
//         try {
//             await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
//                 method: 'DELETE',
//             });
            
//             // Update local tasks array
//             tasks = tasks.filter(t => t.id !== taskId);
//             renderTasks();
//         } catch (error) {
//             console.error('Error deleting task:', error);
//         }
//     }
    
//     // Set filter
//     function setFilter(filter) {
//         currentFilter = filter;
//         filterBtns.forEach(btn => {
//             btn.classList.toggle('active', btn.dataset.filter === filter);
//         });
//         renderTasks();
//     }
    
//     // Event listeners
//     addTaskBtn.addEventListener('click', addTask);
//     taskInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') addTask();
//     });
    
//     filterBtns.forEach(btn => {
//         btn.addEventListener('click', () => setFilter(btn.dataset.filter));
//     });
    
//     // Event delegation for dynamic buttons
//     taskList.addEventListener('click', (e) => {
//         if (e.target.classList.contains('complete-btn')) {
//             const taskId = parseInt(e.target.dataset.id);
//             toggleComplete(taskId);
//         } else if (e.target.classList.contains('delete-btn')) {
//             const taskId = parseInt(e.target.dataset.id);
//             deleteTask(taskId);
//         }
//     });
    
//     // Initial fetch and render
//     fetchTasks();
// });

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let tasks = [];
    let currentFilter = 'all';
    
    // Fetch tasks from server
    async function fetchTasks() {
        try {
            const response = await fetch('http://localhost:5000/api/tasks');
            tasks = await response.json();
            renderTasks();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
    
    // Render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'completed') return task.completed;
            if (currentFilter === 'pending') return !task.completed;
        });
        
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn" data-id="${task.id}">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
        });
    }
    
    // Add a new task
    async function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            try {
                const response = await fetch('http://localhost:5000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text }),
                });
                const newTask = await response.json();
                tasks.push(newTask);
                taskInput.value = '';
                renderTasks();
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }
    }
    
    // Toggle task completion status
    async function toggleComplete(taskId) {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'PUT',
            });
            const updatedTask = await response.json();
            
            // Update local tasks array
            const taskIndex = tasks.findIndex(t => t.id === updatedTask.id);
            if (taskIndex !== -1) {
                tasks[taskIndex] = updatedTask;
            }
            
            renderTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }
    
    // Delete a task
    async function deleteTask(taskId) {
        try {
            await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
            
            // Update local tasks array
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }
    
    // Set filter
    function setFilter(filter) {
        currentFilter = filter;
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        renderTasks();
    }
    
    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });
    
    // Event delegation for dynamic buttons
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('complete-btn')) {
            const taskId = parseInt(e.target.dataset.id);
            toggleComplete(taskId);
        } else if (e.target.classList.contains('delete-btn')) {
            const taskId = parseInt(e.target.dataset.id);
            deleteTask(taskId);
        }
    });
    
    // Initial fetch and render
    fetchTasks();
});