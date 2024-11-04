import React, { useState } from 'react';

export default function TodoItem({ task, setTasks, tasks }) {
  const [editText, setEditText] = useState(task.text);

  const formatTaskText = (text) => {
    return text.replace(/(.{1,40})(\s|$)/g, "$1\n").trim();
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleEditTask = (id) => {
    if (task.completed) return;
    if (task.isEditing) {
      updateTaskText(id); 
    } else {
      setEditText(task.text); 
      setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
    }
  };

  const updateTaskText = (id) => {
    const formattedText = formatTaskText(editText); 
    if (!formattedText.trim()) return; 
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: formattedText, isEditing: false } : task
    ));
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      updateTaskText(id); 
    }
  };

  return (
    <li className={`taskItem ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      {task.isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={() => updateTaskText(task.id)} 
          onKeyDown={(e) => handleKeyDown(e, task.id)}
          className="editInput"
          autoFocus 
        />
      ) : (
        <span className="taskText">{task.text}</span>
      )}
      <button
        onClick={() => toggleEditTask(task.id)}
        className="editButton"
        disabled={task.completed} 
      >
        {task.isEditing ? 'Save' : 'Edit'}
      </button>
      <button onClick={() => deleteTask(task.id)} className="deleteButton">Delete</button>
    </li>
  );
}
