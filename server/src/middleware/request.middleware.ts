import { NextFunction, Request, Response } from 'express';

function requestMiddleware(req: Request, res: Response, next: NextFunction): void {
  console.log(`Request URL: ${req.url}\
  \nRequest type: ${req.method}\
  \nRequest param: ${req.body}`);
  next();
}

export default requestMiddleware;