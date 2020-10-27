import { NextFunction, Request, Response } from 'express'

const ErrorHandler = (
  err,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  console.log(err)
  resp.status(500).json()
  next()
}

export default ErrorHandler
