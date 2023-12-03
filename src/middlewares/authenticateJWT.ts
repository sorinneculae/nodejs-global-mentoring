import { NextFunction } from "express";
import { users } from "../dataAccess/users";

export const authenticateJWT = (
  req: any,
  res: any,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"];
  const user = users.find((u) => u.id === userId);
  if (userId && user) {
    res.userId = userId;
    next();
  } else {
    res.status(401).send({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
  }
};
