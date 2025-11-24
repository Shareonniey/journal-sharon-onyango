const BASE = "https://jsonplaceholder.typicode.com/posts";

export async function fetchEntries() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Network error fetching posts");
  const data = await res.json();
  return data.slice(0, 20);
}

export async function createEntry({ title, body }) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId: 1 }),
  });
  if (!res.ok) throw new Error("Failed to create");
  return res.json();
}

export async function updateEntry(id, { title, body }) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, body, userId: 1 }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
}

export async function deleteEntry(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 200 && res.status !== 204) {
    throw new Error("Failed to delete");
  }
  return true;
}
