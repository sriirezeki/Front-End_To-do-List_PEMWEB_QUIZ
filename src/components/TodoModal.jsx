import { useState } from "react";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../data/dummyTodos";

export default function TodoModal({ todo, onSubmit, onClose }) {
  const isEdit = Boolean(todo);
  const [form, setForm] = useState(
    todo ?? { title: "", description: "", status: "to-do", priority: "low", deadline: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      setError("Judul dan deadline wajib diisi.");
      return;
    }
    onSubmit({ ...form, title: form.title.trim() });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2>{isEdit ? "Update Todo" : "Tambah Todo"}</h2>

        <label>Judul</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Deskripsi</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />

        <div className="row">
          <div>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label>Prioritas</label>
            <select name="priority" value={form.priority} onChange={handleChange}>
              {PRIORITY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <label>Deadline</label>
        <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <div className="row">
          <button type="button" className="btn btn-red" onClick={onClose}>Batal</button>
          <button type="submit" className="btn btn-blue">{isEdit ? "Update" : "Tambah"}</button>
        </div>
      </form>
    </div>
  );
}