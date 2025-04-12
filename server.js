const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// In-memory database (for demonstration)
let tasks = [
    { id: 1, text: 'Learn HTML', completed: false },
    { id: 2, text: 'Learn CSS', completed: false },
    { id: 3, text: 'Learn JavaScript', completed: false }
];

// API Routes
// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        text: req.body.text,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task (toggle completion)
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.completed = !task.completed;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});