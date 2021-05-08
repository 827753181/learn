import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { nextTick } from 'process';

@Injectable()
export class catsMidlleWare implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log({
      req,
      res,
    });
    next();
  }
}
