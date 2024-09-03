import React, { useState } from 'react';
import './AddTodoModal.css';

const AddTodoModal = ({ isOpen, onClose, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title, description);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Todo</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input type='text'
            placeholder="Todo description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="modal-buttons">
            <button type="submit">Add Todo</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
