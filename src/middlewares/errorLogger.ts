import { NextFunction, Request, Response } from "express";

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    data: null,
    error: {
      message: 'Internal Server error'
    }
  });
  next(res);
}