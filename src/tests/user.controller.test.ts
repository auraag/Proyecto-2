import {
  readUsers,
  readUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../user/v1/user.controller";

import readUserAction from "../user/v1/actions/read.user.action";
import readUserByIdAction from "../user/v1/actions/read.userById.action";
import createUserAction from "../user/v1/actions/create.user.action";
import updateUserAction from "../user/v1/actions/update.user.action";
import deleteUserAction from "../user/v1/actions/delete.user.action";

jest.mock("../user/v1/actions/read.user.action");
jest.mock("../user/v1/actions/read.userById.action");
jest.mock("../user/v1/actions/create.user.action");
jest.mock("../user/v1/actions/update.user.action");
jest.mock("../user/v1/actions/delete.user.action");

describe("User Controller Tests", () => {
  // READ ALL
  test("readUsers() → caso exitoso", async () => {
    (readUserAction as jest.Mock).mockReturnValue([{ name: "Aura" }]);

    const result = await readUsers();
    expect(result).toEqual([{ name: "Aura" }]);
  });

  test("readUsers() → caso fallido", async () => {
    (readUserAction as jest.Mock).mockImplementation(() => {
      throw new Error("DB error");
    });

    await expect(readUsers()).rejects.toThrow("DB error");
  });

  // READ BY ID
  test("readUserById() → caso exitoso (mismo usuario)", async () => {
    (readUserByIdAction as jest.Mock).mockReturnValue({ name: "Aura" });

    const requester = { id: "123", permissions: [] };
    const result = await readUserById("123", requester);

    expect(result).toEqual({ name: "Aura" });
  });

  test("readUserById() → sin permisos y usuario distinto", async () => {
    const requester = { id: "999", permissions: [] };

    await expect(readUserById("123", requester)).rejects.toThrow(
      "Not allowed."
    );
  });

  // CREATE
  test("createUser() → caso exitoso", async () => {
    const data = { name: "Aura" };
    (createUserAction as jest.Mock).mockReturnValue(data);

    const result = await createUser(data);
    expect(result).toEqual(data);
  });

  test("createUser() → datos inválidos", async () => {
    (createUserAction as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid data");
    });

    await expect(createUser({} as any)).rejects.toThrow("Invalid data");
  });

  // UPDATE
  test("updateUser() → caso exitoso (mismo usuario)", async () => {
    const data = { name: "Aury" };
    (updateUserAction as jest.Mock).mockReturnValue(data);

    const requester = { id: "123", permissions: [] };
    const result = await updateUser("123", data, requester);

    expect(result).toEqual(data);
  });

  test("updateUser() → sin permisos y usuario distinto", async () => {
    const requester = { id: "999", permissions: [] };

    await expect(
      updateUser("123", { name: "x" }, requester)
    ).rejects.toThrow("Not allowed.");
  });

  // DELETE
  test("deleteUser() → caso exitoso (mismo usuario)", async () => {
    (deleteUserAction as jest.Mock).mockReturnValue({ success: true });

    const requester = { id: "123", permissions: [] };
    const result = await deleteUser("123", requester);

    expect(result).toEqual({ success: true });
  });

  test("deleteUser() → sin permisos y usuario distinto", async () => {
    const requester = { id: "999", permissions: [] };

    await expect(deleteUser("123", requester)).rejects.toThrow("Not allowed.");
  });
});
