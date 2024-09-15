import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './tasklist.css';  // Import CSS for styles

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id) => {
        setLoading(true);
        setError('');
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            setError('Failed to delete the task.');
        } finally {
            setLoading(false);
        }
    };

    const markComplete = async (id, completed) => {
        setLoading(true);
        setError('');
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed });
            fetchTasks();
        } catch (err) {
            setError('Failed to update task status.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditTask = (task) => {
        setEditTask(task);
    };

    const handleResetEditTask = () => {
        setEditTask(null);  // Reset the editTask after submission
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-list-container">
            <h1>Task Manager</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-text">{error}</p>}

            <TaskForm fetchTasks={fetchTasks} editTask={editTask} resetEditTask={handleResetEditTask} />

            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                        <button onClick={() => markComplete(task._id, task.completed)} className="task-btn">
                            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => handleEditTask(task)} className="task-btn">
                            Edit
                        </button>
                        <button onClick={() => deleteTask(task._id)} className="task-btn delete-btn">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
