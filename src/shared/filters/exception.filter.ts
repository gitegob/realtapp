import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  LoggerService,
  Inject,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(Logger) private readonly loggerService: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = host.switchToHttp().getRequest();
    const response = ctx.getResponse();
    this.loggerService.verbose(`REQUEST: ${request.method} ${request.url}`);
    const isHttp = exception instanceof HttpException;
    const status = isHttp
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    if (status === 500) Logger.error(exception);
    this.loggerService.verbose(`RESPONSE: ${status} ${request.url}`);
    this.loggerService.error(exception.stack);
    response.status(status).json({
      statusCode: status,
      error: isHttp
        ? exception.response.message
        : 'Sorry, An Internal Error Occurred.',
    });
  }
}
