import { users } from "./mocks/users";

export const writeResponse = (res: any, code: number, message: any) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(message));
};

export const findUser = (userId: number) => {
  return users.find((u) => u.id === userId);
}

export const errorResponse = (res: any) => writeResponse(res, 404, { error: "User not found" });