import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
      };
      state.unshift(newTodo); 
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const { id, title, description } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.title = title;
        todo.description = description;
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
