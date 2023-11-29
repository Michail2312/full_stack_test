import fs from 'fs/promises';
import { Request, Response, NextFunction } from 'express';

import { IUser } from './types/types';
import path from 'path';

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, number } = req.query;
    const data: IUser[] = JSON.parse(
      await fs.readFile(path.resolve(__dirname, '..', 'data.json'), 'utf-8')
    );
    if (number) {
      const user = data.filter(
        user => user.email === email && user.number === number
      );
      if (!user.length) {
        res.status(404);
        res.send({ message: 'User not found' });
      } else res.send(user);
    } else {
      const user = data.filter(user => user.email === email);
      if (!user.length) {
        res.status(404);
        res.send({ message: 'User not found' });
      } else res.send(user);
    }
  } catch (error) {
    if (error instanceof Error) res.send(error.message);
  }
}
