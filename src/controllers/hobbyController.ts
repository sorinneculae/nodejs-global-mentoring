import { IncomingMessage, ServerResponse } from "http";
import { users } from "../mocks/users";
import { errorResponse, findUser, writeResponse } from "../util";

export function addHobby(req: IncomingMessage, res: ServerResponse, userId: number, body: string) {
  const newHobby = JSON.parse(body).data;
  const user = findUser(userId);
  if (user) {
    user.hobbies.push(newHobby);
    writeResponse(res, 201, user.hobbies);
  } else {
    errorResponse(res);
  }
}

export function deleteHobby(req: IncomingMessage, res: ServerResponse, userId: number, hobby: string) {
  const user = findUser(userId);
  if (user) {
    const hobbies = user.hobbies;
    const hobbyIndex = hobbies.indexOf(hobby);

    if (hobbyIndex !== -1) {
      const deletedHobby = hobbies.splice(hobbyIndex, 1);
      writeResponse(res, 200, deletedHobby);
    } else {
      writeResponse(res, 404, { error: `Hobby ${ hobby } not found for the user ${ user.name }` });
    }
  } else {
    errorResponse(res);
  }
}

export function getUserHobbies(req: IncomingMessage, res: ServerResponse, userId: number) {
  const user = findUser(userId);
  if (user) {
    writeResponse(res, 200, user.hobbies);
  } else {
    errorResponse(res);
  }
}
