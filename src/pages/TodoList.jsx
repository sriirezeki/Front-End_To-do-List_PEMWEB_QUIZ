import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoList({ todos, onAdd, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (todo) => {
    if (window.confirm(`Hapus tugas "${todo.title}"?`)) onDelete(todo.id);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Todo List</h1>
        <button className="btn btn-blue" onClick={() => setShowAdd(true)}>
          Tambah Todo
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Judul</th><th>Status</th><th>Prioritas</th>
            <th>Deadline</th><th className="center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr><td colSpan="5" className="empty">Belum ada tugas. Klik "Tambah Todo" untuk memulai.</td></tr>
          )}
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>{todo.deadline}</td>
              <td className="center">
                <button className="icon btn-blue" title="Lihat detail" onClick={() => navigate(`/todos/${todo.id}`)}>👁</button>
                <button className="icon btn-red" title="Hapus" onClick={() => handleDelete(todo)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAdd && (
        <TodoModal
          onClose={() => setShowAdd(false)}
          onSubmit={(data) => { onAdd(data); setShowAdd(false); }}
        />
      )}
    </div>
  );
}