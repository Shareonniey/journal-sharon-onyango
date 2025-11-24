import React from "react";

function EntryItem({ entry, onEdit, onDelete, onToggleImportant }) {
  return (
    <article className={`entry ${entry.important ? "important" : ""}`}>
      <div className="entry-head">
        <h3 className="entry-title">{entry.title}</h3>

        <div className="entry-actions">
          <button
            aria-label="mark important"
            className="icon-btn"
            onClick={onToggleImportant}
          >
            {entry.important ? "★" : "☆"}
          </button>

          <button className="icon-btn" onClick={onEdit}>Edit</button>
          <button className="icon-btn danger" onClick={onDelete}>Delete</button>
        </div>
      </div>

      <p className="entry-body">
        {entry.body.length > 200 ? entry.body.slice(0, 200) + "…" : entry.body}
      </p>
    </article>
  );
}

export default EntryItem;
