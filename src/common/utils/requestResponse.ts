import { HttpException } from '@nestjs/common';

export class SuccessResponse {
  message: any;
  statusCode: number;
  error: any;
  data: any;
}
export class ErrorResponse {
  message: any;
  statusCode: number;
  error: any;
  data: null;
}

export class CustomException extends HttpException {
  constructor(msg?: string, error?: string, statusCode?: number) {
    const ErrorResponse = {
      message: [msg],
      error: error,
      statusCode: statusCode,
      data: null,
    };

    super(ErrorResponse, statusCode?statusCode:500);
  }
}