import { UserModel, UserType } from "../user.model";

async function deleteUserAction(id: string): Promise<UserType | null> {
  const deletedUser = await UserModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  return deletedUser;
}

export default deleteUserAction;
