import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import {
  fetchEntries,
  createEntry as apiCreateEntry,
  updateEntry as apiUpdateEntry,
  deleteEntry as apiDeleteEntry,
} from "./components/api";

function App() {
  const [entries, setEntries] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null); 
  useEffect(() => {
    setLoading(true);
    fetchEntries()
      .then((data) => {
        const withImportant = data.map((p) => ({ ...p, important: false }));
        setEntries(withImportant);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load entries.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Create new entry
  const handleCreate = async (title, body) => {
    setLoading(true);
    try {
      const created = await apiCreateEntry({ title, body });
      setEntries((prev) => [{ ...created, important: false }, ...prev]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to create entry.");
    } finally {
      setLoading(false);
    }
  };

  // Update entry (PUT/PATCH)
  const handleUpdate = async (id, title, body) => {
    setLoading(true);
    try {
      const updated = await apiUpdateEntry(id, { title, body });
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, title: updated.title, body: updated.body } : e
        )
      );
      setEditingEntry(null);
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update entry.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    const previous = entries;
    setEntries((prev) => prev.filter((e) => e.id !== id));
    try {
      await apiDeleteEntry(id);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete entry. Restoring.");
      setEntries(previous); 
    }
  };


  const handleToggleImportant = (id) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, important: !e.important } : e)));
  };

  const openNewEntryForm = () => {
    setEditingEntry(null);
    setShowForm(true);
  };

  const openEditForm = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const filteredEntries = showImportantOnly ? entries.filter((e) => e.important) : entries;

  return (
    <div className="container">
      <Header
        onNewEntryClick={openNewEntryForm}
        showImportantOnly={showImportantOnly}
        onToggleImportant={() => setShowImportantOnly((s) => !s)}
      />

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <EntryForm
          onCancel={() => { setShowForm(false); setEditingEntry(null); }}
          onSubmit={(title, body) => {
            if (editingEntry) handleUpdate(editingEntry.id, title, body);
            else handleCreate(title, body);
          }}
          initialData={editingEntry ? { title: editingEntry.title, body: editingEntry.body } : null}
        />
      )}

      {/* Entries */}
      <EntryList
        entries={filteredEntries}
        onEdit={openEditForm}
        onDelete={handleDelete}
        onToggleImportant={handleToggleImportant}
      />
    </div>
  );
}

export default App;
