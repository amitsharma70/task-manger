import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './taskform.css'; // Import CSS for styles

const TaskForm = ({ fetchTasks, editTask, resetEditTask }) => {
    const [task, setTask] = useState({
        title: editTask ? editTask.title : '',
        description: editTask ? editTask.description : '',
    });

    useEffect(() => {
        if (editTask) {
            setTask({ title: editTask.title, description: editTask.description });
        }
    }, [editTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editTask) {
            await axios.put(`http://localhost:5000/api/tasks/${editTask._id}`, task);
            resetEditTask();  // Reset after update
        } else {
            await axios.post('http://localhost:5000/api/tasks', task);
        }
        fetchTasks();
        setTask({ title: '', description: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Task Title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
                className="input-field"
            />
            <textarea
                placeholder="Task Description"
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
                required
                className="textarea-field"
            />
            <button type="submit" className="submit-btn">
                {editTask ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
