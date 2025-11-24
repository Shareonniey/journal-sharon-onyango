import React from "react";
import EntryItem from "./EntryItem";

function EntryList({ entries, onDelete, onEdit, onToggleImportant }) {
  return (
    <>
      {entries.map((entry) => (
        <EntryItem
          key={entry.id}
          entry={entry}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleImportant={onToggleImportant}
        />
      ))}
    </>
  );
}

export default EntryList;

