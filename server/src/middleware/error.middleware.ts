import HttpException from '../exceptions/httpExceptions';
import {Request, Response} from 'express';

function errorMiddleware(error: HttpException, req: Request, res: Response): void {
  const status = error.status || 500;
  const message = (error.status !== 500) ? error.message : 'Unexpected error!';
  res
    .status(status)
    .json({
      status: status,
      message: message
    });
}
export default errorMiddleware;