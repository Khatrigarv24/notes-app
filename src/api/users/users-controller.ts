import { Context } from "hono";
import { db, usersTable } from "../../database/schema";
import { eq } from "drizzle-orm";

type UserType = {
    id: string;
    name: string;
    age: number;
    email: string;
}

export const handleGetUsersById = async(c:Context) =>{
    const id = c.req.param('id');

    const users = await db.select().from(usersTable).where(eq(usersTable.id,id)).execute();
    return c.json(users);

};

export const handleCreateUser = async(c:Context) => {
    const body: UserType = await c.req.json();
    await db.insert(usersTable).values({name:body.name, age:body.age, email:body.email}).execute();
    return c.json({ 'message': 'user added successfully'}, 201);
};

export const handleUpdateUser = async(c:Context) => {
    const id = c.req.param("id");
    const body:UserType = await c.req.json();
    await db.update(usersTable).set({name:body.name, age:body.age, email:body.email}).where(eq(usersTable.id,id)).execute();
    const user = await db.select().from(usersTable).where(eq(usersTable.id,id)).execute();
    return c.json(user);
};

export const handleDeleteUserById = async(c:Context) => {
    const id = c.req.param("id");
    await db.delete(usersTable).where(eq(usersTable.id, id)).execute();
    return c.json({"message": "user Deleted", id});
}