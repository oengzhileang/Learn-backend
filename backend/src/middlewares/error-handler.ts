import { Request, Response, NextFunction } from "express";
interface AppError extends Error {
  statusCode: number;
  message: string;
}
export { AppError };
export default function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Set default values for status code and message
  // const statusCode = error.statusCode || 500;
  // const message = error.message || "Internal server error";

  // Handle specific HTTP statuses
  // if (statusCode === 204) {
  //   return res.status(204).send();
  // }

  // Log the error (optional, for debugging purposes)
  // console.error(`[Error] :  ${error.message}`, error);

  // Send a JSON response to the client
  const statusCode: number = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message,
      statusCode,
      method: req.method,
      path: req.originalUrl,
      Timestamp: new Date().toLocaleString(),
    },
  });
}
