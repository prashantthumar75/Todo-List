import React, { useState } from "react";

const TodoEditForm = ({ todo, onSave, onCancel }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(todo.id, title, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Todo description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="rounded">
        Save
      </button>
      <button type="button" className="pill" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TodoEditForm;
