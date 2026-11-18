import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoDetail({ todos, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    return (
      <div className="container">
        <p>Tugas tidak ditemukan.</p>
        <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
      </div>
    );
  }

  return (
    <div className="detail-wrap">
      <div className="detail">
        <div className="col">
          <h3>Judul</h3>
          <p>{todo.title}</p>
          <h3>Deskripsi</h3>
          <div className="desc">{todo.description || "-"}</div>
        </div>
        <div className="col side">
          <h3>Status</h3><p>{todo.status}</p>
          <h3>Prioritas</h3><p>{todo.priority}</p>
          <h3>Deadline</h3><p>{todo.deadline}</p>
          <div className="row">
            <button className="btn btn-red" onClick={() => navigate("/")}>Kembali</button>
            <button className="btn btn-blue" onClick={() => setShowEdit(true)}>Update</button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TodoModal
          todo={todo}
          onClose={() => setShowEdit(false)}
          onSubmit={(data) => { onUpdate(todo.id, data); setShowEdit(false); }}
        />
      )}
    </div>
  );
}