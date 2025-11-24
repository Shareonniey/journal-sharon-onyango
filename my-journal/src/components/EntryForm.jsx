import React from "react";
import { useEffect, useState } from 'react'
function EntryForm({ initialData = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [body, setBody] = useState(initialData?.body || "");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setTitle(initialData?.title || "");
    setBody(initialData?.body || "");
    setErrors({});
  }, [initialData]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (!body.trim()) e.body = "Body is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    onSubmit(title.trim(), body.trim());
  };

  return (
    <form className="entry-form" onSubmit={submit}>
      <h2>{initialData ? "Edit Entry" : "New Entry"}</h2>

      <div className="form-row">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entry title"
        />
        {errors.title && <small className="error">{errors.title}</small>}
      </div>

      <div className="form-row">
        <label>Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          placeholder="Write your thoughts..."
        />
        {errors.body && <small className="error">{errors.body}</small>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn primary">
          {initialData ? "Save" : "Create"}
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EntryForm;
