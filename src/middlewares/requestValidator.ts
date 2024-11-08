import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ErrorResponse from '../utils/errorResponse';
import { statusCode } from '../utils/statusCodes';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => error.msg);
    return next(
      new ErrorResponse(
        errorMessages.join(', '),
        statusCode.badRequest
      )
    );
  }
  next();
};
