import { Hono } from "hono";
import notesRouter from "./notes/notes-routes";
import { userRouter } from "./users/users-route";

const appRouter = new Hono();
appRouter.route("/db", userRouter);
appRouter.route("/notes", notesRouter);
export default appRouter;
