import { UserModel } from "../../user/v1/user.model";
import { generateToken } from "../jwt";

async function loginAction(email: string, password: string) {
  const user = await UserModel.findOne({ email, password, isDeleted: false });

  if (!user) return null;

  const token = generateToken({
    id: user._id,
    permissions: user.permissions,
  });

  return { user, token };
}

export default loginAction;
