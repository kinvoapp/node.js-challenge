import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

// https://stackoverflow.com/questions/57820514/how-to-return-a-custom-response-from-the-class-validator-in-nestjs
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const { message } = exception.getResponse() as {
      statusCode: number;
      message: string | any;
      error: string | any;
    };
    response.status(status).json({ message });
  }
}
