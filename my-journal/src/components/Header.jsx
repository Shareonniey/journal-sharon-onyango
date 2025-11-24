import React from "react";

function Header({ onNewEntryClick, showImportantOnly, onToggleImportant }) {
  return (
    <header className="header">
      <h1>My Journal</h1>

      <div className="header-controls">
        <label className="important-toggle">
          <input
            type="checkbox"
            checked={showImportantOnly}
            onChange={onToggleImportant}
          />
          Show Important Only
        </label>

        <button className="btn primary" onClick={onNewEntryClick}>
          + New Entry
        </button>
      </div>
    </header>
  );
}

export default Header;

