import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import userRouter from './user-router';

const server = express();
server.use(express.json());
server.use(cors());
server.use(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => next(), 5000);
  },
  userRouter
);

server.listen(3001, () =>
  console.log(`Server started on http://127.0.0.1:3001`)
);
