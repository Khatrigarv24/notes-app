import { Hono } from "hono";
import { 
    handlecreateNewNote,
    // getAllNotes,
    handlegetNoteByID,
    // readNote,
    handledeleteNote,
    handleUpdateNote} from "./notes-controller";

const notesRouter = new Hono();

notesRouter.post("/notes/create/", handlecreateNewNote);
notesRouter.post("/notes/:id", handleUpdateNote);
notesRouter.delete("/notes/:id", handledeleteNote);
notesRouter.get("/notes/:id", handlegetNoteByID);
export default notesRouter;

