import { login } from "../auth/auth.controller";
import loginAction from "../auth/actions/login.action";

jest.mock("../auth/actions/login.action");

describe("Auth Controller Tests", () => {
  test("login() → caso exitoso", async () => {
    const mockResult = {
      user: { email: "aura@example.com" },
      token: "abc123"
    };

    (loginAction as jest.Mock).mockReturnValue(mockResult);

    const result = await login("aura@example.com", "123456");

    expect(result).toEqual(mockResult);
  });

  test("login() → credenciales inválidas", async () => {
    (loginAction as jest.Mock).mockReturnValue(null);

    const result = await login("wrong@example.com", "123");

    expect(result).toBeNull();
  });

  test("login() → error inesperado", async () => {
    (loginAction as jest.Mock).mockImplementation(() => {
      throw new Error("DB error");
    });

    await expect(login("a", "b")).rejects.toThrow("DB error");
  });
});
