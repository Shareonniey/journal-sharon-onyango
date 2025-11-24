import React from "react";

function EntryItem({ entry, onDelete, onEdit, onToggleImportant }) {
  return (
    <div className={`entry ${entry.important ? "important" : ""}`}>
      <h2>{entry.title}</h2>
      <p>{entry.body}</p>
      <button className="button" onClick={() => onToggleImportant(entry.id)}>
        ⭐
      </button>
      <button className="button edit-button" onClick={() => onEdit(entry)}>
        Edit
      </button>
      <button className="button delete-button" onClick={() => onDelete(entry.id)}>
        Delete
      </button>
    </div>
  );
}

export default EntryItem;
