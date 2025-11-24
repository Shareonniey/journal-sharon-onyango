import React from "react";
import EntryItem from "./EntryItem";

function EntryList({ entries, onEdit, onDelete, onToggleImportant }) {
  if (!entries || entries.length === 0) {
    return <p className="muted">No entries yet.</p>;
  }

  return (
    <section className="entry-list">
      {entries.map((entry) => (
        <EntryItem
          key={entry.id}
          entry={entry}
          onEdit={() => onEdit(entry)}
          onDelete={() => onDelete(entry.id)}
          onToggleImportant={() => onToggleImportant(entry.id)}
        />
      ))}
    </section>
  );
}

export default EntryList;
