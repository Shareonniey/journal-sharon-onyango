import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { getEntries, createEntry, updateEntry, deleteEntry } from "./components/api";

function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showImportantOnly, setShowImportantOnly] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEntries()
      .then((data) =>
        setEntries(data.slice(0, 20).map((e) => ({ ...e, important: false })))
      )
      .catch(() => setError("Failed to load entries"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (title, body) => {
    setLoading(true);
    try {
      const newEntry = await createEntry({ title, body, userId: 1 });
      setEntries((prev) => [{ ...newEntry, important: false }, ...prev]);
      setShowForm(false);
    } catch {
      setError("Failed to create entry");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, title, body) => {
    setLoading(true);
    try {
      const updated = await updateEntry(id, { title, body });
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, title: updated.title, body: updated.body } : e
        )
      );
      setEditingEntry(null);
      setShowForm(false);
    } catch {
      setError("Failed to update entry");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    try {
      await deleteEntry(id);
    } catch {
      setError("Failed to delete entry");
    }
  };

  const toggleImportant = (id) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, important: !e.important } : e))
    );
  };

  const filteredEntries = showImportantOnly
    ? entries.filter((e) => e.important)
    : entries;

  return (
    <div className="container">
      <Header
        onNewEntryClick={() => {
          setEditingEntry(null);
          setShowForm(true);
        }}
        showImportantOnly={showImportantOnly}
        onToggleImportant={() => setShowImportantOnly(!showImportantOnly)}
      />

      {showForm && (
        <EntryForm
          initialData={editingEntry}
          onSubmit={(title, body) =>
            editingEntry
              ? handleUpdate(editingEntry.id, title, body)
              : handleCreate(title, body)
          }
          onCancel={() => {
            setShowForm(false);
            setEditingEntry(null);
          }}
        />
      )}

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <EntryList
        entries={filteredEntries}
        onDelete={handleDelete}
        onEdit={(entry) => {
          setEditingEntry(entry);
          setShowForm(true);
        }}
        onToggleImportant={toggleImportant}
      />
    </div>
  );
}

export default App;
