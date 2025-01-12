import { Hono } from "hono";
import { 
    getAllNotes,
    getNoteByID,
    readNote} from "./notes-controller";

const notesRouter = new Hono();

// notesRouter.post("/notes/create", createNewNote);
// notesRouter.post("/notes/:id", writeNotes);
// notesRouter.post("/notes/:id", deleteNote);
notesRouter.get("/notes/:id", getNoteByID);
export default notesRouter;

