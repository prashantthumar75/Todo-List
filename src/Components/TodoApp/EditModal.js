import React, { useEffect, useState } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, todo, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
    }
  }, [todo]);

  if (!isOpen || !todo) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(todo.id, title, description);
    onClose();
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-content">
        <h2>Edit Todo</h2>
        {todo.completed ? (
          <p>This todo is completed and cannot be modified.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todo title"
              required
            />
            <input type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Todo description"
            />
            <div className="edit-modal-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={onClose}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditModal;
