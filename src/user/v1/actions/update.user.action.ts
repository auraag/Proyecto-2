import { UserModel, UserType } from "../user.model";

async function updateUserAction(id: string, data: Partial<UserType>): Promise<UserType | null> {
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedUser;
}

export default updateUserAction;
