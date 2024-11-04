import React, { useState, useEffect } from 'react';
import TodoItem from '../todoItem/Index';
import './Index.css';
import { debounce } from 'lodash';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

    useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(savedTasks);
    } catch (e) {
      console.error("Failed to load tasks:", e);
      setTasks([]);
    }
  }, []);

    const saveTasksToLocalStorage = debounce((tasks) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks:", e);
    }
  }, 500);

    useEffect(() => {
      saveTasksToLocalStorage(tasks);
    }, [tasks, saveTasksToLocalStorage]);

    const formatTaskText = (text) => {
    return text.replace(/(.{1,39})(\s|$)/g, "$1\n").trim();
  };

  const addTask = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return; 
    setTasks([...tasks, { id: Date.now(), text: formatTaskText(trimmedInput), completed: false, isEditing: false }]);
    setInput("");
  };

  const clearTasks = () => {
    if (tasks.length > 0 && window.confirm("Are you sure you want to clear all tasks?")) {
      setTasks([]);
    }
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="container">
      <h1 className="title">To-Do List</h1>
      
      <div className="inputContainer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          placeholder="Add a new task"
          className="input"
          aria-label="New task input" 
        />
        <button onClick={addTask} className="addButton" aria-label="Add task">Add</button>
      </div>

      {tasks.length === 0 && <p className="emptyMessage">No tasks added yet. Start by adding one!</p>}

      <ul className="taskList">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            setTasks={setTasks}
            tasks={tasks}
          />
        ))}
      </ul>

      <div className="buttonContainer">
        <button onClick={clearTasks} className="clearButton" aria-label="Clear all tasks">Clear All</button>
        <button onClick={clearCompletedTasks} className="clearCompletedButton" aria-label="Clear completed tasks">Clear Completed</button>
      </div>
    </div>
  );
}
