const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getEntries() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch entries");
  return res.json();
}

export async function createEntry(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create entry");
  return res.json();
}

export async function updateEntry(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update entry");
  return res.json();
}

export async function deleteEntry(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete entry");
  return true;
}

