import React, { useState } from "react";

function EntryForm({ initialData = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setError("Both title and body are required");
      return;
    }
    onSubmit(title, body);
    setTitle("");
    setBody("");
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <h2>{initialData ? "Edit Entry" : "New Entry"}</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Write your thoughts..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">{initialData ? "Update" : "Add Entry"}</button>
      {initialData && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EntryForm;
