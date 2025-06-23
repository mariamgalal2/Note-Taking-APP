import React, { useState, useEffect } from "react";
// import { notetaking_app_backend } from "declarations/notetaking_app_backend";
import { notetaking_app_backend } from "../../declarations/notetaking_app_backend";
window.backend = notetaking_app_backend;

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const allNotes = await notetaking_app_backend.get_notes();
    setNotes(allNotes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await notetaking_app_backend.add_note(title, content);
    setTitle("");
    setContent("");
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📓 Note Taking App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        /><br /><br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content"
          required
        /><br /><br />
        <button type="submit">Add Note</button>
      </form>

      <h2>🗒 Notes</h2>
      <ul>
        {notes.map((note, index) => (
          <li key={index}><strong>{note.title}</strong>: {note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
