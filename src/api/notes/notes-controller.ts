import { Context, Hono } from "hono"
import { ulid } from "ulid";
import fs from "fs/promises";
import { json } from "stream/consumers";
import { number } from "zod";
import { readFile } from "fs";

const client = new Hono();

const notesFile = "D:/javasript/notes-app/notes.json"
// export let createNewNote = (c:Context) => {
//     ;
// }
export const readNote = async() => {
    const data = await fs.readFile(notesFile, "utf-8");
    return JSON.parse(data);
    // return client.json(notes);
};

export const getAllNotes = async (c: Context) => {
    const notes = await readNote();  // Read the notes

    return c.json(notes);  // Hono expects a Response, so we use c.json()
  };

export const getNoteByID = async (c:Context) => {
    const id = c.req.param('id'); // used to access params in the URL and always us context type if you want to 
    const notes = await readNote();
    const note = notes.filter((value) => value.id === Number(id));
    console.log(note);
    return c.json(note);
};

// export const writeNote = async(newNote:{id:number; title:string; content:string}) => {
//     const notes = await readNote();
//     notes.push(newNote);
//     await fs.writeFile(notesFile, JSON.stringify(notes, null, 2), 'utf-8');
// };
// export const writeNotes = async (c:Context) => {
//     const {id, title, content} = await c.req.json();
//     let newNote = {id, title, content};
//     await writeNote(newNote);
//     return c.json(newNote, 201);
// }
// export function deleteNote  (c:Context)  {
//     console.log("Deleted note!!!!");
// }
