import React from "react";

function Header({ onNewEntryClick, showImportantOnly, onToggleImportant }) {
  return (
    <div className="header">
      <h1>My Journal</h1>
      <button className="button new-entry-button" onClick={onNewEntryClick}>
        + New Entry
      </button>
      <button className="button" onClick={onToggleImportant}>
        {showImportantOnly ? "Show All" : "Show Important Only"}
      </button>
    </div>
  );
}

export default Header;
