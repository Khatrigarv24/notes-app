import { Hono } from "hono";
import notesRouter from "./notes/notes-routes";

const appRouter = new Hono();

appRouter.route("/notes", notesRouter);
export default notesRouter;