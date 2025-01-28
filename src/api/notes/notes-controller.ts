import { Context } from "hono";
import { ulid } from "ulid";
import fs from "fs/promises";

type NoteType = {
  id: string;
  title: string;
  content: string;
};
const notesFile = "./notes.json";

export const handleCreateNewNote = async (c: Context) => {
  const body: NoteType = await c.req.json();

  if (!body.title || !body.content) {
    return c.json({ message: "ID, title, and content are required" }, 400);
  }

  const newNote: NoteType = {
    id: ulid(),
    title: body.title,
    content: body.content,
  };
  const notes = await readNote();

  if (notes.some((note: NoteType) => note.id === body.id)) {
    return c.json({ message: "Note with this id already exists" }, 409);
  }

  notes.push(newNote);
  await fs.writeFile(notesFile, JSON.stringify(notes, null, 2), "utf-8");
  return c.json(notes, 201);
};
export const readNote = async () => {
  const data = await fs.readFile(notesFile, "utf-8");
  return JSON.parse(data);
};

export const handleGetAllNotes = async (c: Context) => {
  const notes = await readNote(); // Read the notes
  return c.json(notes); // Hono expects a Response, so we use c.json()
};

export const handleGetNoteByID = async (c: Context) => {
  const id = c.req.param("id"); // used to access params in the URL and always us context type if you want to
  const notes = await readNote();
  const note = notes.filter((value) => value.id === id);
  console.log(note);
  return c.json(note);
};


export const handleUpdateNote = async (c: Context) => {
  const id = await c.req.param("id");
  const body: NoteType = await c.req.json();
  const notes = await readNote();
  const noteIndex = notes.findIndex((note) => note.id === id);
  if (noteIndex === -1) {
    return c.json({ message: "Note not found" }, 404);
  }
  notes[noteIndex] = { ...notes[noteIndex], ...body };
  await fs.writeFile(notesFile, JSON.stringify(notes, null, 2), "utf-8");
  return c.json(notes, 202);
};
export const handleDeleteNote = async (c: Context) => {
  const id = c.req.param("id");
  const notes = await readNote();
  console.log(notes);
  const updatedNotes = notes.filter((notes) => notes.id != id);
  console.log(updatedNotes);
  await fs.writeFile(notesFile, JSON.stringify(updatedNotes, null, 2), "utf-8");
  return c.json({ message: "Note Deleted", id });
};
