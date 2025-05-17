import { Request, Response, NextFunction } from "express";

const handleErrors = (error: any, req: Request, res: Response, next: NextFunction) => {

  let errorCode = 500
  let message = "Something went wrong."
  
  if (error?.status && error?.message) {
    errorCode = error.status
    message = error.message
  }

  res.status(errorCode).json({ message });
 
}

export default handleErrors