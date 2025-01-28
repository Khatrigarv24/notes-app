import { Hono } from "hono";
import {
  handleCreateNewNote,
  handleGetNoteByID,
  handleDeleteNote,
  handleUpdateNote,
} from "./notes-controller";

const notesRouter = new Hono();

notesRouter.post("/create/", handleCreateNewNote);
notesRouter.put("/notes/:id", handleUpdateNote);
notesRouter.delete("/notes/:id", handleDeleteNote);
notesRouter.get("/notes/:id", handleGetNoteByID);
export default notesRouter;