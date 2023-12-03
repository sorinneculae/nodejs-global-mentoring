import { users } from "./dataAccess/users";

export const findUser = (userId: number) => {
  return users.find((u) => u.id === userId);
}