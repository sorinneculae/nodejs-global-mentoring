import { errorResponse, findUser, writeResponse } from '../util';
import { users } from '../mocks/users';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types';
import { getUserHobbies } from './hobbyController';

export function getUserById(req: IncomingMessage, res: ServerResponse, userId: number) {
  const user = findUser(userId);
  if (user) {
    writeResponse(res, 200, user);
  } else {
    errorResponse(res);
  }
}

export function getUsers(req: IncomingMessage, res: ServerResponse) {
  const usersWithLinks = users.map((user: User) => ({
    ...user,
    links: { 'user': `/user?id=${user.id}`, 'hobbies': `/user/hobbies?id=${user.id}` }
  }));

  writeResponse(res, 200, usersWithLinks);
}

export function getUserDataWithoutHobbies(req: IncomingMessage, res: ServerResponse, userId: number) {
  const user = findUser(userId);
  if (user) {
    const userDataWithoutHobbies = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    writeResponse(res, 200, userDataWithoutHobbies);
  } else {
    errorResponse(res);
  }
}

export function createUser(req: IncomingMessage, res: ServerResponse, body: string) {
  const newUser = JSON.parse(body);
  newUser.id = users.length + 1;
  users.push(newUser);
  writeResponse(res, 201, newUser);
}

export function updateUser(req: IncomingMessage, res: ServerResponse, userId: number, body: string) {
  let user = findUser(userId);
  const updatedUser = JSON.parse(body);
  if (user) {
    user = { ...user, ...updatedUser };
    writeResponse(res, 200, user);
  } else {
    errorResponse(res);
  }
}

export function deleteUser(req: IncomingMessage, res: ServerResponse, userId: number) {
    const user = findUser(userId);
    if (user) {
      const userIndex = users.findIndex((u) => u.id === userId);
      users.splice(userIndex, 1);
      writeResponse(res, 200, user);
    } else {
      errorResponse(res);
    }
}
