import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dummyTodos } from "./data/dummyTodos";
import TodoList from "./pages/TodoList";
import TodoDetail from "./pages/TodoDetail";

export default function App() {

  const [todos, setTodos] = useState(dummyTodos);
  const [toast, setToast] = useState("");

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const addTodo = (data) => {
    const newId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
    setTodos([...todos, { ...data, id: newId }]);
    notify("Tugas berhasil ditambahkan");
  };

  const updateTodo = (id, data) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, ...data, id } : t)));
    notify("Tugas berhasil diperbarui");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
    notify("Tugas berhasil dihapus");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList todos={todos} onAdd={addTodo} onDelete={deleteTodo} />} />
        <Route path="/todos/:id" element={<TodoDetail todos={todos} onUpdate={updateTodo} />} />
      </Routes>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}