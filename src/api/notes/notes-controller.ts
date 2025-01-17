import { Context, Hono } from "hono"
import { ulid } from "ulid";
import fs from "fs/promises";
import { json } from "stream/consumers";
import { number } from "zod";
import { readFile } from "fs";

const client = new Hono();
type NoteType = {
    id:string,
    title:string,
    content:string
}
const notesFile = "D:/javasript/notes-app/notes.json"
export let handlecreateNewNote = async (c:Context) => {
    const body: NoteType  = await c.req.json();

    if (!body.title || !body.content) {
        return c.json({ message: "ID, title, and content are required" }, 400);
    }

    let newNote: NoteType = {id:ulid(), title:body.title, content:body.content};
    const notes = await readNote();

    if (notes.some((note: NoteType) => note.id === body.id)) {
        return c.json({message: "Note with this id already exists"}, 409)
    }

    notes.push(newNote);
    await fs.writeFile(notesFile, JSON.stringify(notes, null, 2), 'utf-8');
    return c.json(notes, 201);
}
export const readNote = async() => {
    const data = await fs.readFile(notesFile, "utf-8");
    return JSON.parse(data);
    // return client.json(notes);
};

export const handlegetAllNotes = async (c: Context) => {
    const notes = await readNote();  // Read the notes
    return c.json(notes);  // Hono expects a Response, so we use c.json()
  };

export const handlegetNoteByID = async (c:Context) => {
    const id = c.req.param('id'); // used to access params in the URL and always us context type if you want to 
    const notes = await readNote();
    const note = notes.filter((value) => value.id === id);
    console.log(note);
    return c.json(note);
};

// export const writeNote = async(newNote:NoteType) => {
//     const notes = await readNote();
//     await fs.writeFile(notesFile, JSON.stringify(notes, null, 2), 'utf-8');
// };
export const handleUpdateNote = async (c:Context) => {
    // console.log (c.req);
    const id = await c.req.param('id');
    const body :NoteType = await c.req.json();
    const notes = await readNote();
    const noteIndex = notes.findIndex((note) => note.id === id);
    if(noteIndex === -1){
        return c.json({message: "Note not found"}, 404);
    }
    notes[noteIndex] = {...notes[noteIndex], ...body};
    // let newNote = {id:body.id,title:body.title, content:body.content};
    await fs.writeFile(notesFile, JSON.stringify(notes, null, 2), 'utf-8');
    return c.json(notes, 202);
}
export const handledeleteNote = async (c:Context) => {
    const id = c.req.param('id');
    const notes = await readNote();
    console.log(notes);
    const updatedNotes = notes.filter((notes) => notes.id != id);
    console.log(updatedNotes);
    await fs.writeFile(notesFile, JSON.stringify(updatedNotes, null, 2), 'utf-8');
    return c.json({message:"Note Deleted", id});
}
