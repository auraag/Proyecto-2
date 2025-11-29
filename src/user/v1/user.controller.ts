import readUsersAction from "./actions/read.user.action";
import readUserByIdAction from "./actions/read.userById.action";
import createUserAction from "./actions/create.user.action";
import updateUserAction from "./actions/update.user.action";
import deleteUserAction from "./actions/delete.user.action";
import { UserType } from "./user.model";

async function readUsers(): Promise<UserType[]> {
  const users = await readUsersAction();
  return users;
}

async function readUserById(
  id: string,
  requester: any
): Promise<UserType | null> {
  if (requester.id !== id && !requester.permissions.includes("readUser")) {
    throw new Error("Not allowed.");
  }

  const user = await readUserByIdAction(id);
  return user;
}

async function createUser(data: any): Promise<UserType> {
  const newUser = await createUserAction(data);
  return newUser;
}

async function updateUser(
  id: string,
  data: any,
  requester: any
): Promise<UserType | null> {
  if (requester.id !== id && !requester.permissions.includes("updateUser")) {
    throw new Error("Not allowed.");
  }

  const updatedUser = await updateUserAction(id, data);
  return updatedUser;
}

async function deleteUser(
  id: string,
  requester: any
): Promise<UserType | null> {
  if (requester.id !== id && !requester.permissions.includes("deleteUser")) {
    throw new Error("Not allowed.");
  }

  const deletedUser = await deleteUserAction(id);
  return deletedUser;
}

export {
  readUsers,
  readUserById,
  createUser,
  updateUser,
  deleteUser,
};
