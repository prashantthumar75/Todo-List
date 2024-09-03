import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import TodoApp from "./Components/TodoApp/TodoApp";
import { store } from "./store";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
);
