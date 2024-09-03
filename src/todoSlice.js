import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Learn Redux",
    description: "",
    completed: false,
    isEdited: false,
  },
  {
    id: 2,
    title: "Build a Todo App",
    description: "",
    completed: true,
    isEdited: false,
  },
];

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.length + 1,
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        isEdited: false, // New todos are not edited initially
      };
      state.unshift(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        if (todo.title !== title) {
          todo.isEdited = true; // Mark as edited if title changes
        }
        todo.title = title;
        todo.description = description;
      }
    },
    setTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, toggleTodo, updateTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
