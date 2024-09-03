import React, { useRef } from "react";
import "./TodoList.css";

const TodoList = ({ todos, onToggleTodo, onEditTodo, filter }) => {
  const audioContextRef = useRef(null);

  const playCompletionSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    
    const playNote = (frequency, startTime, duration) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, startTime);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = audioContext.currentTime;
    playNote(880, now, 0.15); // A5
    playNote(1108.73, now + 0.1, 0.15); // C#6
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo.completed) {
      playCompletionSound();
    }
    onToggleTodo(id);
  };

  console.log("Current filter:", filter); // Debug: Log the current filter
  console.log("All todos:", todos); // Debug: Log all todos

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  console.log("Filtered todos:", filteredTodos); // Debug: Log filtered todos

  const renderMessage = () => {
    if (filter === 'active' && filteredTodos.length === 0) {
      return "No active todos. Great job!";
    } else if (filter === 'completed' && filteredTodos.length === 0) {
      return "No completed todos yet. Keep going!";
    } else if (todos.length === 0) {
      return "No todos found. Add a new todo to get started!";
    }
    return null;
  };

  const message = renderMessage();

  if (message) {
    return <div className="no-todos-message">{message}</div>;
  }

  return (
    <ul className="todo-list-container">
      {filteredTodos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              className="custom-checkbox"
            />
            <div className="todo-text">
              <span className={`todo-title ${todo.completed ? "crossed-out" : ""}`}>
                {todo.title}
              </span>
              {todo.description && (
                <p className="todo-description">{todo.description}</p>
              )}
            </div>
          </div>
          {!todo.completed && (
            <button 
              className="edit-button" 
              onClick={() => onEditTodo(todo)}
            >
              Edit
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
