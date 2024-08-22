import React from "react";
import db from "../../appwrite/databases";
import { useLoaderData } from "react-router-dom";

export async function user_loader() {
  const { documents } = await db.users.list();
  return { users: documents };
}

const UserList = () => {
  const { users } = useLoaderData();
  console.log(users);

  return <div>Users</div>;
};

export default UserList;
