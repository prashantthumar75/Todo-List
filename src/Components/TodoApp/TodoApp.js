import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, updateTodo, setTodos } from "../../todoSlice";
import TodoList from "./TodoList";
import Filters from "./Filters";
import EditModal from "./EditModal";
import AddTodoModal from "./AddTodoModal";
import "./TodoApp.css";

const TodoApp = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load todos from local storage on component mount
  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (!storedTodos || storedTodos.length === 0) {
      // If no todos in local storage, add two initial todos
      storedTodos = [
        {
          id: 1,
          title: "Learn React",
          description: "Study React basics",
          completed: false,
        },
        {
          id: 2,
          title: "Build a Todo App",
          description: "Create a todo app using React",
          completed: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(storedTodos));
    }
    dispatch(setTodos(storedTodos));
  }, [dispatch]);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (title, description) => {
    dispatch(addTodo({ title, description }));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEditTodo = (id, title, description) => {
    dispatch(updateTodo({ id, title, description }));
    setEditingTodo(null);
    setIsEditModalOpen(false);
  };

  const openEditModal = (todo) => {
    if (!todo.completed) {
      setEditingTodo(todo);
      setIsEditModalOpen(true);
    }
  };

  const filteredAndSearchedTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    })
    .filter((todo) => {
      return todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const sortedTodos = [...filteredAndSearchedTodos].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <div className="todo-app">
      <h1 className="center">Todo List</h1>
      <button className="add-todo-button" onClick={() => setIsAddModalOpen(true)}>
        Add Todo
      </button>
      <Filters 
        filter={filter} 
        setFilter={setFilter} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
      />
      <TodoList
        todos={sortedTodos}
        onToggleTodo={handleToggleTodo}
        onEditTodo={openEditModal}
        filter={filter}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        todo={editingTodo}
        onSave={handleEditTodo}
      />
      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTodo={handleAddTodo}
      />
    </div>
  );
};

export default TodoApp;
