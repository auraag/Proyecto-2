import loginAction from "./actions/login.action";

async function login(email: string, password: string) {
  const result = await loginAction(email, password);
  return result;
}

export { login };
