import { Hono } from "hono";
import { handleCreateUser, handleDeleteUserById, handleGetUsersById, handleUpdateUser } from "./users-controller";


export const userRouter = new Hono();

userRouter.post("/create", handleCreateUser);
userRouter.put("/:id", handleUpdateUser);
userRouter.delete("/:id", handleDeleteUserById);
userRouter.get("/:id", handleGetUsersById);
