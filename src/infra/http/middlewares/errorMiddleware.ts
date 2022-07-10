import { NextFunction, Request, Response } from "express"
import { appendFileSync, writeFileSync } from "fs"
import { AppError } from "../../shared/errors/AppError"
const errorMiddleware = async (error: Error, request: Request, response: Response, _: NextFunction): Promise<any> => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }
  appendFileSync("./src/infra/logs/error.log", `${error.stack} \n\n\n`)
  return response.status(500).json({
    status: "error",
    message: `Internal server error`,
  })
}

export { errorMiddleware }
